import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/components/royaltichain/register";
import { metadata } from "@/lib/demo-data";
export const Route = createFileRoute("/register")({
  head: () =>
    metadata(
      "Register New Work",
      "Register a digital artwork with a simulated NFT identity, license, and royalty rate.",
    ),
  component: () => <RegisterPage />,
});
