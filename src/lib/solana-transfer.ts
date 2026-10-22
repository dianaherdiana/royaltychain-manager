import { PublicKey } from "@solana/web3.js";

export const DEVNET_ENDPOINT = "https://api.devnet.solana.com";
export function parseSolAmount(value: string): number {
  const clean = value.trim();
  if (!/^\d+(\.\d{1,9})?$/.test(clean)) throw new Error("Jumlah SOL harus positif, maksimal 9 angka desimal.");
  const [whole, fraction = ""] = clean.split(".");
  const lamports = Number(whole) * 1_000_000_000 + Number(fraction.padEnd(9, "0"));
  if (!Number.isSafeInteger(lamports) || lamports <= 0) throw new Error("Jumlah SOL tidak valid.");
  return lamports;
}
export function validateRecipient(value: string, sender: string): PublicKey {
  let recipient: PublicKey;
  try { recipient = new PublicKey(value.trim()); }
  catch { throw new Error("Alamat penerima Solana tidak valid."); }
  if (recipient.toBase58() === sender) throw new Error("Alamat penerima harus berbeda dari wallet Anda.");
  return recipient;
}
export function validateBalance(amount: number, fee: number | null, balance: number) {
  if (fee === null || !Number.isSafeInteger(fee) || fee < 0) throw new Error("Biaya transaksi belum tersedia. Coba lagi.");
  if (amount + fee > balance) throw new Error("Saldo Devnet SOL tidak cukup untuk jumlah kirim dan biaya transaksi.");
}
export function explorerUrl(signature: string) {
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}?cluster=devnet`;
}