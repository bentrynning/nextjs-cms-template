# Next.js CMS Template

A production-ready Next.js starter template with a built-in CMS, authentication, and database.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite locally via libSQL / [Turso](https://turso.tech) in production
- **ORM**: Drizzle ORM
- **Auth**: JWT sessions with bcrypt password hashing

## Features

- Dark-themed marketing site with hero, services, projects, news, and about pages
- Admin CMS at `/admin` for managing published posts
- Secure authentication (login, logout, first-time setup)
- Public blog/news API with slugs

## Getting Started

1. **Install dependencies**
   ```bash
   bun install  # or npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set JWT_SECRET
   ```

3. **Push database schema**
   ```bash
   bun run db:push
   ```

4. **Run the dev server**
   ```bash
   bun run dev
   ```

5. **Create your admin user**
   Visit [http://localhost:3000/admin/setup](http://localhost:3000/admin/setup)

## Project Structure

```
app/
├── page.tsx              # Home
├── services/             # Services page
├── projects/             # Projects page
├── news/                 # News listing + [slug] detail
├── about/                # About page
├── admin/                # CMS (protected)
│   ├── login/
│   ├── setup/
│   └── posts/
├── api/                  # API routes
│   ├── posts/
│   ├── admin/
│   └── auth/
└── components/
    ├── nav.tsx
    ├── footer.tsx
    └── site-chrome.tsx
db/
├── schema.ts             # Drizzle schema
└── index.ts              # DB client
lib/
└── auth.ts               # JWT auth helpers
```

## Deploying

Works great on [Vercel](https://vercel.com). For the database, use [Turso](https://turso.tech) and set `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in your environment variables.

## Customising

1. Update `app/layout.tsx` — site title & description
2. Update `app/components/nav.tsx` — nav links & logo
3. Update `app/components/footer.tsx` — company info
4. Update `app/globals.css` — accent colour (`--accent`)
5. Replace placeholder SVGs in `public/` with your logo
6. Edit pages in `app/` — replace placeholder content
