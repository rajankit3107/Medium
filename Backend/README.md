```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```


// postgresql://neondb_owner:npg_bhlZ34pRreOa@ep-cool-bush-a1itvt56-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

//primsa accelerate url
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZmIzYWQ0MGMtOWFiYy00M2NhLWE1MWYtMWNhYTUxYTExZjg1IiwidGVuYW50X2lkIjoiM2NjY2JhMTU4NTg2YzMwYjhhY2E0MTEwZWRkZTFlZGI5ZDJiZTgyYTBlNDVmZGNjYmRlZGQ1M2E2NjlkMmJiZiIsImludGVybmFsX3NlY3JldCI6IjVmZTI2ZjM0LTI2ZmQtNGM5Ny1hZGRkLTk0YTI0MTUyOGRkYiJ9.h0m2eCEVD5Bd84AeDlLWgZha4OyyvhlTgLo99U-eVlk"