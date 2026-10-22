import { Component, lazy, Suspense, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const WalletIsland = lazy(async () => {
  const { Buffer } = await import("buffer");
  const browser = globalThis as typeof globalThis & { Buffer?: typeof Buffer };
  browser.Buffer ??= Buffer;
  return import("./solana-wallet");
});
function WalletFallback({ failed = false }: { failed?: boolean }) {
  return <Button variant="outline" className="wallet-button" disabled title={failed ? "Wallet gagal dimuat. Muat ulang halaman." : "Memuat wallet"}><Wallet size={16} /><span>{failed ? "Wallet unavailable" : "Connect Wallet"}</span><span className="devnet-badge">Devnet</span></Button>;
}
class WalletBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <WalletFallback failed /> : this.props.children; }
}
export function SolanaWalletButton() {
  return <ClientOnly fallback={<WalletFallback />}><WalletBoundary><Suspense fallback={<WalletFallback />}><WalletIsland /></Suspense></WalletBoundary></ClientOnly>;
}