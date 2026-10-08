import sunset from '@/assets/digital-sunset.jpg';
import garden from '@/assets/cyber-garden.jpg';
import pixel from '@/assets/pixel-dreams.jpg';
import abstract from '@/assets/abstract-motion.jpg';
export type LicenseStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';
export type Work = { id: string; title: string; image: string; description: string; category: string; license: string; start: string; end: string; royalty: number; status: LicenseStatus; history: { title: string; date: string; note: string }[] };
export const contract = '0xAB12CD34EF567890AB12CD34EF567890AB1291EF';
export const creator = '0x12A4...89BC';
export const initialWorks: Work[] = [
 { id:'001', title:'Digital Sunset', image:sunset, description:'A quiet moment between light and water. An exploration of color, atmosphere, and the beauty of a digital horizon.',category:'Digital Art',license:'Commercial',start:'2026-10-01',end:'2027-10-01',royalty:5,status:'ACTIVE',history:[{title:'NFT registered',date:'Oct 01, 2026',note:'Artwork metadata registered • Demo transaction'},{title:'Commercial license activated',date:'Oct 02, 2026',note:'Valid until Oct 01, 2027'}]},
 { id:'002', title:'Cyber Garden', image:garden, description:'An imagined botanical world where organic forms meet luminous glass.',category:'3D Art',license:'Non-Exclusive',start:'2026-10-02',end:'2027-10-02',royalty:5,status:'ACTIVE',history:[{title:'NFT registered',date:'Oct 02, 2026',note:'Artwork metadata registered • Demo transaction'},{title:'Non-Exclusive license activated',date:'Oct 03, 2026',note:'Valid until Oct 02, 2027'}]},
 { id:'003', title:'Pixel Dreams', image:pixel, description:'Floating islands and pastel skies, one pixel at a time.',category:'Pixel Art',license:'Personal',start:'2025-09-01',end:'2026-09-01',royalty:5,status:'EXPIRED',history:[{title:'Personal license activated',date:'Sep 01, 2025',note:'One-year license'},{title:'License expired',date:'Sep 01, 2026',note:'License history remains available'}]},
 { id:'004', title:'Abstract Motion', image:abstract, description:'A study of fluid movement through sculptural silk and color.',category:'3D Art',license:'Exclusive',start:'2026-08-01',end:'2027-08-01',royalty:5,status:'REVOKED',history:[{title:'Exclusive license activated',date:'Aug 01, 2026',note:'One-year license'},{title:'License revoked',date:'Sep 20, 2026',note:'Revocation recorded; previous history preserved'}]},
];
export type Transaction = { hash:string; workId:string; buyer:string; price:number; date:string; status:'Completed'|'Pending'|'Failed' };
export const transactions: Transaction[] = [
 {hash:'0x98FA...72BC',workId:'001',buyer:'0x89EF...123A',price:1.2,date:'2026-10-08T08:42:00Z',status:'Completed'},
 {hash:'0x72AD...81F2',workId:'002',buyer:'0x34CD...78EF',price:0.8,date:'2026-10-06T14:15:00Z',status:'Completed'},
 {hash:'0x81BC...93A1',workId:'003',buyer:'0x56AB...90CD',price:0.5,date:'2026-10-04T10:30:00Z',status:'Pending'},
 {hash:'0x42DF...67E3',workId:'004',buyer:'0x89EF...123A',price:0.65,date:'2026-10-03T16:05:00Z',status:'Completed'},
 {hash:'0x63EA...25B8',workId:'001',buyer:'0x78EF...12AB',price:0.4,date:'2026-10-01T09:20:00Z',status:'Failed'},
];
export const earnings = [{month:'May',amount:0.16},{month:'Jun',amount:0.28},{month:'Jul',amount:0.22},{month:'Aug',amount:0.42},{month:'Sep',amount:0.55},{month:'Oct',amount:0.82}];
export function shortDate(date:string) { return new Date(date).toLocaleDateString('en-US',{month:'short',day:'2-digit',timeZone:'UTC'}); }
export function metadata(title:string,description:string) { return {meta:[{title:`${title} — RoyaltiChain`},{name:'description',content:description},{property:'og:title',content:`${title} — RoyaltiChain`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }
