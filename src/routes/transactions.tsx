import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/components/royaltichain/transactions';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/transactions')({
 head: () => metadata('Transaction History', 'Explore fictional NFT sales, wallet addresses, and royalty transaction records.'),
 component: () => <TransactionsPage/>,
});
