import { createFileRoute } from "@tanstack/react-router";
import { WelcomePage } from "@/components/royaltichain/public-pages";
import { metadata } from "@/lib/demo-data";
export const Route = createFileRoute("/welcome")({
  head: () =>
    metadata(
      "RoyaltiChain",
      "Manage your digital works, licenses, and royalties in a transparent creator workspace.",
    ),
  component: () => <WelcomePage />,
});
