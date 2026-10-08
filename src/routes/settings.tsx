import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/royaltichain/settings';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/settings')({
 head: () => metadata('Settings', 'Configure your RoyaltiChain demo workspace and notification preferences.'),
 component: () => <SettingsPage/>,
});
