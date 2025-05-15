# Invisible Character Stripper

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

A modern, privacy-focused web tool to remove invisible characters from text — such as zero-width spaces, byte order marks, and other formatting control characters — with support for direct text input and file uploads.

This app is entirely client-side, works offline as a PWA, and is MIT licensed for open usage and auditing. Built with a mobile-first UX and no user tracking beyond simple page analytics.

---

## 🔥 Features

- ✅ Strip invisible Unicode characters (`\u200B`, `\uFEFF`, etc.)
- 📝 Paste text or upload `.txt`/`.md` files
- 📤 Copy cleaned text or download as `.txt`
- 🌘 Light/Dark theme toggle (defaults to system preference)
- 📱 Fully responsive, mobile-first layout
- 📦 Works offline via PWA support
- 🛡️ Privacy-first: nothing is saved or logged
- 📊 Cloudflare Web Analytics only
- ⚙️ MIT licensed, open-source on GitHub
- 🚀 Deployed via GitHub Actions to Cloudflare PagesPages

---

## 🧠 Example User Flows

### Text Input

1. User visits the site.
2. Pastes in a block of suspicious text.
3. App shows the text with the characters highlighted.
4. User clicks a button to remove invisible characters.
5. User clicks **Copy** or **Download**.

### File Upload

1. User drags a `.txt` file into the drop zone.
2. App reads file client-side and removes invisible characters.
3. App shows the text with the characters highlighted.
4. User clicks a button to remove invisible characters.
5. User clicks **Copy** or **Download**.

### CLI Utility

1. User executes a CLI command passing in the file to strip.
2. App reads file and removes invisible characters.
3. Cleaned text is written to the same file.

---

## 🧱 Tech Stack

| Area           | Tool                                                                  |
|----------------|-----------------------------------------------------------------------|
| Framework      | [Next.js 14](https://nextjs.org/) (App Router)                        |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)                              |
| UI Components  | [shadcn/ui](https://ui.shadcn.com/)                                   |
| Icons          | [Lucide](https://lucide.dev/)                                         |
| Theme Support  | [next-themes](https://github.com/pacocoursey/next-themes)             |
| File Parsing   | Native FileReader API                                                 |
| PWA Support    | [next-pwa](https://github.com/shadowwalker/next-pwa)                  |
| Analytics      | [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) |
| CI/CD          | GitHub Actions                                                        |
| Tests          | [Vitest](https://vitest.dev/)                                         |
| Deployment     | Cloudflare Pages                                                      |

---

## 🔐 Privacy and Security

This app:

- Does **not** log or transmit your text
- Does **not** use any third-party scripts (except optional Cloudflare Analytics)
- Works entirely offline after first load
- Uses no cookies or trackers
- Stores nothing — not even temporarily

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- Bun (optional, for local dev)
- GitHub Copilot Agent (if using AI support)

### Local Dev

```bash
git clone https://github.com/mitchellsimoens/ai-watermark-stripper.git
cd ai-watermark-stripper
bun install
bun run dev
```

### Build & Export for Cloudflare Pages

```bash
bun run build
bun run export
```
