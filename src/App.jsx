import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Home as HomeIcon, Menu, Plus, Search, UserRound } from 'lucide-react'
import { AUTH_STORAGE_KEY } from './auth'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

function Layout({ children }) {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const focusComposer = () => {
    document.querySelector('textarea')?.focus()
    setMenu(false)
  }
  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setMenu(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] lg:flex">
      <Sidebar open={menu} onClose={() => setMenu(false)} onCreate={focusComposer} onLogout={logout} />
      <main className="min-w-0 flex-1 pb-16 lg:pb-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
          <button aria-label="Open menu" onClick={() => setMenu(true)} className="rounded-full p-2 text-ink">
            <Menu size={21} />
          </button>
          <Link to="/" aria-label="We Chat home" className="flex items-center gap-1">
            <img src="/We%20Chat.png" alt="" className="h-10 w-10 object-contain"/>
            <span className="brand-wordmark font-bold">We Chat</span>
          </Link>
          <Link aria-label="Notifications" to="/notifications" className="rounded-full p-2 text-ink">
            <Heart size={22} />
          </Link>
        </header>
        <div className="mx-auto flex max-w-[975px] gap-8 px-0 py-0 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[630px] min-w-0">{children}</div>
          <RightPanel />
        </div>
        <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 flex h-14 items-center justify-around border-t border-line bg-white lg:hidden">
          <Link aria-label="Home" to="/" className="p-2 text-ink"><HomeIcon size={23} /></Link>
          <Link aria-label="Explore" to="/explore" className="p-2 text-ink"><Search size={23} /></Link>
          <Link aria-label="Create post" to="/" onClick={focusComposer} className="p-2 text-ink"><Plus size={24} /></Link>
          <Link aria-label="Notifications" to="/notifications" className="p-2 text-ink"><Heart size={23} /></Link>
          <Link aria-label="Profile" to="/profile" className="p-2 text-ink"><UserRound size={23} /></Link>
        </nav>
      </main>
    </div>
  )
}

function RequireAuth({ children }) {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
    ? children
    : <Navigate to="/login" replace />
}

function AppIntro() {
  return (
    <div className="app-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-fuchsia-50 via-purple-100 to-pink-100" role="status" aria-label="Loading We Chat">
      <div className="intro-float intro-float-one" aria-hidden="true"><MessageCircle size={38} fill="currentColor"/></div>
      <div className="intro-float intro-float-two" aria-hidden="true"><Heart size={32} fill="currentColor"/></div>
      <div className="intro-float intro-float-three" aria-hidden="true"><MessageCircle size={26} fill="currentColor"/></div>
      <div className="intro-float intro-float-four" aria-hidden="true"><Heart size={24} fill="currentColor"/></div>
      <div className="relative z-10 flex flex-col items-center text-center text-slate-800">
        <img src="/We%20Chat.png" alt="" className="intro-logo h-32 w-32 object-contain drop-shadow-xl"/>
        <h1 className="brand-wordmark mt-3 text-4xl font-black">We Chat</h1>
        <p className="mt-2 text-sm font-medium text-slate-600">Share moments. Stay connected.</p>
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          <span className="intro-loading-dot"/>
          <span className="intro-loading-dot"/>
          <span className="intro-loading-dot"/>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      setShowIntro(false)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth signup />} />
        <Route path="/" element={<RequireAuth><Layout><Home /></Layout></RequireAuth>} />
        <Route path="/explore" element={<RequireAuth><Layout><Explore /></Layout></RequireAuth>} />
        <Route path="/notifications" element={<RequireAuth><Layout><Notifications /></Layout></RequireAuth>} />
        <Route path="/messages" element={<RequireAuth><Layout><Messages /></Layout></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Layout><Profile /></Layout></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><Layout><Profile /></Layout></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showIntro && <AppIntro />}
    </>
  )
}
