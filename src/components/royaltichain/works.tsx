import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Search, LayoutGrid, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, ArtworkCard, EmptyState } from "./ui";
import { useDemo } from "./demo-provider";
export function WorksPage() {
  const { works } = useDemo();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = works.filter(
    (w) =>
      w.title.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || w.status === filter),
  );
  return (
    <>
      <PageHeading
        title="My Digital Works"
        subtitle="Manage your registered NFT artworks."
        action={
          <Button asChild>
            <Link to="/register">
              <Plus />
              Register New Work
            </Link>
          </Button>
        }
      />
      <div className="list-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            aria-label="Search artworks"
            placeholder="Search your artworks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <select
            aria-label="Filter license status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All licenses</option>
            <option value="ACTIVE">Active</option>
            <option value="EXPIRED">Expired</option>
            <option value="REVOKED">Revoked</option>
          </select>
          <span className="results-count">{filtered.length} works</span>
          <span className="grid-view-icon">
            <LayoutGrid size={18} />
          </span>
        </div>
      </div>
      <div className="artwork-grid works-grid">
        {filtered.map((w) => (
          <ArtworkCard work={w} key={w.id} />
        ))}
      </div>
      {filtered.length === 0 && (
        <EmptyState
          title="No artworks found"
          message="Try a different search or register a new work."
        />
      )}
      <div className="library-note">
        Your registered works and licensing information are displayed using fictional demo data.
      </div>
    </>
  );
}
