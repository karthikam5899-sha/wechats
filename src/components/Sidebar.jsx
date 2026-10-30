import { Link, NavLink } from 'react-router-dom'
import { Home, Compass, Heart, MessageCircle, UserRound, PlusSquare, LogOut, X } from 'lucide-react'
import Avatar from './Avatar'
import { currentUser } from '../data'

const links = [
  [Home, 'Home', '/'], [Compass, 'Explore', '/explore'], [Heart, 'Notifications', '/notifications'],
  [MessageCircle, 'Messages', '/messages'], [UserRound, 'Profile', '/profile']
]
export default function Sidebar({ open, onClose, onCreate, onLogout }) {
  return <>
    {open && <button aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" />}
    <aside className={`sidebar-scroll fixed bottom-0 left-0 top-0 z-40 flex w-[270px] flex-col overflow-y-auto overscroll-contain border-r border-line bg-white px-6 py-7 transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-[245px] lg:shrink-0 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between px-1">
        <Link to="/" onClick={onClose} aria-label="We Chat home" className="flex items-center gap-2">
          <img src="/We%20Chat.png" alt="" className="h-12 w-12 object-contain"/>
          <span className="brand-wordmark text-xl font-extrabold tracking-tight">We Chat</span>
        </Link>
        <button onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-slate-100 lg:hidden"><X size={19}/></button>
      </div>
      <nav className="space-y-2">
        {links.map(([Icon, label, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({isActive}) => `flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm transition ${isActive ? 'font-bold text-ink' : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-ink'}`}>
          <Icon size={22}/>{label}{label === 'Notifications' && <span className="ml-auto h-2 w-2 rounded-full bg-rose-500"/>}
        </NavLink>)}
      </nav>
      <button onClick={onCreate} className="mt-5 flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink"><PlusSquare size={22}/> Create</button>
      <button onClick={onLogout} className="flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-rose-600"><LogOut size={22}/> Log out</button>
      <div className="mt-auto flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
        <Avatar src={currentUser.avatar} name={currentUser.name} size="sm"/>
        <div className="min-w-0"><p className="truncate text-sm font-bold text-ink">{currentUser.name}</p><p className="text-xs text-muted">@{currentUser.handle}</p></div>
      </div>
    </aside>
  </>
}
