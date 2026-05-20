# Niyam Sheth — Graphic Design Portfolio

![Niyam Sheth Portfolio](https://img.shields.io/badge/Design-Editorial%20%7C%20Swiss-bc0000?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla%20HTML%20%7C%20CSS%20%7C%20JS-111111?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

A highly modern, premium, editorial-style portfolio website designed for a graphic designer. Built entirely from scratch without frameworks, this portfolio focuses on elite visual storytelling, brutalist typographic layouts, and cinematic interactions.

---

## ✦ The Vision

This project was built to capture the essence of:
- **Swiss Modernism & Brutalism:** Massive typography, aggressive scale, and experimental grid systems.
- **Luxury Fashion Aesthetics:** Ivory white backgrounds contrasted with deep, rich red (`#bc0000`) and stark blacks.
- **Award-Winning Motion:** Kinetic typography, magnetic buttons, custom trailing cursors, and stagger-reveal animations inspired by Awwwards-winning sites.

---

## 🛠 Tech Stack

This project is ruthlessly optimized, relying **strictly on Vanilla web technologies**. No React, no Tailwind, no jQuery.

* **HTML5:** Highly semantic structure, accessible form fields, and clean DOM architecture.
* **CSS3:** Advanced CSS variables (Design System), Flexbox/Grid for complex asymmetric layouts, and native CSS transitions/keyframes.
* **Vanilla JavaScript (ES6+):** Intersection Observers for scroll-jacking, `requestAnimationFrame` for buttery-smooth 60fps cursor trailing, and dynamic scroll progress calculations.

---

## 🎨 Design System

The entire visual language is controlled via CSS variables in `:root`. Updating these variables will cascade across the entire site instantly.

```css
:root {
  /* Core Palette */
  --brand: #bc0000;    /* Deep Red Accent */
  --bg: #FFFFF0;       /* Ivory White Background */
  --text: #111111;     /* Rich Black Text */
  --muted: #5c5c5c;    /* Subdued Grey for secondary text */
  --border: #d9d9d9;   /* Soft Grey for dividers */

  /* Typography */
  --font-main: "Oswald", sans-serif;

  /* Animation Curves */
  --transition: 0.4s cubic-bezier(.16,1,.3,1);
}
```

---

## 🚀 Key Features & Interactions

### 1. Cinematic Preloader
A screen-takeover loading animation that fakes asset loading progress, culminating in a smooth slide-up reveal of the hero section.

### 2. Custom Cursor Physics
The default cursor is hidden (`cursor: none`) and replaced with a two-part custom UI:
- A leading solid red dot (`#cursor`) with fast interpolation.
- A trailing hollow ring (`#cursorFollower`) with eased interpolation (`0.15` friction).
- **Hover States:** When hovering over interactive elements (buttons, links, cards), the cursor expands, blurs, and shifts colors to indicate clickability.

### 3. Scroll-Linked Animations
Using the modern `IntersectionObserver` API, elements are painted to the DOM but kept at `opacity: 0` and `translateY(30px)`. As they enter the viewport, they are sequentially triggered to reveal, creating a cascading waterfall effect.

### 4. The Creative Process Timeline
A dynamic, scroll-bound vertical timeline. As the user scrolls down the "Process" section, a red progress bar fills up, mathematically mapped to the section's bounding rectangle. Individual process steps glow when reached.

### 5. Magnetic Interactions
Buttons and links feature "magnetic" effects where underlying pseudo-elements (`::before`) slide up to invert colors smoothly, creating a heavy, tactile feel.

---

## 📂 Project Structure

```text
Niyamsheth/
│
├── index.html       # The DOM structure (7 semantic sections)
├── styles.css       # Design tokens, grid layouts, responsive media queries
├── index.js         # Scroll physics, observers, custom cursor, sliders
└── README.md        # Project documentation
```

### Breakdown of Sections:
1. **Hero:** Massive typography, floating elements, background grid, marquee strip.
2. **About:** Split-screen editorial layout with animated stat counters.
3. **Work (Featured Projects):** Alternating left/right image layouts with hover reveals.
4. **Skills:** Animated width bars and circular SVG stroke-dashoffset progress indicators.
5. **Process:** Scroll-jacking timeline UI.
6. **Testimonials:** Custom-built JavaScript carousel slider.
7. **Contact:** Large-scale typography, interactive form inputs with floating labels.

---

## 💻 How to Run

Because this project uses vanilla web technologies, no build step or package manager (`npm`/`yarn`) is required.

1. **Clone or Download** the repository to your local machine.
2. **Open** `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).
   * *Alternatively*, for the best experience, use a local server like the VS Code **Live Server** extension to prevent any local CORS issues with fonts/assets.

---

## 📱 Responsiveness

The portfolio is fully responsive:
- **Desktop (1024px+):** Full asymmetric grid layouts, massive typography, all hover physics enabled.
- **Tablet (768px - 1024px):** Grids collapse to single columns where necessary, typography scales down using `clamp()`.
- **Mobile (<768px):** Navigation moves to a full-screen hamburger menu overlay, cursor physics are ignored (touch native), and layouts stack cleanly while maintaining the brutalist aesthetic.

---

*Designed and engineered for maximum visual impact.*
