import { createFileRoute } from "@tanstack/react-router";
import { InformationPage } from "@/components/royaltichain/public-pages";
import { metadata } from "@/lib/demo-data";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    metadata(
      "How It Works",
      "Learn the RoyaltiChain workflow: register an artwork, manage a license, and track creator royalties.",
    ),
  component: () => <InformationPage />,
});
