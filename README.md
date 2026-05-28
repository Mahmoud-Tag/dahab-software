# Dahab Software — Next.js Migration

Modern rebuild of the Laravel + Vue portfolio using **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Prisma**, and **Supabase** (PostgreSQL + Storage).

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   Vercel                         │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │  Next.js     │  │  Next.js API Routes      │  │
│  │  (React SSR) │  │  /api/projects           │  │
│  │              │  │  /api/login, /logout     │  │
│  │  Static      │  │  /api/messages           │  │
│  │  Pages       │  │  /api/contact            │  │
│  │  + ISR       │  │  /api/user               │  │
│  └─────────────┘  └───────────┬──────────────┘  │
└───────────────────────────────┼──────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │     Supabase          │
                    │  ┌─────────────────┐  │
                    │  │ PostgreSQL       │  │
                    │  │ (Prisma ORM)     │  │
                    │  └─────────────────┘  │
                    │  ┌─────────────────┐  │
                    │  │ Storage Bucket   │  │
                    │  │ projects-images  │  │
                    │  └─────────────────┘  │
                    └────────────────────────┘
```

**Single project, single deployment.** Next.js handles both the frontend (SSR/static pages) and the backend (API routes). No separate Express/Node server needed.

## Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19.2.4, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + CSS Modules |
| ORM | Prisma 6.19.3 |
| Database | Supabase PostgreSQL (session pooler) |
| File Storage | Supabase Storage (`projects-images` bucket) |
| Auth | Custom Bearer token (SHA-256 hashed, Sanctum-compatible) |
| Validation | Zod v4 |
| Icons | Font Awesome 6.5 (CDN) |
| Font | Google Fonts Cairo (Arabic RTL) |
| Deployment | Vercel |

## Routes

### Pages

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Public marketing site (7 sections) | No |
| `/admin/login` | Admin login page | No |
| `/admin/dashboard` | Admin CRUD dashboard | Client guard |

### API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/login` | Public | Email/password → `{ token, user }` |
| POST | `/api/logout` | Bearer | Revoke current token |
| GET | `/api/user` | Bearer | Get authenticated user |
| GET | `/api/projects` | Public | List all projects |
| GET | `/api/projects/:id` | Public | Get single project |
| POST | `/api/projects` | Bearer | Create project (multipart) |
| POST/PUT | `/api/projects/:id` | Bearer | Update project (`_method=PUT`) |
| DELETE | `/api/projects/:id` | Bearer | Delete project |
| POST | `/api/projects/:id/download` | Public | Increment download counter |
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/messages` | Bearer | List all messages |
| DELETE | `/api/messages/:id` | Bearer | Delete message |

Auth token stored in `localStorage` as `admin_token`, sent as `Authorization: Bearer <token>`.

---

## Local Development Setup

### Prerequisites
- Node.js 20+
- A Supabase account (free tier works)

### 1. Supabase Setup

1. Create a new project at https://supabase.com/dashboard
2. Go to **Settings → Database** → copy the **Session pooler** connection string (port 5432)
3. Go to **Storage** → create a public bucket named `projects-images`
4. Go to **Settings → API** → copy the **Project URL**, **anon key**, and **service_role key**

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database — use the Session Pooler URL from Supabase
DATABASE_URL="postgresql://postgres.PROJECT_REF:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_STORAGE_BUCKET=projects-images

# Admin seed (optional)
ADMIN_EMAIL=admin@dahab.tech
ADMIN_PASSWORD=admin123
```

> **Important:** If your database password contains special characters (`@`, `#`, `$`, `%`), they must be URL-encoded:
> `@` → `%40`, `#` → `%23`, `$` → `%24`, `%` → `%25`

### 3. Install & Setup Database

```bash
npm install
npx prisma db push      # Create tables
npm run db:seed          # Create admin user + sample projects
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

**Default admin login:**
- Email: `admin@dahab.tech`
- Password: `admin123`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:migrate` | Create and apply migration |
| `npm run db:seed` | Seed admin + projects |
| `npm run db:studio` | Open Prisma Studio GUI |

---

## Production Deployment

### Platform: Vercel (Recommended)

This project includes a `vercel.json` with the correct build command already configured.

#### Step 1: Connect Repository

1. Push this repo to GitHub: https://github.com/Mahmoud-Tag/new-dahab.git
2. Go to https://vercel.com → **Add New → Project**
3. Import the repository
4. Vercel auto-detects Next.js — no framework configuration needed

#### Step 2: Environment Variables

Add ALL of these in Vercel **Settings → Environment Variables**:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | **YES** | Session pooler URL from Supabase |
| `NEXT_PUBLIC_APP_URL` | **YES** | Your Vercel domain (e.g., `https://dahab.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | For images | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | For images | Supabase publishable key |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For images | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | For images | Supabase service role key |
| `SUPABASE_STORAGE_BUCKET` | For images | `projects-images` |
| `ADMIN_EMAIL` | Optional | `admin@dahab.tech` |
| `ADMIN_PASSWORD` | Optional | Use a strong password for production |

#### Step 3: Deploy

Vercel runs this automatically on deploy:
```
prisma generate && prisma migrate deploy && next build
```

If this is the **first deploy** to a fresh database, run the seed once:
```bash
# From Vercel dashboard → Settings → Functions → Console, or locally:
DATABASE_URL="..." npx tsx prisma/seed.ts
```

#### Step 4: Verify

1. Visit your Vercel domain
2. Check `/api/projects` returns project data
3. Test login at `/admin/login`
4. Test creating a project with an image

### Platform: Render

1. Create a **Web Service**
2. Connect the GitHub repository
3. Configure:
   - **Runtime:** Node
   - **Build Command:** `npm install && prisma generate && prisma migrate deploy && npm run build`
   - **Start Command:** `npm start`
4. Add all environment variables listed above
5. Deploy

### Platform: Railway

1. Create a **New Service → GitHub Repo**
2. Railway auto-detects Node.js
3. Configure:
   - **Build Command:** `npm install && prisma generate && prisma migrate deploy && npm run build`
   - **Start Command:** `npm start`
4. Add all environment variables
5. Deploy

> **Note for Render/Railway:** These platforms use long-running servers. The Next.js app runs via `next start` on port 3000. Render/Railway provide the `PORT` env variable automatically — Next.js respects it.

---

## Database Migration Strategy

### For Fresh Database (First Deploy)

```bash
npx prisma db push        # Fast: push schema, no migration history
npm run db:seed           # Create admin + projects
```

### For Existing Database (Future Updates)

```bash
npx prisma migrate dev --name description_of_change    # Creates migration locally
# Commit migration files to git
# Vercel auto-runs: prisma migrate deploy              # Applies migrations in CI
```

### Migration Files

Two migrations are included in `prisma/migrations/`:

| Migration | Purpose |
|-----------|---------|
| `20260527210000_initial_baseline` | Creates all 4 tables + indexes + foreign key |
| `20260527210100_add_query_indexes` | Adds `created_at` indexes for sort performance |

### Database Schema

```
users
├── id (PK)
├── name
├── email (UNIQUE)
├── password (bcrypt)
├── email_verified_at
├── remember_token
├── created_at, updated_at

personal_access_tokens
├── id (PK)
├── tokenable_type / tokenable_id (morph, indexed)
├── name
├── token (UNIQUE, SHA-256)
├── abilities, last_used_at, expires_at
├── created_at, updated_at
└── FK → users.id ON DELETE CASCADE

projects
├── id (PK)
├── title, category, catIcon, desc, fullDesc
├── image, tags (JSON), year, type, language
├── downloads, downloadUrl, features (JSON)
├── created_at (indexed), updated_at

messages
├── id (PK)
├── name, email, message
├── created_at (indexed), updated_at
```

---

## Supabase Storage Setup

The `projects-images` bucket stores project images uploaded from the admin dashboard.

### Create the bucket

**Option A: Via Supabase Dashboard**
1. Go to https://supabase.com/dashboard → your project → **Storage**
2. Click **New bucket** → name: `projects-images`
3. Enable **Public bucket**

**Option B: Via API (if service_role key is set)**
```js
// Run once to create the bucket
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
await supabase.storage.createBucket('projects-images', { public: true })
```

### Upload flow

1. Admin selects an image in the project form
2. Form sends `multipart/form-data` to `POST /api/projects`
3. Server uploads to Supabase Storage via service role key
4. Public URL stored in `projects.image`
5. If upload fails → falls back to `/portfolio-website.png` placeholder

### CORS (if uploading from browser directly)

Not needed — all uploads go through the server-side API route, not the browser.

---

## Error Handling

All 10 API routes have `try/catch` with structured error responses:

```json
// Development (includes error details)
{ "message": "Failed to create project: <actual error>" }

// Production (safe message only)
{ "message": "Failed to create project" }
```

Errors are logged server-side via `console.error()` for debugging.

---

## Production Verification Checklist

### Build
- [ ] `npm run build` succeeds (0 errors)
- [ ] `npm run lint` passes (0 errors, 0 warnings)
- [ ] TypeScript compiles cleanly

### Pages
- [ ] `/` — Home page loads, all 7 sections render (Hero, About, Services, Portfolio, WhyUs, Contact, Footer)
- [ ] `/admin/login` — Login form renders, Font Awesome icons visible
- [ ] `/admin/dashboard` — Redirects to login if not authenticated

### API
- [ ] `GET /api/projects` — Returns JSON array
- [ ] `POST /api/login` — Returns `{ token, user }`
- [ ] `POST /api/contact` — Stores message, returns `{ success: true }`
- [ ] `GET /api/messages` — Returns array (with valid Bearer token)
- [ ] `GET /api/user` — Returns user object (with valid Bearer token)

### Auth
- [ ] Login with `admin@dahab.tech` / admin password
- [ ] Token stored in localStorage
- [ ] Dashboard loads after login
- [ ] Logout clears token and redirects to login

### CRUD
- [ ] Create project (with image upload)
- [ ] Edit project (update title, category, etc.)
- [ ] Delete project (confirm dialog → removed from list)
- [ ] View contact messages in dashboard
- [ ] Delete a message

### Portfolio
- [ ] Projects load from API and display in filterable grid
- [ ] Project detail modal opens with full description
- [ ] Download button increments counter
- [ ] Filter tabs work (web, app, system, ecommerce, resource)
- [ ] Empty state shows when no projects match filter

### RTL & Responsive
- [ ] Arabic text renders correctly (Cairo font)
- [ ] RTL layout works (text aligned right, mirrored UI)
- [ ] Mobile menu opens/closes with animation
- [ ] All breakpoints work (mobile, tablet, desktop)

---

## Common Deployment Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| `P1001: Can't reach database` | Supabase project paused or wrong URL | Restore project in Supabase dashboard; verify pooler URL |
| `P1013: invalid database string` | Special chars in password not URL-encoded | Encode `@`→`%40`, `#`→`%23`, `$`→`%24` |
| `P3005: database not empty` | Tables already exist from `db push` | Run `prisma migrate resolve --applied <migration>` |
| `P2021: table does not exist` | Migrations baselined but not executed | Run `prisma db push` or execute migration SQL directly |
| `Failed to upload image` | Storage bucket missing | Create `projects-images` public bucket in Supabase |
| `module not found` on deploy | Prisma client not generated | Ensure build command includes `prisma generate` |
| 500 on API routes | Unhandled exception | All routes now have try/catch — check server logs |
| Build timeout | Prisma client generation slow | Increase Vercel build timeout to 45s minimum |

---

## Security Notes

- `.env` files are in `.gitignore` — secrets never committed
- Tokens are SHA-256 hashed in database — plaintext only in client localStorage
- Service role key used only server-side (API routes) — never exposed to browser
- `SUPABASE_STORAGE_BUCKET` is public for read, uploads require service role key
- No CSRF needed — API routes use Bearer token auth, not cookies
- Password hashed with bcryptjs (12 rounds)

---
## Tech Debt & Future Improvements

- [ ] Add pagination to `/api/projects` and `/api/messages`
- [ ] Add rate limiting to login and contact endpoints
- [ ] Re-implement HeroScene3D (Three.js interactive background)
- [ ] Add `tags` and `features` input fields to ProjectFormModal
- [ ] Convert `<img>` to `<Image />` from `next/image` for optimization
- [ ] Add `catIcon` input to project form (currently seed-only)

---

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Prisma · Supabase · Vercel