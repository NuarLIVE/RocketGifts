# StarCase — Telegram WebApp (Frontend Only)

Dark/minimal UI inspired by Portals Market and StarCase. **No payments, no backend** — static screens for testing inside Telegram or local browser.

## Tech
- Vite + React + TypeScript
- TailwindCSS
- React Router
- Framer Motion (installed, optional)
- Telegram WebApp SDK (runtime)

## Pages
- `/market` — Season/Tasks/Leaderboard (Portals-like)
- `/play` — Cases, Upgrades, Battles, Free case, Games
- `/profile` — Profile with balances (StarCase-like)
- `/game/double` — Double (x2/x14) UI mock

## Quick start
```bash
pnpm i
pnpm dev
# or: npm i && npm run dev
```
Open http://localhost:5173 (works in browser and in Telegram WebView).

## Notes
- This is **UI-only**. Buttons/inputs are placeholders.
- To use in a bot, host the `dist/` after `pnpm build` and open via `tg://resolve?domain=...` WebApp.