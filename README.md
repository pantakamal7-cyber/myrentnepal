# MYRENT Nepal

React 19 + Vite 7 single-page app deployed as static assets on Cloudflare.

## Runtime model

- Deployment target: **Cloudflare static assets** via `wrangler.json`
- Build artifact: **`client/dist`**
- Backend in this repository: **none** (the `server/` folder is compatibility-only)

## Project structure

```txt
/home/runner/work/myrentnepal/myrentnepal
├── client/
│   ├── index.html
│   ├── dist/                 # build output
│   └── src/
│       ├── main.tsx          # app entry
│       ├── App.tsx           # top-level routes/layout
│       ├── pages/
│       ├── components/
│       └── lib/data.ts       # mock listing data source
├── server/index.ts           # placeholder only
├── shared/
├── vite.config.ts            # canonical Vite config (root = client)
├── wrangler.json             # Cloudflare deployment config
└── package.json
```

## Commands

Run from `/home/runner/work/myrentnepal/myrentnepal`:

```bash
npm install --legacy-peer-deps
npm run dev
npm run check
npm run build
npm run preview
```

## Data flow

- Listing browse/detail experience currently uses local mock data from `client/src/lib/data.ts`.
- "List Property" currently performs a frontend-only submission flow (UI success state, no server write).

## Deployment

Cloudflare config is in `/home/runner/work/myrentnepal/myrentnepal/wrangler.json`:

- `assets.directory = "client/dist"`
- `assets.not_found_handling = "single-page-application"`

Deploy by building first (`npm run build`) so `client/dist` exists, then deploy with Wrangler in your CI/CD environment.
