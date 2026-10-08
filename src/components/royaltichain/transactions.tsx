import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CircleDollarSign,
  Percent,
  ArrowLeftRight,
  Info,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard, PageHeading, DataTable, StatusBadge } from "./ui";
import { RoyaltyChart } from "./chart";
import { useDemo } from "./demo-provider";
import { transactions, shortDate } from "@/lib/demo-data";
export function TransactionsPage({ royalty = false }: { royalty?: boolean }) {
  const { works } = useDemo();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("6");
  const filtered = transactions.filter(
    (t) =>
      (filter === "All" || t.status === filter) &&
      [t.hash, works.find((w) => w.id === t.workId)?.title, t.buyer].some((v) =>
        v?.toLowerCase().includes(query.toLowerCase()),
      ),
  );
  function download() {
    const csv = [
      "Transaction,Artwork,Token ID,Buyer,Sale Price ETH,Royalty ETH,Timestamp,Status",
      ...filtered.map((t) => {
        const w = works.find((w) => w.id === t.workId);
        return [
          t.hash,
          w?.title,
          t.workId,
          t.buyer,
          t.price,
          ((t.price * (w?.royalty || 0)) / 100).toFixed(4),
          t.date,
          t.status,
        ].join(",");
      }),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "royaltichain-demo-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <PageHeading
        title={royalty ? "Royalty Tracking" : "Transaction History"}
        subtitle={
          royalty
            ? "Your creativity keeps earning. Follow every royalty, transparently."
            : "A transparent record of your NFT sales and royalty activity."
        }
        action={
          <Button variant="outline" onClick={download}>
            <Download />
            Export CSV
          </Button>
        }
      />
      {royalty && (
        <>
          <div className="stats-grid three-stats">
            <StatCard
              label="Total Royalty"
              value="2.45 ETH"
              change="24.8%"
              icon={CircleDollarSign}
              tone="green"
            />
            <StatCard label="Royalty Rate" value="5%" change="Configured rate" icon={Percent} />
            <StatCard
              label="Transactions"
              value="28"
              change="16.7%"
              icon={ArrowLeftRight}
              tone="blue"
            />
          </div>
          <section className="panel earnings-panel">
            <div className="panel-heading">
              <div>
                <h2>Royalty Earnings</h2>
                <p>Monthly royalty distributions · ETH</p>
              </div>
              <select
                className="compact-select"
                aria-label="Earnings period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="6">Last 6 months</option>
                <option value="3">Last 3 months</option>
              </select>
            </div>
            <RoyaltyChart bar period={period} />
          </section>
        </>
      )}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>{royalty ? "Royalty Transactions" : "All Transactions"}</h2>
            <p>Fictional transactions in the demo environment</p>
          </div>
        </div>
        <div className="list-toolbar panel-toolbar">
          <div className="filter-tabs">
            {["All", "Completed", "Pending", "Failed"].map((f) => (
              <Button
                key={f}
                variant="ghost"
                className={filter === f ? "selected" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <div className="search-field">
            <Search size={16} />
            <input
              aria-label="Search transactions"
              placeholder="Search transactions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          headers={
            royalty
              ? ["Transaction", "Artwork", "Sale Price", "Royalty", "Date", "Status"]
              : [
                  "Transaction Hash",
                  "Artwork",
                  "Token ID",
                  "Buyer",
                  "Sale Price",
                  "Royalty",
                  "Timestamp",
                  "Status",
                ]
          }
        >
          {filtered.map((t) => {
            const w = works.find((w) => w.id === t.workId);
            return (
              <tr key={t.hash}>
                <td>
                  <span className="hash-text">{t.hash}</span>
                </td>
                <td>
                  <Link className="table-artwork" to="/works/$id" params={{ id: t.workId }}>
                    <img src={w?.image} alt="" width={32} height={32} />
                    <span>{w?.title}</span>
                  </Link>
                </td>
                {!royalty && (
                  <>
                    <td>#{t.workId}</td>
                    <td className="hash-text">{t.buyer}</td>
                  </>
                )}
                <td className="strong-cell">{t.price} ETH</td>
                <td className="royalty-cell">
                  {((t.price * (w?.royalty || 0)) / 100)
                    .toFixed(4)
                    .replace(/0+$/, "")
                    .replace(/\.$/, "")}{" "}
                  ETH
                </td>
                <td>
                  {shortDate(t.date)}
                  {!royalty && <small className="table-time">{t.date.slice(11, 16)} UTC</small>}
                </td>
                <td>
                  <StatusBadge status={t.status} />
                </td>
              </tr>
            );
          })}
        </DataTable>
        {filtered.length === 0 && <div className="empty-state">No matching transactions.</div>}
        <div className="table-footer">
          Showing {filtered.length} transactions<span>Demo data · No real funds transferred</span>
        </div>
      </section>
      <div className="info-note">
        <Info size={18} />
        <p>
          {royalty
            ? "Royalty is calculated automatically based on the configured royalty percentage."
            : "Wallet addresses are shortened. No personal information is stored or displayed."}
        </p>
      </div>
    </>
  );
}
