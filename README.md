<h1 align="center">
 
  <br />
  Streakly
</h1>

<p align="center">
  <strong>Build habits. Track progress. Stay consistent.</strong>
</p>

<p align="center">
  <a href="https://streakly.vercel.app">🌐 Live Demo</a> &nbsp;·&nbsp;
  <a href="#features">✨ Features</a> &nbsp;·&nbsp;
  <a href="#tech-stack">🛠 Tech Stack</a> &nbsp;·&nbsp;
  <a href="#getting-started">🚀 Getting Started</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?logo=tailwind-css" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## ✨ Features

- 📋 **Habit Management** — Create, edit, and delete custom habits
- ✅ **Daily Tracking** — Mark habits as complete each day with a single click
- 🔥 **Streak Tracking** — Current & longest streak per habit
- 📊 **Statistics Dashboard** — Completion rates, heatmaps, and progress charts
- 📅 **Weekly Overview** — See your last 7 days at a glance
- 💾 **Persistent Storage** — All data saved locally in your browser (no account needed)
- 📱 **Responsive Design** — Works beautifully on desktop and mobile
- ⚡ **Fast & Lightweight** — No heavy dependencies, instant load times

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Data | `localStorage` (Phase 1–3) |
| Auth + DB | [Supabase](https://supabase.com/) *(Phase 4 — coming soon)* |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/streakly.git
cd streakly

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
streakly/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page
│   ├── dashboard/        # Main dashboard
│   ├── habits/           # Habit management
│   ├── stats/            # Statistics & analytics
│   └── settings/         # User settings
├── components/           # Reusable React components
│   ├── layout/           # Sidebar, Header
│   ├── habits/           # Habit cards, modals, checkboxes
│   ├── dashboard/        # Progress bars, weekly grids
│   ├── stats/            # Heatmap, ring chart
│   └── ui/               # Shared UI primitives
├── lib/                  # Utilities and data layer
│   ├── types.ts          # TypeScript interfaces
│   ├── storage.ts        # localStorage abstraction
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

---

## 🗺 Roadmap

- [x] Phase 1 — Project setup + landing page
- [x] Phase 2 — Habit CRUD (create, edit, delete)
- [x] Phase 3 — Daily tracking + streaks + statistics
- [ ] Phase 4 — Supabase authentication + cloud database
- [ ] Phase 5 — Calendar heatmap + progress charts
- [ ] Phase 6 — Dark mode + mobile optimization + PWA

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/YOUR_USERNAME">imnot.sala</a>
</p>
