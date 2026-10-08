import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/royaltichain/dashboard";
import { metadata } from "@/lib/demo-data";
export const Route = createFileRoute("/")({
  head: () =>
    metadata(
      "Creator Dashboard",
      "Manage digital artworks, NFT licenses, and royalty activity in the RoyaltiChain demo workspace.",
    ),
  component: () => <DashboardPage />,
});
