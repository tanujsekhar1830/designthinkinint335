# Waiting for the Shuttle

**Intra-Campus and Last-Mile Transport** — Design Thinking prototype built with React, Vite, TypeScript, Tailwind CSS, Lucide React, and React Router (`HashRouter`).

All shuttle routes, arrival times, crowd conditions, and campus layouts in this project are **illustrative demonstration data** stored client-side with `localStorage`. No backend server, external API key, or paid service is required.

---

## Included Screens

1. **Home** (`#/`) — Main dashboard with route selection, saved pickup point, service notices, waiting area crowd link, and *View routes* CTA.
2. **Route Status** (`#/route-status`) — Route A / B / C selector, 3-stop vertical timeline, illustrative ETA, and interactive status refresh.
3. **Pickup Point** (`#/pickup-point`) — Selected campus stop details, save/change pickup point controls, campus building & marker illustration, and stop sign safety reminder.
4. **Waiting Area (Crowd Information)** (`#/waiting-area`) — Selectable sample crowd levels (`Low`, `Moderate`, `Busy`) with color-coded status indicators and safety guidance.
5. **Continue Your Journey (Last-Mile Assistance)** (`#/last-mile`) — Walking directions link and expandable onward transport categories (`Walking`, `Campus Shuttle`, `Local Transport`) with fare/availability verification notices.
6. **Help & Feedback** (`#/help-feedback`) — Validated feedback form saved locally to `localStorage` in demonstration mode, plus a viewer for previously submitted demo reports.
7. **Campus Map** (`#/map`), **Service Notices** (`#/alerts`), and **Settings** (`#/settings`) via the fixed bottom navigation bar.

---

## Local Development

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
npm run preview
```

---

## GitHub Pages Deployment (`waiting-for-the-shuttle`)

This repository is pre-configured for GitHub Pages:
- `vite.config.ts` sets `base: '/waiting-for-the-shuttle/'` during production builds.
- `src/App.tsx` uses `HashRouter` so refreshing any screen works cleanly on static hosting.
- `.github/workflows/deploy.yml` builds and deploys `dist/` automatically on every push to `main`.

### Step-by-Step Setup

1. Create a GitHub repository named `waiting-for-the-shuttle`.
2. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Waiting for the Shuttle"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/waiting-for-the-shuttle.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy Waiting for the Shuttle to GitHub Pages** to complete.
6. Visit your live site at:
   `https://YOUR-GITHUB-USERNAME.github.io/waiting-for-the-shuttle/`
