import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { currentUser, people } from '../data'

export default function RightPanel() {
  const [following, setFollowing] = useState([])
  return <aside className="hidden w-[320px] shrink-0 space-y-5 pt-4 xl:block">
    <div className="flex items-center gap-3 py-2"><Avatar src={currentUser.avatar} name={currentUser.name} size="md"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-ink">{currentUser.handle}</p><p className="text-sm text-muted">{currentUser.name}</p></div><button className="text-xs font-semibold text-brand">Switch</button></div>
    <section>
      <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold text-muted">Suggested for you</h3><button className="text-xs font-semibold text-ink">See All</button></div>
      <div className="space-y-4">{people.slice(1,5).map(p => <div className="flex items-center gap-3" key={p.id}><Link to={`/profile/${p.id}`} aria-label={`View ${p.name}'s profile`}><Avatar src={p.avatar} name={p.name} size="sm"/></Link><div className="min-w-0 flex-1"><Link to={`/profile/${p.id}`} className="truncate text-sm font-semibold text-ink hover:underline">{p.handle}</Link><p className="truncate text-xs text-muted">Suggested for you</p></div><button onClick={()=>setFollowing(current=>current.includes(p.id)?current.filter(id=>id!==p.id):[...current,p.id])} className="text-xs font-semibold text-brand">{following.includes(p.id)?'Following':'Follow'}</button></div>)}</div>
    </section>
    <p className="text-xs leading-5 text-slate-400">About · Help · Press · API · Jobs · Privacy · Terms<br/>Locations · Language · Meta Verified<br/><br/>© 2026 WE CHAT</p>
  </aside>
}
