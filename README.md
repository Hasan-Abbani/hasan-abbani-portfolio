# Hasan Abbani Portfolio

Personal portfolio and writing site for Hasan Abbani, built with React and Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The app is configured for static deployment through Vercel via [vercel.json](vercel.json). The build output is `dist/`, and the service worker is served with no-cache headers so new releases are picked up quickly.

If you deploy somewhere else, make sure the host serves `index.html` for client-side routes and keeps `sw.js` uncached.

## Notes

The site metadata in [index.html](index.html) and [public/manifest.webmanifest](public/manifest.webmanifest) is already set to Hasan Abbani. The production site base path is `/` in [vite.config.js](vite.config.js).
