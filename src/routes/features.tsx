import { createFileRoute } from '@tanstack/react-router';
import { InformationPage } from '@/components/royaltichain/public-pages';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/features')({
 head: () => metadata('Features', 'Discover digital artwork registration, license management, royalty tracking, and NFT verification.'),
 component: () => <InformationPage features/>,
});
