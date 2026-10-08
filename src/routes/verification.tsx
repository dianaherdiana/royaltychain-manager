import { createFileRoute } from '@tanstack/react-router';
import { VerificationPage } from '@/components/royaltichain/verification';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/verification')({
 head: () => metadata('NFT Verification', 'Check demo NFT registration, license status, and royalty information.'),
 component: () => <VerificationPage/>,
});
