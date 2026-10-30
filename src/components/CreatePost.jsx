import { useRef, useState } from 'react'
import { ImagePlus, Smile, Send, X } from 'lucide-react'
import Avatar from './Avatar'
import { currentUser } from '../data'
export default function CreatePost({ onPost }) {
  const [text,setText]=useState('')
  const [image,setImage]=useState('')
  const [error,setError]=useState('')
  const fileInput=useRef(null)
  const selectImage=e=>{
    const file=e.target.files?.[0]
    if(!file)return
    e.target.value=''
    if(!file.type.startsWith('image/')){
      setError('Please choose an image file.')
      return
    }
    const reader=new FileReader()
    reader.onload=()=>{
      if(typeof reader.result==='string'){
        setImage(reader.result)
        setError('')
      }else{
        setError('Could not load this image. Please try another file.')
      }
    }
    reader.onerror=()=>setError('Could not load this image. Please try another file.')
    reader.readAsDataURL(file)
  }
  return <form onSubmit={e=>{e.preventDefault();if(text.trim()||image){onPost(text,image);setText('');setImage('');setError('')}}} className="rounded-lg border border-line bg-white p-4 sm:p-5">
    <div className="flex gap-3"><Avatar src={currentUser.avatar} name={currentUser.name} size="md"/><textarea value={text} onChange={e=>setText(e.target.value)} rows="2" placeholder="Share a photo or write a caption..." className="min-w-0 flex-1 resize-none rounded-lg bg-slate-50 p-3 text-sm outline-none transition focus:ring-2 focus:ring-brand/20"/></div>
    {image && <div className="relative mt-3"><img src={image} alt="Post preview" className="max-h-44 rounded-2xl object-cover"/><button type="button" onClick={()=>setImage('')} className="absolute right-2 top-2 rounded-full bg-white p-1"><X size={15}/></button></div>}
    <input ref={fileInput} type="file" accept="image/*" onChange={selectImage} className="hidden"/>
    {error&&<p role="alert" className="mt-2 text-xs text-rose-500">{error}</p>}
    <div className="mt-4 flex items-center justify-between border-t border-line pt-4"><div className="flex gap-2"><button type="button" onClick={()=>fileInput.current?.click()} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-soft hover:text-brand"><ImagePlus size={17}/> Photo</button><button type="button" onClick={()=>setText(t=>t+' 😊')} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-soft hover:text-brand"><Smile size={17}/> Feeling</button></div><button disabled={!text.trim()&&!image} className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-bold text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-40">Share <Send size={14}/></button></div>
  </form>
}
