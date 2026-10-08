import type { ReactNode, ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  CircleCheck,
  ShieldCheck,
  X,
  Dot,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Work } from "@/lib/demo-data";
export function StatusBadge({ status }: { status: string }) {
  const tone = ["ACTIVE", "Completed", "VERIFIED"].includes(status)
    ? "success"
    : ["EXPIRED", "Pending"].includes(status)
      ? "warning"
      : "danger";
  return (
    <span className={`status-badge status-${tone}`}>
      <span className="status-dot" />
      {status === "ACTIVE"
        ? "Active"
        : status === "EXPIRED"
          ? "Expired"
          : status === "REVOKED"
            ? "Revoked"
            : status}
    </span>
  );
}
export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  change: string;
  icon: ComponentType<{ size?: number }>;
  tone?: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon tone-${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <strong>{value}</strong>
      <div className="stat-bottom">
        <span>
          <ArrowUpRight size={14} />
          {change}
        </span>
        <span>vs. last month</span>
      </div>
    </div>
  );
}
export function PageHeading({
  title,
  subtitle,
  action,
  eyebrow,
}: {
  title: ReactNode;
  subtitle: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="page-heading">
      <div className="min-w-0">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  );
}
export function ArtworkCard({ work }: { work: Work }) {
  return (
    <article className="artwork-card">
      <Link to="/works/$id" params={{ id: work.id }} className="artwork-image">
        <img src={work.image} alt={work.title} width={600} height={400} loading="lazy" />
        <span className="artwork-verified" title="Registered in Demo Mode">
          <ShieldCheck size={14} /> Verified
        </span>
      </Link>
      <div className="artwork-content">
        <div className="artwork-title">
          <h3>{work.title}</h3>
          <span>#{work.id}</span>
        </div>
        <div className="artwork-meta">
          <StatusBadge status={work.status} />
          <span>{work.royalty}% royalty</span>
        </div>
        <div className="artwork-footer">
          <span>{work.license}</span>
          <Link to="/works/$id" params={{ id: work.id }}>
            View Details <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="demo-modal">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description || "RoyaltiChain Demo Mode"}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
export function Timeline({ items }: { items: { title: string; date: string; note: string }[] }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="timeline-item" key={`${item.title}-${i}`}>
          <span className="timeline-marker">
            <CircleCheck size={16} />
          </span>
          <div>
            <span className="timeline-date">{item.date}</span>
            <h4>{item.title}</h4>
            <p>{item.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="empty-state">
      <ImageIcon size={28} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
