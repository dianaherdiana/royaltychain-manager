import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/royaltichain/settings";
import { metadata } from "@/lib/demo-data";
export const Route = createFileRoute("/profile")({
  head: () =>
    metadata("Creator Profile", "Manage your fictional creator profile and demo wallet identity."),
  component: () => <SettingsPage profile />,
});
