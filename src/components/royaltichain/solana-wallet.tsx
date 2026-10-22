import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork, WalletReadyState } from "@solana/wallet-adapter-base";
import { clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { ExternalLink, LoaderCircle, LogOut, RefreshCw, Send, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "./ui";
import { explorerUrl, parseSolAmount, validateBalance, validateRecipient } from "@/lib/solana-transfer";

export default function SolanaWalletIsland() {
  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Devnet), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return <ConnectionProvider endpoint={endpoint} config={{ commitment: "confirmed" }}><WalletProvider wallets={wallets} autoConnect={false}><WalletModalProvider><WalletControls /></WalletModalProvider></WalletProvider></ConnectionProvider>;
}

function WalletControls() {
  const { connection } = useConnection();
  const { publicKey, connected, connecting, disconnect, connect, wallet, wallets, sendTransaction } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceError, setBalanceError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [phase, setPhase] = useState("");
  const [error, setError] = useState("");
  const [signature, setSignature] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const busy = useRef(false);
  const address = publicKey?.toBase58() ?? "";
  const activeAddress = useRef(address);
  activeAddress.current = address;
  const refreshBalance = useCallback(async () => {
    if (!publicKey) return;
    const requestedAddress = publicKey.toBase58();
    setRefreshing(true);
    try {
      const value = await connection.getBalance(publicKey, "confirmed");
      if (activeAddress.current === requestedAddress) { setBalance(value); setBalanceError(false); }
    } catch { if (activeAddress.current === requestedAddress) { setBalance(null); setBalanceError(true); } }
    finally { if (activeAddress.current === requestedAddress) setRefreshing(false); }
  }, [connection, publicKey]);
  useEffect(() => {
    setBalance(null); setBalanceError(false); setRecipient(""); setAmount(""); setSignature(""); setError("");
    if (!publicKey) return;
    void refreshBalance();
    const timer = window.setInterval(() => void refreshBalance(), 15000);
    const subscription = connection.onAccountChange(publicKey, (account) => {
      if (activeAddress.current === publicKey.toBase58()) { setBalance(account.lamports); setBalanceError(false); }
    }, "confirmed");
    return () => { window.clearInterval(timer); void connection.removeAccountChangeListener(subscription).catch(() => {}); };
  }, [connection, publicKey, refreshBalance]);

  async function connectWallet() {
    const phantom = wallets.find((item) => item.adapter.name === "Phantom");
    if (!phantom || phantom.readyState !== WalletReadyState.Installed) {
      toast.error("Phantom belum terpasang", { description: <a href="https://phantom.com/download" target="_blank" rel="noopener noreferrer">Pasang Phantom dari situs resmi, lalu muat ulang halaman. ↗</a>, duration: 10000 });
      return;
    }
    try { if (wallet?.adapter.name === "Phantom") await connect(); else setVisible(true); }
    catch { toast.error("Koneksi Phantom gagal atau ditolak. Silakan coba lagi."); }
  }
  async function transfer(event: FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    if (!publicKey || !connected) { toast.error("Hubungkan Phantom terlebih dahulu."); return; }
    busy.current = true;
    setError(""); setSignature(""); setConfirmed(false); setPhase("Memeriksa saldo & biaya…");
    let sentSignature = "";
    try {
      const lamports = parseSolAmount(amount);
      const toPubkey = validateRecipient(recipient, publicKey.toBase58());
      const latest = await connection.getLatestBlockhash("confirmed");
      const transaction = new Transaction({ feePayer: publicKey, ...latest }).add(SystemProgram.transfer({ fromPubkey: publicKey, toPubkey, lamports }));
      const [currentBalance, fee] = await Promise.all([connection.getBalance(publicKey, "confirmed"), connection.getFeeForMessage(transaction.compileMessage(), "confirmed")]);
      validateBalance(lamports, fee.value, currentBalance);
      if (activeAddress.current !== publicKey.toBase58()) throw new Error("Wallet berubah. Silakan ulangi transaksi.");
      setPhase("Menunggu persetujuan Phantom…");
      sentSignature = await sendTransaction(transaction, connection, { preflightCommitment: "confirmed", maxRetries: 3 });
      setSignature(sentSignature); setPhase("Menunggu konfirmasi blockchain…");
      const result = await connection.confirmTransaction({ signature: sentSignature, ...latest }, "confirmed");
      if (result.value.err) throw new Error("Transaksi gagal di blockchain. Periksa detail di Explorer.");
      setConfirmed(true); setAmount("");
      toast.success("BERHASIL — SOL Devnet terkirim", { description: <a href={explorerUrl(sentSignature)} target="_blank" rel="noopener noreferrer">Lihat Tx Hash di Solana Explorer ↗</a>, duration: 10000 });
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Transaksi gagal atau ditolak.";
      const readable = /reject|declin|cancel|4001/i.test(message) ? "Transaksi ditolak di Phantom. SOL tidak dikirim." : sentSignature ? "Konfirmasi belum berhasil atau transaksi gagal. Periksa Explorer sebelum mengirim ulang." : message;
      setError(readable); toast.error("GAGAL — transaksi belum berhasil", { description: readable });
    } finally { busy.current = false; setPhase(""); void refreshBalance(); }
  }
  const balanceText = balance === null ? balanceError ? "Saldo tidak tersedia" : "Memuat saldo…" : `${(balance / LAMPORTS_PER_SOL).toLocaleString("en-US", { maximumFractionDigits: 9 })} SOL`;
  return <>
    <Button variant="outline" className="wallet-button solana-wallet-button" disabled={connecting} onClick={() => connected ? setOpen(true) : void connectWallet()}>
      {connecting ? <LoaderCircle className="animate-spin" size={16} /> : <Wallet size={16} />}
      <span className="wallet-identity"><span>{connected ? `${address.slice(0, 4)}...${address.slice(-4)}` : connecting ? "Connecting…" : "Connect Wallet"}</span>{connected && <small>{balanceText}</small>}</span>
      <span className="devnet-badge">Devnet</span>
    </Button>
    <Modal open={open} onClose={() => { if (!phase) setOpen(false); }} title="Wallet Solana Devnet" description="SOL uji coba Devnet saja — bukan SOL Mainnet. NFT dan royalti di workspace tetap data demo.">
      <div className="solana-account"><Wallet size={22} /><div className="min-w-0"><strong>{balanceText}</strong><p className="break-all text-xs text-muted-foreground">{address}</p></div><Button size="icon" variant="ghost" aria-label="Refresh saldo" title="Refresh saldo" disabled={refreshing || Boolean(phase)} onClick={() => void refreshBalance()}><RefreshCw size={16} className={refreshing ? "animate-spin" : ""} /></Button></div>
      {balanceError && <p className="text-destructive text-sm">Saldo Devnet tidak dapat dibaca. Coba refresh saldo.</p>}
      <form onSubmit={transfer} className="solana-transfer-form">
        <h3>Kirim SOL</h3>
        <label htmlFor="solana-recipient">Alamat Penerima<Input id="solana-recipient" placeholder="Recipient Wallet Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} disabled={Boolean(phase)} required autoComplete="off" /></label>
        <label htmlFor="solana-amount">Jumlah SOL<Input id="solana-amount" inputMode="decimal" placeholder="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={Boolean(phase)} required autoComplete="off" /></label>
        <p className="text-xs text-muted-foreground">Biaya jaringan juga dipotong dari saldo Devnet SOL.</p>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        {signature && <a className="solana-tx-link" href={explorerUrl(signature)} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /><span>{confirmed ? "BERHASIL · " : "Periksa status · "}{signature.slice(0, 8)}...{signature.slice(-8)}</span></a>}
        <Button type="submit" disabled={Boolean(phase) || balance === null || !connected}>{phase ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}{phase || "Kirim SOL"}</Button>
      </form>
      <Button variant="outline" disabled={Boolean(phase)} onClick={async () => { try { await disconnect(); setOpen(false); } catch { toast.error("Gagal memutuskan koneksi Phantom."); } }}><LogOut size={16} />Disconnect</Button>
    </Modal>
  </>;
}