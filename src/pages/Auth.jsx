import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { AUTH_STORAGE_KEY } from '../auth'

const DEMO_USERNAME = 'ram'
const DEMO_PASSWORD = 'password123'

export default function Auth({ signup = false }) {
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState(DEMO_USERNAME)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(signup ? '' : DEMO_PASSWORD)
  const navigate = useNavigate()

  const submit = event => {
    event.preventDefault()
    if (signup && !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (!signup && !username.trim()) {
      setError('Please enter your username.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setError('')
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    if (remember) localStorage.setItem('socially-user', signup ? email : username)
    navigate('/')
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 p-12 text-white lg:flex">
        <Link to="/login" aria-label="We Chat home" className="flex items-center gap-2">
          <img src="/We%20Chat.png" alt="" className="h-16 w-16 object-contain"/>
          <span className="brand-wordmark text-2xl font-extrabold">We Chat</span>
        </Link>
        <div className="max-w-lg">
          <Sparkles size={34} />
          <h1 className="mt-6 text-5xl font-black leading-tight">Capture life.<br />Share moments.<br />Stay connected.</h1>
          <p className="mt-5 text-lg text-white/90">See photos and videos from people you care about.</p>
        </div>
        <p className="text-sm text-white/80">© 2026 We Chat</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" aria-label="We Chat home" className="flex items-center gap-2 lg:hidden">
            <img src="/We%20Chat.png" alt="" className="h-16 w-16 object-contain"/>
            <span className="brand-wordmark text-2xl font-extrabold">We Chat</span>
          </Link>
          <p className="mt-8 text-sm font-bold text-brand">{signup ? 'GET STARTED' : 'WELCOME BACK'}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-ink">{signup ? 'Create your account' : 'Sign in to We Chat'}</h2>
          <p className="mt-2 text-sm text-muted">{signup ? 'Join your friends and start sharing.' : 'Your friends are just a click away.'}</p>

          {!signup && <div className="mt-5 rounded-lg border border-fuchsia-100 bg-fuchsia-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Demo login details</p>
            <p className="mt-1">Username: <code className="font-semibold">{DEMO_USERNAME}</code></p>
            <p>Password: <code className="font-semibold">{DEMO_PASSWORD}</code></p>
          </div>}

          <form onSubmit={submit} className="mt-6 space-y-5">
            {signup && <div>
              <label htmlFor="full-name" className="mb-2 block text-xs font-bold text-slate-600">Full name</label>
              <input id="full-name" required placeholder="Sharthik" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand" />
            </div>}
            <div>
              <label htmlFor="account-name" className="mb-2 block text-xs font-bold text-slate-600">{signup ? 'Email address' : 'Username'}</label>
              <input
                id="account-name"
                type={signup ? 'email' : 'text'}
                required
                autoComplete={signup ? 'email' : 'username'}
                value={signup ? email : username}
                onChange={event => signup ? setEmail(event.target.value) : setUsername(event.target.value)}
                placeholder={signup ? 'you@example.com' : DEMO_USERNAME}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold text-slate-600">Password</label>
              <div className="relative">
                <input id="password" type={show ? 'text' : 'password'} required value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 6 characters" autoComplete={signup ? 'new-password' : 'current-password'} className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-brand" />
                <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} className="absolute right-4 top-3 text-slate-400">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>
            {!signup && <label className="flex items-center gap-2 text-xs text-slate-500"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} className="accent-brand" /> Remember me</label>}
            {error && <p role="alert" className="text-xs text-rose-500">{error}</p>}
            <button className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition hover:bg-fuchsia-700">{signup ? 'Create account' : 'Sign in'}</button>
          </form>

          <p className="mt-7 text-center text-sm text-muted">{signup ? 'Already have an account?' : 'New to We Chat?'} <Link to={signup ? '/login' : '/signup'} className="font-bold text-brand">{signup ? 'Sign in' : 'Create an account'}</Link></p>
          <p className="mt-10 text-center text-xs text-slate-400">By continuing, you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}
