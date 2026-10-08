import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Blocks,
  LayoutDashboard,
  Images,
  FileCheck2,
  CircleDollarSign,
  ArrowLeftRight,
  ShieldCheck,
  Settings,
  ChevronDown,
  Wallet,
  Menu,
  X,
  ArrowUpRight,
  Bell,
  FlaskConical,
  LogOut,
  Check,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "./ui";
import { useDemo } from "./demo-provider";
const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/works", label: "My Works", icon: Images },
  { to: "/licenses", label: "Licenses", icon: FileCheck2 },
  { to: "/royalty", label: "Royalty", icon: CircleDollarSign },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/verification", label: "Verification", icon: ShieldCheck },
] as const;
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={`logo ${compact ? "logo-light" : ""}`}>
      <span className="logo-mark">
        <Blocks size={21} />
      </span>
      <span>
        Royalti<span className="logo-chain">Chain</span>
        <span className="logo-period">.</span>
      </span>
    </Link>
  );
}
export function WalletButton() {
  const { connected, setConnected } = useDemo();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" className="wallet-button" onClick={() => setOpen(true)}>
        <Wallet size={16} />
        <span>{connected ? "0x12A4...89BC" : "Connect Wallet"}</span>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={connected ? "Demo wallet connected" : "Connect your demo wallet"}
        description="No real wallet or blockchain connection is required."
      >
        <div className="wallet-demo-option">
          <span className="stat-icon tone-primary">
            <Wallet size={24} />
          </span>
          <div>
            <h3>RoyaltiChain Demo Wallet</h3>
            <p>Fictional address · 0x12A4...89BC</p>
          </div>
          <span className="demo-label">Demo</span>
        </div>
        <p className="muted-copy">
          All NFT registrations, licenses, and transactions in this prototype are simulated. No
          funds will be requested.
        </p>
        <Button
          className="w-full"
          onClick={() => {
            setConnected(!connected);
            setOpen(false);
          }}
        >
          {connected ? (
            <>
              <LogOut />
              Disconnect demo wallet
            </>
          ) : (
            <>
              <Check />
              Use Demo Wallet
            </>
          )}
        </Button>
      </Modal>
    </>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const active = nav.find((item) =>
    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
  );
  const publicPage = ["/welcome", "/how-it-works", "/features"].includes(pathname);
  if (publicPage) return <>{children}</>;
  return (
    <div className="app-shell">
      {menu && <div className="sidebar-backdrop" onClick={() => setMenu(false)} />}
      <aside className={`sidebar ${menu ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <X />
          </Button>
        </div>
        <div className="workspace-switch">
          <span className="workspace-avatar">C</span>
          <div>
            <strong>Creator Workspace</strong>
            <span>Personal account</span>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-section-label">WORKSPACE</div>
        <nav className="side-nav">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${active?.to === item.to ? "active" : ""}`}
              onClick={() => setMenu(false)}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              {item.label === "My Works" && <span className="nav-count">12</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-side">
            <div>
              <FlaskConical size={17} />
              <strong>You're in Demo Mode</strong>
            </div>
            <p>
              Create freely. No real wallet
              <br />
              or funds needed.
            </p>
            <Link to="/welcome">
              Explore RoyaltiChain <ArrowUpRight size={15} />
            </Link>
          </div>
          <Link
            to="/settings"
            className={`nav-item ${pathname === "/settings" ? "active" : ""}`}
            onClick={() => setMenu(false)}
          >
            <Settings size={19} />
            <span>Settings</span>
          </Link>
          <Link to="/profile" className="profile-link" onClick={() => setMenu(false)}>
            <span className="profile-avatar">CR</span>
            <span>
              <strong>Creator</strong>
              <small>Demo account</small>
            </span>
            <ChevronDown size={15} />
          </Link>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
            <span>Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>
              {active?.label ||
                (pathname === "/settings"
                  ? "Settings"
                  : pathname === "/profile"
                    ? "User Profile"
                    : "Dashboard")}
            </strong>
          </div>
          <div className="topbar-actions">
            <span className="demo-label">
              <span />
              Demo Mode
            </span>
            <div className="notification-wrap">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => setNotifications(!notifications)}
              >
                <Bell size={19} />
                <i className="notification-dot" />
              </Button>
              {notifications && (
                <div className="notification-panel">
                  <strong>Notifications</strong>
                  <p>
                    <CircleDollarSign size={17} />
                    0.06 ETH demo royalty received
                  </p>
                  <small>Digital Sunset · Oct 08, 2026</small>
                </div>
              )}
            </div>
            <span className="topbar-divider" />
            <WalletButton />
          </div>
        </header>
        <main className="page-content">
          {children}
          <footer className="app-footer">
            <span>© 2026 RoyaltiChain</span>
            <span>
              <span className="status-dot" />
              All systems operational <span className="footer-divider">·</span> Demo environment
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
export function Navbar() {
  return (
    <header className="public-navbar">
      <Logo compact />
      <nav>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/features">Features</Link>
        <Link to="/verification">Verification</Link>
      </nav>
      <WalletButton />
    </header>
  );
}
