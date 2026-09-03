<h1 align="center">
  <br />
  🔥 Streakly
</h1>

<p align="center">
  <strong>Build habits. Track progress. Stay consistent.</strong>
</p>

<p align="center">
  <a href="https://streakly-sansaladissanayake.vercel.app">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="#features">✨ Features</a> &nbsp;·&nbsp;
  <a href="#tech-stack">🛠 Tech Stack</a> &nbsp;·&nbsp;
  <a href="#getting-started">🚀 Getting Started</a> &nbsp;·&nbsp;
  <a href="#deployment">☁️ Deployment</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?logo=tailwind-css&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-22c55e" />
</p>

---

## ✨ Features

- 📋 **Habit Management** — Create, edit, and delete custom habits with icons, colors & categories
- ✅ **Daily Tracking** — Mark habits complete each day with satisfying animations
- 🔥 **Streak System** — Current & longest streak per habit, plus an overall streak card
- 📊 **Rich Statistics** — Completion rings, streak leaderboard, 28-day heatmaps, performance bars
- 📅 **Weekly Overview** — 7-day dot grid to see your consistency at a glance
- 💬 **Daily Quotes** — Rotating motivational quotes to keep you inspired
- 🏷️ **Category Filters** — Filter habits by category (Health, Fitness, Learning, etc.)
- 💾 **No Account Needed** — All data stored locally in your browser. Open and start instantly.
- 📱 **Mobile-First Design** — Beautiful on any screen size with bottom navigation
- ⚡ **Instant & Fast** — No loading spinners, no server roundtrips

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Data (Phase 1–3) | `localStorage` |
| Auth + DB (Phase 4) | [Firebase](https://firebase.google.com/) *(coming soon)* |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `18+`
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/sansaladissanayake/Streakly.git
cd Streakly

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open **http://localhost:3000** in your browser. Demo data is auto-seeded on first launch.

### Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment

This project is deployed on **Vercel** with zero configuration needed.

### Deploy your own fork:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your fork from GitHub
4. Click **Deploy** — Vercel auto-detects Next.js

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sansaladissanayake/Streakly)

---

## 📁 Project Structure

```
streakly/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Main dashboard (mobile-first)
│   ├── habits/             # Habit management
│   ├── stats/              # Statistics & analytics
│   └── settings/           # User settings
├── components/
│   ├── layout/             # AppShell, Sidebar, BottomNav, PageLayout, MobileTopBar
│   ├── dashboard/          # ProgressBar, WeeklyGrid, StreakCard, QuoteCard, CategoryTabs, HabitItem
│   ├── habits/             # HabitCard, HabitModal, HabitCheckbox
│   ├── stats/              # RingChart, HeatmapGrid
│   └── ui/                 # Modal, EmptyState, Toast
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── storage.ts          # localStorage data layer
│   └── utils.ts            # Helpers, color maps, date utils
└── vercel.json             # Vercel deployment config
```

---

## 🗺 Roadmap

- [x] Phase 1 — Project setup + landing page
- [x] Phase 2 — Habit CRUD (create, edit, delete, search)
- [x] Phase 3 — Daily tracking + streaks + statistics
- [x] Phase 3.5 — Mobile-first redesign (bottom nav, streak card, heatmaps)
- [ ] Phase 4 — Firebase auth + cloud sync
- [ ] Phase 5 — PWA support + push notifications
- [ ] Phase 6 — Dark mode

---

## 📄 License

[MIT](LICENSE) — free to use, modify, and deploy.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/sansaladissanayake">sansaladissanayake</a>
</p>
