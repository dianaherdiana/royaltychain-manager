import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { earnings } from '@/lib/demo-data';
export function RoyaltyChart({bar=false,period='6'}:{bar?:boolean;period?:string}) {
 const [mounted,setMounted]=useState(false);useEffect(()=>setMounted(true),[]);
 const data=period==='3'?earnings.slice(-3):earnings;
 if(!mounted)return <div className="chart-loading"/>;
 const shared=[<CartesianGrid key="grid" vertical={false} stroke="var(--border)" strokeDasharray="3 4"/>,<XAxis key="x" dataKey="month" axisLine={false} tickLine={false} tick={{fill:'var(--muted-foreground)',fontSize:11}} dy={10}/>,<YAxis key="y" domain={[0,1]} ticks={[0,0.25,0.5,0.75,1]} axisLine={false} tickLine={false} tick={{fill:'var(--muted-foreground)',fontSize:11}} width={48} tickFormatter={v=>`${v} ETH`}/>,<Tooltip key="tooltip" cursor={false} contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,color:'var(--foreground)',fontSize:12}} formatter={(v:number)=>[`${v} ETH`,'Royalty']}/>];
 return <div className="royalty-chart"><ResponsiveContainer width="100%" height="100%">{bar?<BarChart data={data} margin={{top:15,right:18,left:12,bottom:8}}>{shared}<Bar isAnimationActive={false} dataKey="amount" fill="var(--primary)" radius={[5,5,0,0]} maxBarSize={44}/></BarChart>:<AreaChart data={data} margin={{top:15,right:18,left:12,bottom:8}}>{shared}<defs><linearGradient id="royaltyFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.01}/></linearGradient></defs><Area isAnimationActive={false} type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={2.7} fill="url(#royaltyFill)" dot={{r:3,fill:'var(--card)',stroke:'var(--primary)',strokeWidth:2}} activeDot={{r:5}}/></AreaChart>}</ResponsiveContainer></div>;
}
