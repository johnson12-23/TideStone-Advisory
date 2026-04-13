# TideStone Advisory UI (React + TypeScript)

A full multi-page React + TypeScript UI with a refreshed teal/turquoise design, improved copywriting, updated navigation labels, and upgraded image assets.

## Pages
- `/` (Overview)
- `/login`
- `/trust-management`
- `/investment-advisory`
- `/wealth-preservation`
- `/terms`
- `/privacy`
- `/account`

## Home Sections
- Overview (hero)
- Approach
- Solutions
- Insights

## Tech Stack
- React + TypeScript
- Vite
- React Router DOM
- CSS Modules
- Lucide React icons

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Demo Login
- Username: `Myinheritance`
- Password: `Thomas12@`

## Notes
- Color system is tokenized through `src/theme.ts` and synced into CSS variables in `src/App.tsx`.
- Home hash navigation uses `/#overview`, `/#approach`, `/#solutions`, and `/#insights`.
- Session storage handles login state and last-login display.
- Downloadable trust summary is served from `public/assets/trust_document.pdf.docx`.
