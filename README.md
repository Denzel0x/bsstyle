# Invorious - Company Profile Website

Modern company profile website for Invorious, a Web3-native consulting and advisory firm. Built with React Router v7, Tailwind CSS, and designed for performance and clarity.

---

## Highlights

- Multi-page website with Home, Services, Service Details, Pricing, Schedule, Team, Portfolio, About, and legal pages.
- Dynamic routes for service details (`services/:slug`) and profile pages (`team/:id?`, `portfolio/:id?`, `work-with-us/:id?`).
- SSR (Server-Side Rendering) enabled via React Router for consistent server-side rendering.
- Modern styling using Tailwind CSS v4 + Vite.
- Separated data/services layer to keep components clean and maintainable.

---

## Tech Stack

| Area      | Choice |
| --------- | ------ |
| Framework | React Router v7 (SSR) + React 19 |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Runtime   | Node.js (latest LTS version recommended) |
| Tooling   | TypeScript, Vite, `vite-tsconfig-paths` |
| Animations | `motion` |
| Icons     | `react-icons` |

---

## Dependencies

### Core Dependencies

- `react`
- `react-dom`
- `react-router`
- `@react-router/node`
- `@react-router/serve`
- `isbot`
- `motion`
- `react-icons`

### Dev Dependencies

- `@react-router/dev`
- `tailwindcss`
- `@tailwindcss/vite`
- `vite`
- `vite-tsconfig-paths`
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version)
- npm (included with Node.js)

### Install & Run (Development)

```bash
npm install
npm run dev