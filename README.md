# BaigBots industry portfolio

React + Vite portfolio organized around industry solutions. Project content is maintained in `src/data/projects.js`; shared UI is in `src/components`, and theme tokens are in `src/styles/tokens.css`.

## Run locally

```bash
npm install
npm run dev
```

Build with `npm run build`. Vite writes the static site to `dist/`.

## Content and assets

The project descriptions and screenshots come from the supplied BaigBots project portfolio presentation. The colors, typography, cut corners and theme behavior follow the supplied theme guide. To add work, add a project object to `src/data/projects.js` and place its screenshot in `public/images/`. Industry filters and project counts update automatically.
