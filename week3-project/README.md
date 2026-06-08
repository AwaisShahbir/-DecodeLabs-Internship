# DecodeLabs - Interactive Developer Portal & Code Sandbox

A highly premium, fully interactive static web dashboard designed for DecodeLabs software engineering interns. This Week 3 project is engineered as a client-side single-page application focusing on DOM manipulation, state management, real-time code parsing, event delegation, and strict HTML/CSS/JS decoupling standards.

---

## 💎 Core Features

- **Interactive Code Sandbox / Playground:** Write HTML, CSS, and JS side-by-side or select from prebuilt templates ("Interactive Alert Box", "Micro Theme Customizer", "Interactive To-Do List") and run it in real-time inside a sandboxed `iframe`.
- **Dynamic Track Filtering & Search:** Filter learning tracks in real-time using search queries and status categories (All, In Progress, Completed, Locked).
- **Interactive Checklist Accordion Drawer:** Clicking "Resume Track" slides open a detailed checklist. Toggling task checkboxes dynamically updates individual track progress bars and overall dashboard completion metrics.
- **Auto-Unlocking Dependency System:** Completing 100% of required checklist items triggers animations that unlock subsequent tracks and award specialized badge achievements.
- **Webinar Registration & Dynamic Countdown:** Register for live mentor sessions dynamically. Features an active countdown clock that computes time remaining in real-time.
- **Decoupled Architecture Standards:** Built with strict decoupling:
  - `js-` class prefix utilized strictly for JavaScript event listener attachments and query selectors. No styling rules are written against `js-` elements.
  - `is-` class prefix utilized strictly for CSS representation of current states (e.g., `.is-active`, `.is-locked`, `.is-completed`, `.is-registered`, `.is-open`, `.is-invalid`).
- **Notification Dropdown & Toast Systems:** Click the notification bell to view a dropdown panel of log states. Floating toast alerts slide into view at the bottom right to feedback interactive page activities.
- **Sprint 3 Submission Form:** Validates GitHub and Live deployment links, offering inline validation errors and visual shake container animations on inputs. Triggers a premium success modal showing confirmation values.
- **Glassmorphic Design with Ambient Glows:** Styled with custom HSL variable mappings for Light/Dark modes, backdrop filter blur overlays, and floating background glow orbs animated with translation keyframes.

---

## 🛠️ Built With

* **HTML5:** Semantic divisions (`<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<footer>`) with popover controls.
* **CSS3:** Responsive CSS Grid layouts, Flexbox structures, keyframe animations, `@keyframes`, custom variable mappings, and typography scaling via `clamp()`.
* **JavaScript (Vanilla):** Safe DOM updates (`textContent`, `srcdoc`), event listener bindings, real-time timers, local storage theme bindings, and custom toast injections.
* **FontAwesome:** Scalable vector icons.
* **Google Fonts:** Modern typographic families `Outfit` and `Plus Jakarta Sans`.

---

## 🏃 Running Locally

Since this is a client-side static application, it runs directly in any modern browser without compiler runtimes.

### Method 1: Local Server (Vite / Live Server)
If you are using **VS Code**, install the **Live Server** extension:
1. Open the project folder in VS Code.
2. Click **Go Live** at the bottom-right status bar.
3. The page will open on `http://127.0.0.1:5500/index.html`.

### Method 2: Node.js Static Server
Start a static web server:
```bash
# Install http-server
npm install -g http-server

# Run inside directory
http-server .
```
Open the localhost address specified in the console output.

---

*Developed with ❤️ by DecodeLabs Intern*
