import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/components/royaltichain/transactions';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/royalty')({
 head: () => metadata('Royalty Tracking', 'Follow monthly NFT royalty earnings and simulated royalty distributions.'),
 component: () => <TransactionsPage royalty/>,
});
