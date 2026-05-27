# new-dahab — Next.js migration of Dahab Tech

Modern rebuild of the Laravel + Vue portfolio using **Next.js 16**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma**, **Supabase Postgres**, **Supabase Storage**, and **NextAuth** (with Laravel-compatible Bearer token API).

## Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js App Router, React, TypeScript, Tailwind |
| API | Next.js Route Handlers (`/api/*`) |
| ORM | Prisma |
| Database | Supabase PostgreSQL |
| Uploads | Supabase Storage (`projects-images` bucket) |
| Auth | NextAuth + `personal_access_tokens` (Sanctum-compatible Bearer) |
| Deploy | Vercel |

## Project structure

```
new-dahab/
├── prisma/           # schema + seed
├── public/           # static assets
├── src/
│   ├── app/          # pages + API routes
│   ├── components/   # UI (pixel-matched to Vue)
│   ├── layouts/
│   ├── lib/          # prisma, auth, api-client, supabase
│   ├── services/     # API wrappers
│   ├── hooks/
│   ├── store/
│   ├── styles/       # global CSS (ported from Laravel)
│   ├── utils/
│   ├── api/          # domain logic for projects
│   └── types/
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Public marketing site |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin CRUD (projects, resources, messages) |

## API (Laravel-compatible)

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/login` | Public |
| POST | `/api/logout` | Bearer |
| GET | `/api/user` | Bearer |
| GET | `/api/projects` | Public |
| GET | `/api/projects/:id` | Public |
| POST | `/api/projects` | Bearer |
| POST/PUT | `/api/projects/:id` | Bearer (POST + `_method=PUT`) |
| DELETE | `/api/projects/:id` | Bearer |
| POST | `/api/projects/:id/download` | Public |
| POST | `/api/contact` | Public |
| GET | `/api/messages` | Bearer |
| DELETE | `/api/messages/:id` | Bearer |

Admin UI stores `admin_token` in `localStorage` and sends `Authorization: Bearer <token>`.

## Setup (local)

1. **Copy env**
   ```bash
   cp .env.example .env
   ```

2. **Supabase**
   - Create a project
   - Copy `DATABASE_URL` (connection pooling or direct)
   - Create storage bucket `projects-images` (public)
   - Set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

3. **Install & DB**
   ```bash
   npm install
   npx prisma db push
   npm run db:seed
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

5. **Default admin** (from seed)
   - Email: `admin@dahab.tech`
   - Password: `admin123`

## Migration from Laravel

1. Export SQLite/MySQL data or re-seed with `prisma/seed.ts`
2. Copy images from Laravel `public/` or `storage/app/public/projects` into Supabase Storage
3. Update `projects.image` URLs to Supabase public URLs
4. Map env: `APP_URL` → `NEXT_PUBLIC_APP_URL`, DB → `DATABASE_URL`

## Testing checklist

- [ ] Home page sections render (RTL, Cairo font)
- [ ] Portfolio loads from API
- [ ] Contact form creates message
- [ ] Login returns `{ token, user }`
- [ ] Dashboard CRUD projects (with image upload)
- [ ] Delete message
- [ ] Download counter increments
- [ ] `npm run build` succeeds

## Deploy (Vercel + Supabase)

1. Push repo; import `new-dahab` as Vercel root (or monorepo subfolder)
2. Set all env vars from `.env.example`
3. Run migrations: `npx prisma migrate deploy` (or `db push` for first deploy)
4. Run seed once: `npm run db:seed`
5. Verify `/api/projects` and `/admin/login`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema |
| `npm run db:seed` | Seed admin + sample projects |
| `npm run db:studio` | Prisma Studio |
