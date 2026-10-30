import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, TrendingUp, Hash } from 'lucide-react'
import Avatar from '../components/Avatar'
import { people, initialPosts } from '../data'
const topics=['#designinspiration','#travelgram','#coffeetime','#dailyvibes','#photography','#mindfulmoments']
export default function Explore(){
 const [q,setQ]=useState('')
 const matches=useMemo(()=>people.filter(p=>(p.name+' '+p.handle).toLowerCase().includes(q.toLowerCase())),[q])
 return <div className="space-y-6"><div><p className="text-sm text-muted">Find your people and inspiration</p><h1 className="mt-1 text-2xl font-black text-ink">Explore</h1></div><div className="relative"><Search className="absolute left-4 top-3.5 text-slate-400" size={19}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search people, posts, or topics..." className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm shadow-soft outline-none focus:ring-2 focus:ring-brand/20"/></div>
 <section className="rounded-3xl bg-white p-5 shadow-soft"><div className="mb-4 flex items-center gap-2"><TrendingUp className="text-brand" size={19}/><h2 className="font-extrabold text-ink">Trending topics</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{topics.map((t,i)=><div key={t} className="rounded-2xl bg-slate-50 p-4"><Hash className="mb-3 text-brand" size={18}/><p className="text-sm font-bold text-ink">{t}</p><p className="mt-1 text-xs text-muted">{(8.4-i*.8).toFixed(1)}k posts</p></div>)}</div></section>
 <section><h2 className="mb-4 font-extrabold text-ink">{q?'People results':'People to discover'}</h2><div className="grid gap-3 sm:grid-cols-2">{matches.map(p=><div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft"><Link to={`/profile/${p.id}`} aria-label={`View ${p.name}'s profile`}><Avatar src={p.avatar} name={p.name}/></Link><div className="min-w-0 flex-1"><Link to={`/profile/${p.id}`} className="font-bold text-ink hover:underline">{p.name}</Link><p className="text-xs text-muted">@{p.handle}</p></div><button className="rounded-full bg-soft px-4 py-2 text-xs font-bold text-brand hover:bg-brand hover:text-white">Follow</button></div>)}</div>{matches.length===0&&<p className="rounded-2xl bg-white p-5 text-sm text-muted">No people found. Try another search.</p>}</section>
 <section><h2 className="mb-4 font-extrabold text-ink">Popular this week</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{initialPosts.map(p=><div key={p.id} className="group relative overflow-hidden rounded-2xl"><img src={p.image} alt="Explore post" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-3 text-xs font-semibold text-white">{p.likes} likes</div></div>)}</div></section>
 </div>
}
