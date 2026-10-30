import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Settings, Grid3X3, X, Heart, MessageCircle, Send } from 'lucide-react'
import Avatar from '../components/Avatar'
import { currentUser, initialPosts, people } from '../data'

const ownProfilePosts = [
  { image: '/IMG_20260928_083421.jpg', hashtags: ['#TamilNadu', '#TempleVisit', '#Travel'], likes: 42, comments: [{ user: people[0], text: 'Beautiful temple!' }] },
  { image: '/IMG-20260917-WA0033.jpg', hashtags: ['#Wildlife', '#Nature', '#IncredibleIndia'], likes: 68, comments: [{ user: people[3], text: 'What a lovely elephant 🐘' }] },
  { image: '/IMG-20260917-WA0032.jpg', hashtags: ['#Sunset', '#EveningVibes', '#TamilNadu'], likes: 53, comments: [{ user: people[1], text: 'Such a beautiful sunset!' }] },
  { image: '/HVzJ6iuaEAAZXEP.jpg', hashtags: ['#Devotional', '#Tradition', '#Culture'], likes: 37, comments: [{ user: people[4], text: 'Amazing photo 🙏' }] },
  { image: '/HTTR7PjbgAAO-wp.jpg', hashtags: ['#ActorVijay', '#Cinema', '#Thalapathy'], likes: 126, comments: [{ user: people[2], text: 'Great moment!' }] },
  { image: '/HSD-SLaaIAASSLR%20(1).jpg', hashtags: ['#Vijay', '#TamilCinema', '#Memories'], likes: 94, comments: [{ user: people[0], text: 'Super photo 🔥' }] },
  { image: '/HSCIowma0AEHwqO.jpg', hashtags: ['#Vijay', '#TamilNadu', '#FanMoment'], likes: 112, comments: [{ user: people[1], text: 'Love this one!' }] }
].map((post, index) => ({ id: index + 1, ...post, liked: false }))

export default function Profile(){
 const { id } = useParams()
 const viewedPerson = people.find(person => String(person.id) === id)
 const isOwnProfile = !id
 const [editing,setEditing]=useState(false),[name,setName]=useState(currentUser.name),[bio,setBio]=useState(currentUser.bio)
 const [profilePostsState,setProfilePostsState]=useState(ownProfilePosts)
 const [openComments,setOpenComments]=useState(null)
 const [commentText,setCommentText]=useState('')
 const [shareMessage,setShareMessage]=useState('')
 const profile = viewedPerson || currentUser
 const displayName = isOwnProfile ? name : profile.name
 const displayBio = isOwnProfile ? bio : profile.bio
 const profilePosts = isOwnProfile ? profilePostsState : profile.id === 6 ? initialPosts : initialPosts.filter(post => post.user.id === profile.id)
 const toggleLike = postId => setProfilePostsState(posts => posts.map(post => post.id === postId ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post))
 const addComment = (event, postId) => {
  event.preventDefault()
  const text = commentText.trim()
  if (!text) return
  setProfilePostsState(posts => posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, { user: currentUser, text }] } : post))
  setCommentText('')
 }
 const sharePost = async postId => {
  const url = `${window.location.origin}/profile${isOwnProfile ? '' : `/${profile.id}`}#post-${postId}`
  try {
   if (navigator.share) await navigator.share({ title: `${displayName}'s post`, url })
   else if (navigator.clipboard) await navigator.clipboard.writeText(url)
   else throw new Error('Sharing is not supported in this browser.')
   setShareMessage(navigator.share ? 'Post shared!' : 'Post link copied!')
  } catch (error) {
   if (error.name === 'AbortError') return
   setShareMessage('Could not share this post. Please try again.')
  }
  window.setTimeout(() => setShareMessage(''), 2200)
 }
 return <div><div className="overflow-hidden rounded-lg border border-line bg-white"><div className="h-36 bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-400 sm:h-48"/><div className="px-6 pb-6"><div className="-mt-12 flex items-end justify-between"><Avatar src={profile.avatar} name={displayName} size="xl" ring/>{isOwnProfile&&<button onClick={()=>setEditing(true)} className="mt-4 flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-xs font-bold text-ink hover:bg-slate-50"><Settings size={15}/> Edit profile</button>}</div><h1 className="mt-4 text-xl font-black text-ink">{displayName}</h1><p className="text-sm text-muted">@{profile.handle}</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">{displayBio}</p><div className="mt-5 flex flex-wrap gap-6"><p className="text-sm text-muted"><strong className="text-ink">{profile.posts.toLocaleString()}</strong> posts</p><p className="text-sm text-muted"><strong className="text-ink">{profile.followers.toLocaleString()}</strong> followers</p><p className="text-sm text-muted"><strong className="text-ink">{profile.following.toLocaleString()}</strong> following</p></div></div></div>
 <div className="mt-6 flex items-center gap-2 border-b border-slate-200 pb-3 text-sm font-bold text-brand"><Grid3X3 size={17}/> Posts</div>{isOwnProfile?<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{profilePosts.map(p=><article id={`post-${p.id}`} key={p.id} className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-sm"><div className="flex aspect-square items-center justify-center bg-slate-50"><img src={p.image} alt={`Post by ${displayName}`} className="h-full w-full object-contain"/></div><div className="p-3"><div className="flex items-center gap-4"><button type="button" aria-label={p.liked?'Unlike post':'Like post'} onClick={()=>toggleLike(p.id)} className={`flex items-center gap-1.5 text-sm ${p.liked?'text-rose-500':'text-ink'}`}><Heart size={20} fill={p.liked?'currentColor':'none'}/>{p.likes}</button><button type="button" aria-label="Show comments" onClick={()=>setOpenComments(openComments===p.id?null:p.id)} className="flex items-center gap-1.5 text-sm text-ink"><MessageCircle size={20}/>{p.comments.length}</button><button type="button" aria-label="Share post" onClick={()=>sharePost(p.id)} className="text-ink"><Send size={19}/></button></div><p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-brand">{p.hashtags.map(tag=><span key={tag}>{tag}</span>)}</p>{openComments===p.id&&<div className="mt-3 space-y-2 border-t border-line pt-3">{p.comments.map((comment,index)=><p key={`${comment.user.handle}-${index}`} className="text-sm text-ink"><Link to={comment.user.id?`/profile/${comment.user.id}`:'/profile'} className="mr-2 font-semibold hover:underline">{comment.user.handle}</Link>{comment.text}</p>)}<form onSubmit={event=>addComment(event,p.id)} className="flex gap-2 pt-1"><input value={commentText} onChange={event=>setCommentText(event.target.value)} placeholder="Add a comment..." aria-label="Add a comment" className="min-w-0 flex-1 border-b border-line py-2 text-sm outline-none"/><button type="submit" disabled={!commentText.trim()} className="text-xs font-bold text-brand disabled:opacity-40">Post</button></form></div>}</div></article>)}</div>:<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{profilePosts.map(p=><div key={p.id} className="overflow-hidden rounded-2xl"><img src={p.image} alt={`Post by ${displayName}`} className="aspect-square w-full object-cover transition hover:scale-105"/></div>)}</div>}{profilePosts.length===0&&<p className="py-8 text-center text-sm text-muted">No posts to show yet.</p>}{shareMessage&&<div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-xl">{shareMessage}</div>}
 {editing&&<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"><form onSubmit={e=>{e.preventDefault();setEditing(false)}} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-black text-ink">Edit profile</h2><button type="button" onClick={()=>setEditing(false)}><X size={20}/></button></div><label className="mb-2 block text-xs font-bold text-slate-500">Display name</label><input value={name} onChange={e=>setName(e.target.value)} className="mb-4 w-full rounded-xl bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-brand/20"/><label className="mb-2 block text-xs font-bold text-slate-500">Bio</label><textarea rows="4" value={bio} onChange={e=>setBio(e.target.value)} className="w-full rounded-xl bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-brand/20"/><button className="mt-5 w-full rounded-xl bg-brand py-3 text-sm font-bold text-white">Save changes</button></form></div>}
 </div>
}
