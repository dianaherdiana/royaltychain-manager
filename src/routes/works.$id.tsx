import { createFileRoute } from '@tanstack/react-router';
import { DetailPage } from '@/components/royaltichain/detail';
import { metadata } from '@/lib/demo-data';
export const Route = createFileRoute('/works/$id')({
 head: ({params}) => metadata(`Artwork #${params.id}`, 'View NFT ownership, licensing history, and simulated royalty transactions for this digital artwork.'),
 component: NFTDetail,
});
function NFTDetail(){const {id}=Route.useParams();return <DetailPage id={id}/>;}
