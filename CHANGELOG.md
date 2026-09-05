# Changelog

All notable changes to ScienceLab 3D are documented in this file.

## [1.2.0] - 2026-09-06

### Added
- **Offline Android App** — the complete 40-experiment lab packaged as a native
  Android app (Capacitor 8, `com.rudrasarker.sciencelab3d`). The full Next.js static
  export ships inside the APK: every experiment and its detail guide runs 100%
  offline, no internet or sign-up needed. Signed release + debug APKs attached to
  the GitHub release; verified on a real device (WebGL rendering, live simulation
  data, back navigation).

### Fixed
- **Android route resolution** — Capacitor's html5mode fallback served the homepage
  for prerendered routes (extensionless paths never resolved to their own bundled
  `index.html`); a custom WebViewClient now maps each route to its document.
- **Android back navigation** — system back returns from an experiment to the lab
  home instead of exiting the app.

### Changed
- Packaging-only build config for the static export (`output: "export"`,
  `trailingSlash`, static route config on the 40 route wrappers, sitemap, and the
  legacy `[id]` redirector split). Experiment code, content, and styling are
  untouched.

## [1.0.0] - 2025-06-05

### Added
- **40+ Virtual Experiments** — Physics, Chemistry, Biology, and Math simulations
- **3D Visualization** — Three.js-powered interactive lab environments
- **Real-time Data** — Live sensor readings and graph plotting
- **Experiment Guides** — Step-by-step instructions for each experiment
- **Data Export** — Export experiment results as CSV/PDF
- **Dark Mode** — Full dark/light theme support
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Next.js 14** — Built with React Server Components and App Router
- **Tailwind CSS** — Utility-first styling with custom design system
- **PWA Support** — Installable and works offline
