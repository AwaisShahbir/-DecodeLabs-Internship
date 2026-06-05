# DecodeLabs - Developer Learning Portal & Dashboard

A premium, modern, and highly interactive static web dashboard designed for software engineering interns to explore active learning tracks, attend live webinars, and navigate a structured developer curriculum built with CSS Grid macro layouts and Flexbox micro components.

---

## 💎 Features

- **CSS Grid Macro Layout:** Full-page layout structured using CSS Grid with named template areas for header, sidebar, main, and footer regions.
- **Native HTML Popover Sidebar:** Mobile navigation drawer built entirely using the native HTML Popover API — no JavaScript required for toggling.
- **Fluid Typography:** All text scales responsively using `clamp()`-based CSS custom properties for a smooth cross-device experience.
- **Dark / Light Theme Switcher:** Persistent theme toggle powered by `localStorage` and CSS `data-theme` attribute overrides.
- **Custom Toast Notification System:** Dynamically injected toast alerts with slide-in animations for webinar registration and track resuming interactions.
- **Glassmorphic Design System:** Cohesive design built with HSL color tokens, CSS custom properties, backdrop filters, and glowing ambient orbs.
- **Fully Responsive:** Mobile-first layout that adapts across three breakpoints — mobile, tablet (≥768px), and desktop (≥1024px).

---

## 🛠️ Built With

* **HTML5:** Semantic architecture (`<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<footer>`) with native Popover API integration.
* **CSS3:** CSS Grid macro layout, Flexbox micro alignment, HSL design tokens, fluid `clamp()` typography, `@starting-style` entry animations, and `backdrop-filter` glassmorphism.
* **JavaScript (Vanilla):** DOM manipulation, theme persistence via `localStorage`, dynamic toast injection, and popover state management.
* **FontAwesome:** Scalable icon set used throughout the UI.
* **Google Fonts:** `Outfit` and `Plus Jakarta Sans` for modern typographic hierarchy.

---

## 🏃 How to Run the Project Locally

Since this is a static webpage built using HTML, CSS, and Vanilla JS, it requires no compilation. You can run it locally in a few ways:

### Method 1: Direct File Access
Simply double-click the `index.html` file in your file explorer to open it directly in any modern web browser.

### Method 2: Live Server (Recommended)
If you are using **VS Code**, install the **Live Server** extension:
1. Open the project folder in VS Code.
2. Click **Go Live** in the status bar at the bottom right.
3. The page will automatically open on `http://127.0.0.1:5500/index.html`.

### Method 3: Using Node.js (`http-server`)
If you have Node.js installed, you can spin up a local server:
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the project directory and start the server
http-server .
```
Open the URL shown in your terminal (usually `http://localhost:8080`).

---

## 📬 Contact & Submission
Complete all active learning tracks and register for live sessions before submitting your Sprint 2 deliverables via the **Sprint Submission Panel**.
*Developed with ❤️ by DecodeLabs Intern*
