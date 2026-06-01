# Moro Website Handoff

## Project

This is a Vite + React recreation of `https://td-moro.framer.website/`.

## Run Locally

```bash
npm install
npm run dev -- --port 5174
```

Open `http://127.0.0.1:5174/`.

## Current State

- Visual recreation of the Moro homepage is implemented.
- Assets live in `assets/moro`.
- Main app code is in `src/main.jsx`.
- Styling and motion details are in `src/styles.css`.
- Framer-like interactions include reveal animations, scroll parallax, hover states, animated FAQ, mobile navigation, template dock, and cursor feedback.

## Verification

- `npm run build` passes.
- Desktop and mobile browser checks had no broken images and no horizontal overflow.
