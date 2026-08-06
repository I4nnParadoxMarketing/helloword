# helloword

An [EmDash CMS](https://emdashcms.com/) blog built with Astro, configured for deployment on [Vercel](https://vercel.com/).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) for the site and [http://localhost:4321/_emdash/admin](http://localhost:4321/_emdash/admin) for the CMS admin panel. Complete the setup wizard on first visit to create your admin account with a passkey.

Local development uses SQLite (`data.db`) and filesystem media storage (`uploads/`).

## Deploy to Vercel

Vercel's serverless runtime requires remote services for the database, sessions, and media uploads. SQLite and local file storage do not persist across function invocations.

### 1. Connect the repository

1. Push this repo to GitHub.
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
3. Vercel auto-detects Astro; no custom build settings are required.

### 2. Add integrations

Install these from the Vercel Marketplace (or create accounts manually):

| Service | Purpose | Env vars set |
| --- | --- | --- |
| [Turso](https://vercel.com/integrations/turso) | libSQL database | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` (or `LIBSQL_*`) |
| [Upstash Redis](https://vercel.com/integrations/upstash) | Admin session storage | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| S3-compatible storage (R2, AWS S3, etc.) | Media uploads | `S3_*` variables (see `.env.example`) |

### 3. Set environment variables

Copy `.env.example` and fill in every value in the Vercel project settings under **Environment Variables**:

```bash
npx emdash secrets generate   # creates EMDASH_ENCRYPTION_KEY
```

After the first deploy, set `SITE_URL` to your production URL (for example `https://helloword.vercel.app`).

For GitHub admin login on production, create a [GitHub OAuth App](https://github.com/settings/developers) with callback URL:

```
https://your-domain.vercel.app/_emdash/api/auth/oauth/github/callback
```

Then set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

### 4. Deploy

Push to your default branch or click **Deploy** in Vercel. On first request, EmDash runs database migrations and the setup wizard at `/_emdash/admin`.

### CLI deploy (optional)

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
vercel --prod
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Project structure

```
├── astro.config.mjs      # Astro + EmDash + Vercel configuration
├── src/
│   ├── live.config.ts    # Live Collections configuration
│   ├── pages/            # Site routes
│   └── layouts/          # Page layouts
├── seed/seed.json        # Initial CMS content model
└── vercel.json           # Vercel build settings
```
