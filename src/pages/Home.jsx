import { useState } from 'react'
import { currentUser, initialPosts } from '../data'
import Stories from '../components/Stories'
import CreatePost from '../components/CreatePost'
import PostCard from '../components/PostCard'
export default function Home() {
  const [posts,setPosts]=useState(initialPosts)
  const [toast,setToast]=useState('')
  const like=id=>setPosts(ps=>ps.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)}:p))
  const add=(text,image)=>setPosts(ps=>[{id:Date.now(),user:currentUser,time:'Just now',text,image,likes:0,comments:0,commentList:[],liked:false,tag:'Your post'},...ps])
  const comment=(id,value)=>{const text=value.trim();if(text){setPosts(ps=>ps.map(p=>p.id===id?{...p,comments:p.comments+1,commentList:[...(p.commentList||[]),{user:currentUser,text}]}:p));setToast('Comment added!');setTimeout(()=>setToast(''),2200)}}
  return <div className="space-y-4"><Stories/><CreatePost onPost={add}/><div className="flex items-center justify-between border-b border-line px-1 pb-3 pt-2"><h1 className="text-sm font-bold text-ink">For you</h1><button className="text-sm font-semibold text-brand">Following</button></div>{posts.map(p=><PostCard key={p.id} post={p} onLike={like} onComment={comment}/>)}{toast&&<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-xl">{toast}</div>}</div>
}
