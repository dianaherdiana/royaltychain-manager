import { createFileRoute } from '@tanstack/react-router';
import { WorksPage } from '@/components/royaltichain/works';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/works')({
 head: () => metadata('My Digital Works', 'Browse and manage your registered digital artworks and NFT license status.'),
 component: () => <WorksPage/>,
});
