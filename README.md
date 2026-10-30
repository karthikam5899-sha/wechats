# We Chat Social Media App

A responsive photo-sharing app built with React, Vite, Tailwind CSS, React Router, and Lucide icons. It uses static demo data and local component state; no backend is required.

## Features

- Login and sign-up screens with basic validation, password visibility, and a demo login prefilled on first visit.
- Protected app pages with a logout option in the navigation.
- Responsive navigation, stories, and photo feed.
- Create-post form with photo preview, likes, comments, share and save controls.
- Explore search, trending topics, suggested people, and image grid.
- Notifications list.
- Messages with chat selection and local in-memory message sending.
- Profile page with editable name and bio.
- Responsive layouts starting at 320px.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Setup

1. Extract the ZIP and open the project folder in VS Code.
2. Open a terminal in the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Deploy to Vercel

Import the project into Vercel and use the Vite defaults (`npm run build` with `dist` as the output directory). The included `vercel.json` rewrite serves the React app for direct visits and refreshes on client-side routes.

## Folder structure

```text
socially-social-media-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data.js
    ├── components/
    │   ├── Avatar.jsx
    │   ├── CreatePost.jsx
    │   ├── PostCard.jsx
    │   ├── RightPanel.jsx
    │   ├── Sidebar.jsx
    │   └── Stories.jsx
    └── pages/
        ├── Auth.jsx
        ├── Explore.jsx
        ├── Home.jsx
        ├── Messages.jsx
        ├── Notifications.jsx
        └── Profile.jsx
```

## Demo notes

- Demo login details are `alexmorgan` / `password123`. Login and sign-up are frontend-only and do not authenticate against a server.
- The intro appears on each visit, followed by the sign-in screen. Sign in to open the app; reloading the page starts the flow again.
- Post interactions, profile edits, and messages are held in React state and reset on refresh.
- Remember Me stores the demo username in localStorage. This is not secure authentication.
- Images use remote Unsplash and pravatar.cc URLs, so an internet connection is needed to load them.
- The app is a frontend prototype. Add a backend/API and secure authentication before production use.
