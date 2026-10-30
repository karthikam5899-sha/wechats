import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import Avatar from './Avatar'

export default function PostCard({ post, onLike, onComment }) {
  const [saved, setSaved] = useState(false)
  const [comment, setComment] = useState('')
  const [commentsOpen, setCommentsOpen] = useState(false)
  return <article className="overflow-hidden rounded-lg border border-line bg-white">
    <div className="flex items-center gap-3 px-3 py-3 sm:px-4"><Link to={post.user.id ? `/profile/${post.user.id}` : '/profile'} aria-label={`View ${post.user.name}'s profile`}><Avatar src={post.user.avatar} name={post.user.name} size="sm" ring/></Link><div className="min-w-0 flex-1"><Link to={post.user.id ? `/profile/${post.user.id}` : '/profile'} className="text-sm font-semibold text-ink hover:underline">{post.user.handle || post.user.name}</Link><p className="text-xs text-muted">{post.time}</p></div><button aria-label="More post options" className="rounded-full p-2 text-ink hover:bg-slate-50"><MoreHorizontal size={20}/></button></div>
    {post.image && <img src={post.image} alt={`Photo shared by ${post.user.name}`} className="aspect-square w-full object-cover" loading="lazy"/>}
    <div className="px-3 pb-3 sm:px-4">
      <div className="flex items-center gap-4 py-3">
        <button aria-label={post.liked ? 'Unlike post' : 'Like post'} onClick={()=>onLike(post.id)} className={`transition hover:opacity-60 ${post.liked?'text-rose-500':'text-ink'}`}><Heart size={24} fill={post.liked?'currentColor':'none'}/></button>
        <button aria-label={commentsOpen ? 'Hide comments' : 'Show comments'} onClick={()=>setCommentsOpen(open=>!open)} className="text-ink transition hover:opacity-60"><MessageCircle size={24}/></button>
        <button aria-label="Share post" onClick={()=>navigator.clipboard?.writeText(window.location.href)} className="text-ink transition hover:opacity-60"><Send size={23}/></button>
        <button type="button" onClick={()=>setSaved(!saved)} className={`ml-auto transition hover:opacity-60 ${saved?'text-ink':'text-ink'}`} aria-label={saved?'Remove saved post':'Save post'}><Bookmark size={23} fill={saved?'currentColor':'none'}/></button>
      </div>
      <p className="text-sm font-semibold text-ink">{post.likes.toLocaleString()} likes</p>
      <p className="mt-1 text-sm leading-5 text-ink"><Link to={post.user.id ? `/profile/${post.user.id}` : '/profile'} className="mr-2 font-semibold hover:underline">{post.user.handle || post.user.name}</Link>{post.text}</p>
      {post.hashtags?.length > 0 && <p className="mt-1 flex flex-wrap gap-x-2 text-sm text-brand">{post.hashtags.map(hashtag=><span key={hashtag}>{hashtag}</span>)}</p>}
      {post.comments > 0 && <button onClick={()=>setCommentsOpen(open=>!open)} className="mt-1 text-sm text-muted">{commentsOpen ? 'Hide comments' : `View all ${post.comments} comments`}</button>}
      {commentsOpen && <div className="mt-3 space-y-2" aria-label="Post comments">
        {(post.commentList || []).map((entry,index)=><p key={`${entry.user.handle}-${index}`} className="text-sm leading-5 text-ink"><Link to={entry.user.id ? `/profile/${entry.user.id}` : '/profile'} className="mr-2 font-semibold hover:underline">{entry.user.handle}</Link>{entry.text}</p>)}
        {post.commentList?.length === 0 && <p className="text-sm text-muted">No comments yet. Be the first to comment.</p>}
      </div>}
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">{post.time}</p>
      <form onSubmit={e=>{e.preventDefault(); if(comment.trim()){onComment(post.id,comment);setComment('');setCommentsOpen(true)}}} className="mt-3 flex items-center gap-3 border-t border-line pt-3"><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a comment..." className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none"/><button disabled={!comment.trim()} className="text-sm font-semibold text-brand disabled:opacity-40" aria-label="Send comment"><Send size={17}/></button></form>
    </div>
  </article>
}
