import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  CircleCheck,
  AlertTriangle,
  CircleX,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./demo-provider";
import { StatusBadge } from "./ui";
import { contract, creator, type Work } from "@/lib/demo-data";
export function VerificationCard({ work }: { work: Work }) {
  return (
    <section className="panel verification-result">
      <div
        className={`verification-result-banner ${work.status === "ACTIVE" ? "result-success" : work.status === "EXPIRED" ? "result-warning" : "result-danger"}`}
      >
        {work.status === "ACTIVE" ? (
          <ShieldCheck size={23} />
        ) : work.status === "EXPIRED" ? (
          <AlertTriangle size={23} />
        ) : (
          <CircleX size={23} />
        )}
        <div>
          <strong>
            {work.status === "ACTIVE"
              ? "NFT VERIFIED"
              : work.status === "EXPIRED"
                ? "LICENSE EXPIRED"
                : "LICENSE REVOKED"}
          </strong>
          <span>
            {work.status === "ACTIVE"
              ? "Registration and license information verified in Demo Mode."
              : "NFT registration exists, but its license is not active."}
          </span>
        </div>
        <span className="demo-label">Demo</span>
      </div>
      <div className="verification-body">
        <img src={work.image} alt={work.title} width={500} height={400} />
        <div>
          <h2>{work.title}</h2>
          <dl className="detail-list">
            <dt>Token ID</dt>
            <dd>#{work.id}</dd>
            <dt>Creator</dt>
            <dd className="hash-text">{creator}</dd>
            <dt>License</dt>
            <dd>{work.license}</dd>
            <dt>License Status</dt>
            <dd>
              <StatusBadge status={work.status} />
            </dd>
            <dt>Royalty</dt>
            <dd>{work.royalty}%</dd>
            <dt>Registered</dt>
            <dd>{work.id === "001" ? "Oct 01, 2026" : work.history[0]?.date}</dd>
            <dt>Contract</dt>
            <dd className="hash-text">0xAB12...91EF</dd>
            <dt>Transaction</dt>
            <dd className="hash-text">
              0x98FA...72BC <span className="field-help">(mock)</span>
            </dd>
          </dl>
          <Link to="/works/$id" params={{ id: work.id }} className="text-link">
            View full artwork details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="verification-timeline">
        {["Registered", "Licensed", "Sold", "Royalty Distributed"].map((s, i) => (
          <div key={s} className={work.status === "ACTIVE" ? "complete" : ""}>
            <CircleCheck size={20} />
            <span>{s}</span>
            {i < 3 && <span className="verification-line" />}
          </div>
        ))}
      </div>
    </section>
  );
}
export function VerificationPage() {
  const { works } = useDemo();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Work | null | undefined>(undefined);
  const [error, setError] = useState("");
  function verify(e: FormEvent) {
    e.preventDefault();
    const value = query.trim().toLowerCase();
    if (!value) {
      setError("Enter a Token ID or Contract Address.");
      return;
    }
    setError("");
    const id = value.replace(/^(token\s*)?#?/, "").padStart(3, "0");
    setResult(
      works.find((w) => w.id === id) ||
        (value === contract.toLowerCase() || value === "0xab12...91ef"
          ? works.find((w) => w.id === "001")
          : null),
    );
  }
  return (
    <div className="verification-page">
      <div className="verification-heading">
        <span className="verification-shield">
          <ShieldCheck size={31} />
        </span>
        <span className="eyebrow">TRUST, MADE TRANSPARENT</span>
        <h1>Verify Digital Artwork</h1>
        <p>
          Check the registration, ownership, license status, and royalty
          <br className="desktop-break" /> information of an NFT.
        </p>
      </div>
      <form className="verification-search" onSubmit={verify}>
        <Search size={22} />
        <input
          aria-label="Enter Token ID or Contract Address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Token ID or Contract Address"
        />
        <Button type="submit">
          <ShieldCheck />
          Verify NFT
        </Button>
      </form>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="verification-examples">
        <span>Try a demo NFT:</span>
        {["#001", "#002", "#003", "#004"].map((id) => (
          <Button
            variant="ghost"
            size="sm"
            key={id}
            onClick={() => {
              setQuery(id);
              setResult(works.find((w) => w.id === id.slice(1)) || null);
            }}
          >
            {id}
          </Button>
        ))}
      </div>
      {result === null && (
        <div className="not-found-result" role="status">
          <CircleX size={32} />
          <h2>NFT NOT FOUND</h2>
          <p>No demo NFT matches this Token ID or Contract Address.</p>
        </div>
      )}
      {result && <VerificationCard work={result} />}
      <div className="verification-info">
        <Info size={16} />
        <span>
          Verification checks mock blockchain records. Results are not proof of real blockchain
          ownership.
        </span>
      </div>
    </div>
  );
}
