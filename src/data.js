export const people = [
  { id: 1, name: 'Hari', handle: 'hari', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true, bio: 'Chennai boy | Cricket, coffee, and weekend road trips.', posts: 34, followers: 1280, following: 540 },
  { id: 2, name: 'Vicky', handle: 'vicky', avatar: 'https://i.pravatar.cc/120?img=12', online: true, bio: 'Making memories across Tamil Nadu 📸', posts: 26, followers: 940, following: 410 },
  { id: 3, name: 'Karthik', handle: 'karthik', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', online: false, lastSeen: 'Last seen 24m ago', bio: 'Music, movies, and all things Chennai 🎶', posts: 48, followers: 2100, following: 760 },
  { id: 4, name: 'Harini', handle: 'harini', avatar: 'https://i.pravatar.cc/120?img=32', online: true, bio: 'Coimbatore | Art, books & little joys 🌼', posts: 52, followers: 3200, following: 680 },
  { id: 5, name: 'Shalini', handle: 'shalini', avatar: 'https://i.pravatar.cc/120?img=5', online: false, lastSeen: 'Last seen 2h ago', bio: 'Finding beauty in everyday moments ✨', posts: 39, followers: 1870, following: 620 },
  { id: 6, name: 'Ram', handle: 'ram', avatar: 'https://randomuser.me/api/portraits/men/76.jpg', online: true, bio: 'Collecting moments, not things. ✨\nDesign enthusiast · Coffee lover · Somewhere outside', posts: 248, followers: 12800, following: 680 }
]

export const currentUser = {
  name: 'Sharthik',
  handle: 'sharthik',
  avatar: '/Im%20Sharthik.png',
  bio: 'Collecting moments, not things. ✨\nDesign enthusiast · Coffee lover · Somewhere outside',
  posts: 7,
  followers: 12800,
  following: 680
}

export const initialPosts = [
  { id: 1, user: people[0], time: '2 hours ago', text: 'Waiting for the big screen magic! Thalapathy in Jana Nayagan 🔥', image: '/Jana%20Nayagan.jpg', hashtags: ['#JanaNayagan', '#ThalapathyVijay', '#TamilCinema'], likes: 248, comments: 2, commentList: [{ user: people[1], text: 'Can’t wait to watch this! 🔥' }, { user: people[3], text: 'Thalapathy energy is unmatched!' }], liked: false, tag: 'Cinema' },
  { id: 2, user: people[1], time: '4 hours ago', text: 'A peaceful visit to Thiruchendur Murugan Temple 🙏', image: '/Thiruchendur.jpg', hashtags: ['#Thiruchendur', '#MuruganTemple', '#TamilNadu'], likes: 182, comments: 2, commentList: [{ user: people[0], text: 'Such a beautiful temple 🙏' }, { user: people[4], text: 'One of my favorite places to visit!' }], liked: true, tag: 'Travel' },
  { id: 3, user: people[2], time: 'Yesterday', text: 'Current mood: fresh flowers, good coffee, and absolutely no plans. 🌷', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=85', hashtags: ['#Flowers', '#CoffeeTime', '#SlowDays'], likes: 96, comments: 2, commentList: [{ user: people[3], text: 'Fresh flowers make everything better 🌷' }, { user: people[0], text: 'Perfect kind of day!' }], liked: false, tag: 'Inspiration' }
]

export const notifications = [
  { id: 1, type: 'like', user: people[0], detail: 'liked your photo.', time: '5 min ago' },
  { id: 2, type: 'follow', user: people[3], detail: 'started following you.', time: '1 hour ago' },
  { id: 3, type: 'comment', user: people[4], detail: 'commented: “This is so lovely ✨”', time: '3 hours ago' },
  { id: 4, type: 'like', user: people[5], detail: 'and 12 others liked your post.', time: 'Yesterday' }
]

export const conversations = [
  { id: 1, user: people[0], preview: 'That sounds amazing! ✨', time: '2m', unread: 2 },
  { id: 2, user: people[2], preview: 'Are we still on for coffee?', time: '1h', unread: 0 },
  { id: 3, user: people[4], preview: 'Sent you the photos!', time: '3h', unread: 0 },
  { id: 4, user: people[1], preview: 'Haha exactly 😂', time: '1d', unread: 0 },
  { id: 5, user: people[3], preview: 'Let’s plan something this weekend!', time: 'Yesterday', unread: 0 },
  { id: 6, user: people[5], preview: 'Did you see the new post?', time: 'Yesterday', unread: 0 }
]
