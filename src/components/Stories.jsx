import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Avatar from './Avatar'
import { currentUser, initialPosts, people } from '../data'

const storyPhotos = [
  ...initialPosts.map(post => post.image),
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=85',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=85',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=85',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85'
]

function randomPhotos() {
  const shuffled = [...storyPhotos]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, 3)
}

export default function Stories() {
  const stories = [
    { id: 'you', name: 'Your story', handle: currentUser.handle, avatar: currentUser.avatar, own: true, photo: '/cm.jpg' },
    ...people
  ]
  const [activeStory, setActiveStory] = useState(null)
  const [photos, setPhotos] = useState([])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [seenStories, setSeenStories] = useState(() => new Set())

  const openStory = story => {
    setSeenStories(seen => new Set(seen).add(story.id || story.name))
    setActiveStory(story)
    setPhotos(story.photo ? [story.photo] : randomPhotos())
    setPhotoIndex(0)
  }
  const closeStory = () => setActiveStory(null)
  const previousPhoto = () => setPhotoIndex(index => (index - 1 + photos.length) % photos.length)
  const nextPhoto = () => setPhotoIndex(index => (index + 1) % photos.length)

  useEffect(() => {
    if (!activeStory) return undefined
    const onKeyDown = event => {
      if (event.key === 'Escape') closeStory()
      if (event.key === 'ArrowLeft') previousPhoto()
      if (event.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeStory, photos.length])

  return <>
    <section className="overflow-hidden rounded-lg border border-line bg-white px-3 py-4 sm:px-5">
      <div className="flex gap-4 overflow-x-auto pb-1 sm:gap-5">{stories.map(story => {
        const storyId = story.id || story.name
        const seen = seenStories.has(storyId)
        return <button key={storyId} onClick={() => openStory(story)} aria-label={`${story.name} story, ${seen ? 'seen' : 'not seen'}`} className="flex min-w-[62px] flex-col items-center gap-2">
        <span className="rounded-full bg-emerald-500 p-[3px]"><Avatar src={story.avatar} name={story.name} size="md"/></span>
        <span className="max-w-[65px] truncate text-[11px] text-slate-600">{story.name}</span>
      </button>
      })}</div>
    </section>

    {activeStory && <div role="dialog" aria-modal="true" aria-label={`${activeStory.name} story`} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 sm:p-6">
      <button onClick={closeStory} aria-label="Close story" className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"><X size={24}/></button>
      <div className="relative h-full w-full overflow-hidden bg-black sm:h-[min(82vh,760px)] sm:max-w-[430px] sm:rounded-xl">
        <img src={photos[photoIndex]} alt={`${activeStory.name} story photo ${photoIndex + 1}`} className={`absolute inset-0 h-full w-full ${activeStory.own ? 'object-contain' : 'object-cover'}`}/>
        <div className="absolute inset-x-0 top-0 z-[1] bg-gradient-to-b from-black/60 to-transparent px-3 pb-8 pt-3">
          <div className="mb-3 flex gap-1">{photos.map((photo, index) => <span key={photo} className="h-[2px] flex-1 rounded bg-white/50"><span className={`block h-full rounded bg-white ${index <= photoIndex ? 'w-full' : 'w-0'}`}/></span>)}</div>
          <div className="flex items-center gap-2 text-white"><Avatar src={activeStory.avatar} name={activeStory.name} size="xs"/><Link to={activeStory.own ? '/profile' : `/profile/${activeStory.id}`} onClick={closeStory} className="text-sm font-semibold hover:underline">{activeStory.handle || activeStory.name}</Link><span className="text-xs text-white/75">• 2h</span></div>
        </div>
        <button onClick={previousPhoto} aria-label="Previous story photo" className="absolute inset-y-16 left-0 z-[1] flex w-1/3 items-center justify-start pl-2 text-white/80"><ChevronLeft size={30}/></button>
        <button onClick={nextPhoto} aria-label="Next story photo" className="absolute inset-y-16 right-0 z-[1] flex w-1/3 items-center justify-end pr-2 text-white/80"><ChevronRight size={30}/></button>
      </div>
    </div>}
  </>
}
