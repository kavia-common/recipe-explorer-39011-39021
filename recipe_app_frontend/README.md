# Recipe Explorer (LightningJS / Blits)

Modern web UI to browse, search, and view recipes. Built with Lightning 3 (Blits) using the Ocean Professional theme.

## Quick start

1) Install dependencies
```sh
npm install
```

2) Run in development (Vite on port 3000)
```sh
npm run dev
```

Open the dev URL in your browser. The app will boot without runtime errors.

## Environment configuration

The app reads API base URL from Vite env variables. If `VITE_API_BASE` is not set or the API is unavailable, the app uses local mock data and logs a warning.

- Copy `.env.example` to `.env` and set values as needed.
- Minimum configuration to use a backend:
```
VITE_API_BASE=https://your-backend.example.com
```

Available variables:
- VITE_API_BASE, VITE_BACKEND_URL, VITE_FRONTEND_URL, VITE_WS_URL, VITE_NODE_ENV, VITE_NEXT_TELEMETRY_DISABLED,
  VITE_ENABLE_SOURCE_MAPS, VITE_PORT, VITE_TRUST_PROXY, VITE_LOG_LEVEL, VITE_HEALTHCHECK_PATH, VITE_FEATURE_FLAGS, VITE_EXPERIMENTS_ENABLED

## Features

- Header with title and navigation chip
- Search bar (type and press Enter)
- Grid of recipe cards (mock data by default)
- Client-side filtering of recipes when typing a query
- Detail modal with title, image, ingredients, and steps
- Routing for Home `/` and Details `/details/:id`
- Keyboard navigation (arrows to move focus, Enter to select, Back to close modal)

## Theme

Ocean Professional palette:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Styling uses rounded corners, subtle shadows, and clean typography via Lightning primitives (no DOM/CSS).

## Notes on Input

Lightning/Blits handles input via component `input` objects. Key mappings are configured by Blits; unhandled input bubbles up the component tree. Use arrows to navigate the grid, Enter to open details, and Back to close.

## Build for production

```sh
npm run build
```

The optimized app will be in `dist/`.

## Resources

- [Blits documentation](https://lightningjs.io/v3-docs/blits/getting_started/intro.html)
- [Blits Example App](https://blits-demo.lightningjs.io/?source=true)
- [Blits Components](https://lightningjs.io/blits-components.html)
