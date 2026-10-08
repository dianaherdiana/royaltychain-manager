import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Search, FileCheck2, Pencil, Ban, Eye, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, DataTable, StatusBadge, Modal } from "./ui";
import { useDemo } from "./demo-provider";
import { shortDate, type Work } from "@/lib/demo-data";
export function LicensesPage() {
  const { works, updateWork } = useDemo();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Work | null>(null);
  const [revoking, setRevoking] = useState<Work | null>(null);
  const [error, setError] = useState("");
  const filtered = works.filter(
    (w) =>
      (filter === "All" || w.status === filter) &&
      w.title.toLowerCase().includes(query.toLowerCase()),
  );
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const f = new FormData(e.currentTarget);
    const start = String(f.get("start")),
      end = String(f.get("end"));
    if (end <= start) {
      setError("End date must be after start date.");
      return;
    }
    const license = String(f.get("license"));
    const royalty = Number(f.get("royalty"));
    updateWork(
      editing.id,
      {
        license,
        start,
        end,
        royalty,
        status:
          editing.status === "REVOKED" ? "REVOKED" : end < "2026-10-08" ? "EXPIRED" : "ACTIVE",
      },
      {
        title: "License updated",
        date: "Oct 08, 2026",
        note: `${license} · ${royalty}% royalty · ${start} to ${end}`,
      },
    );
    setEditing(null);
    setError("");
  }
  return (
    <>
      <PageHeading
        title="License Management"
        subtitle="Clear permissions. Protected creativity. Manage every license in one place."
      />
      <div className="license-summary">
        <div>
          <span className="stat-icon tone-green">
            <ShieldCheck size={20} />
          </span>
          <strong>{works.filter((w) => w.status === "ACTIVE").length}</strong>
          <span>Active licenses</span>
        </div>
        <div>
          <span className="status-dot warning-dot" />
          <strong>{works.filter((w) => w.status === "EXPIRED").length}</strong>
          <span>Expired</span>
        </div>
        <div>
          <span className="status-dot danger-dot" />
          <strong>{works.filter((w) => w.status === "REVOKED").length}</strong>
          <span>Revoked</span>
        </div>
      </div>
      <section className="panel">
        <div className="list-toolbar panel-toolbar">
          <div className="filter-tabs">
            {["All", "ACTIVE", "EXPIRED", "REVOKED"].map((f) => (
              <Button
                key={f}
                variant="ghost"
                className={filter === f ? "selected" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "All" ? "All licenses" : f.charAt(0) + f.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
          <div className="search-field">
            <Search size={16} />
            <input
              placeholder="Search artwork..."
              aria-label="Search licenses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          headers={[
            "Artwork",
            "License Type",
            "Start Date",
            "End Date",
            "Royalty",
            "Status",
            "Action",
          ]}
        >
          {filtered.map((w) => (
            <tr key={w.id}>
              <td>
                <div className="table-artwork">
                  <img src={w.image} alt="" width={36} height={36} />
                  <span>
                    {w.title}
                    <small>Token #{w.id}</small>
                  </span>
                </div>
              </td>
              <td>{w.license}</td>
              <td>
                {shortDate(w.start)}, {w.start.slice(0, 4)}
              </td>
              <td>
                {shortDate(w.end)}, {w.end.slice(0, 4)}
              </td>
              <td className="strong-cell">{w.royalty}%</td>
              <td>
                <StatusBadge status={w.status} />
              </td>
              <td>
                <div className="row-actions">
                  <Button variant="ghost" size="icon" asChild title="View license">
                    <Link to="/works/$id" params={{ id: w.id }} aria-label={`View ${w.title}`}>
                      <Eye />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Edit license"
                    aria-label={`Edit ${w.title}`}
                    onClick={() => {
                      setEditing(w);
                      setError("");
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="revoke-action"
                    title="Revoke license"
                    aria-label={`Revoke ${w.title}`}
                    disabled={w.status === "REVOKED"}
                    onClick={() => setRevoking(w)}
                  >
                    <Ban />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
        {filtered.length === 0 && <div className="empty-state">No matching licenses.</div>}
        <div className="table-footer">
          Showing {filtered.length} licenses <span>History is preserved for every license.</span>
        </div>
      </section>
      <div className="info-note">
        <Info size={18} />
        <p>
          Revoking a license changes its status, but does not remove its registration or license
          history.
        </p>
      </div>
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit License"
        description={editing?.title || "License details"}
      >
        {editing && (
          <form onSubmit={save}>
            <label className="field-label">
              License Type
              <select name="license" defaultValue={editing.license}>
                {["Personal", "Commercial", "Exclusive", "Non-Exclusive"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <div className="two-fields">
              <label className="field-label">
                Start Date
                <input name="start" required type="date" defaultValue={editing.start} />
              </label>
              <label className="field-label">
                End Date
                <input name="end" required type="date" defaultValue={editing.end} />
              </label>
            </div>
            <label className="field-label">
              Royalty Percentage
              <input
                name="royalty"
                required
                type="number"
                min="0"
                max="100"
                step="0.1"
                defaultValue={editing.royalty}
              />
            </label>
            {editing.status === "REVOKED" && (
              <p className="field-help">This license will remain revoked.</p>
            )}
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        )}
      </Modal>
      <Modal
        open={!!revoking}
        onClose={() => setRevoking(null)}
        title="Revoke this license?"
        description={`${revoking?.title || ""} · This action is recorded in license history.`}
      >
        <p className="muted-copy">
          The license will no longer be active. All previous registrations and transactions will
          remain visible.
        </p>
        <div className="modal-actions">
          <Button variant="outline" onClick={() => setRevoking(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (!revoking) return;
              updateWork(
                revoking.id,
                { status: "REVOKED" },
                {
                  title: "License revoked",
                  date: "Oct 08, 2026",
                  note: "Revoked by creator · Previous license history preserved",
                },
              );
              setRevoking(null);
            }}
          >
            Revoke License
          </Button>
        </div>
      </Modal>
    </>
  );
}
