import { createFileRoute } from '@tanstack/react-router';
import { LicensesPage } from '@/components/royaltichain/licenses';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/licenses')({
 head: () => metadata('License Management', 'View, edit, and revoke artwork licenses while preserving their complete history.'),
 component: () => <LicensesPage/>,
});
