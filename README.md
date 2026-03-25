# Ship Week Contenders

A leaderboard for the best shipping projects, built with a modern tech stack. Track contenders, vote on your favorites, and see which projects are winning the ship week.

## Features

- **Project Leaderboard**: Real-time ranking of submitted projects.
- **Google Authentication**: Secure sign-in powered by Better Auth + Convex integration.
- **Vote System**: Authenticated users can upvote projects once to boost their ranking.
- **Open Source Tracking**: Automatically fetches GitHub star counts for open-source submissions.
- **Responsive Dashboard**: Beautifully designed UI with dark mode support and custom aesthetics.
- **Telegram Integration**: Project owners can showcase their linked Telegram channelpfps.

## 🛠 Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Convex](https://convex.dev/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

##  Getting Started

### 1. Requirements

- Node.js (v18+)/Bun
- A Convex project set up at [convex.dev](https://convex.dev)
- Google Cloud Console project for OAuth credentials

### 2. Environment Variables

Create a `.env.local` in the root directory:

```env
# Convex
VITE_CONVEX_URL=https://your-project.convex.cloud
VITE_CONVEX_SITE_URL=https://your-project.convex.site

# Better Auth (Backend - add these in the Convex Dashboard)
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Installation

```bash
bun install
```

### 4. Development

Run the Convex development server:
```bash
bun x convex dev
```

In a separate terminal, start the Vite frontend:
```bash
bun run dev
```

## 🏗 Schema & Structure

- `convex/schema.ts`: Database schema defining projects, users, and sessions.
- `convex/projects.ts`: Business logic for project management, upvoting, and deletion.
- `convex/betterAuth/auth.ts`: Better Auth configuration and social provider setup.
- `src/lib/auth-client.ts`: Frontend authentication client.

---
*Just keep shipping.*
