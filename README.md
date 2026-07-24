# Frontend Take-Home: Multi-Step Security Bundle Builder

A production-ready, interactive multi-step security bundle builder prototype built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.


---

## 🔗 Live Demo & Repository

- **Live Site (Vercel):** https://take-home-bundle-builder-lpvz.vercel.app/
- **GitHub Repository:** https://github.com/AhmedKhalid2002/Take-Home-Bundle-Builder-

---

## 🚀 Features & Requirements Implemented

- **Data-Driven Architecture:** All steps, categories, and products are dynamically rendered from a clean, central JSON source (`bundleData.json`).
- **4-Step Vertical Accordion:**
  - Step 1 ("Choose your cameras") is expanded by default.
  - Interactive expand/collapse behavior.
  - "N selected" counter on each step header reflecting distinct chosen products in that category.
  - Quick navigation "Next: [Step Name]" button to advance to the next step.
- **Product Cards:**
  - Dynamic display of discount badges, thumbnails, descriptions, "Learn More" links, and pricing (compare-at vs active price).
  - Highlighted active border state for selected products (quantity > 0).
- **Variant Selector (Color Chips):**
  - Independent quantity tracking per variant (e.g., White and Black of the same product maintain distinct counts).
  - Seamless binding between the active variant color chip and the card's quantity stepper.
  - Every active variant with `count > 0` flows separately into the Live Review Panel.
- **Live Sync Review Panel ("Your security system"):**
  - Synchronized quantity steppers on both product cards and summary line items.
  - Dynamic grouping by category (`CAMERAS`, `SENSORS`, `ACCESSORIES`, `PLAN`).
  - Real-time subtotal, savings callout, and compare-at total calculations.
  - Free shipping row and satisfaction guarantee badge.
- **State Persistence ("Save my system for later"):**
  - Saves the entire bundle state (`quantities`, `activeVariants`, `openStep`) to `localStorage`.
  - Restores configuration seamlessly across browser reloads or return visits.
- **Responsive Design:**
  - Pixel-perfect match to the Figma design on desktop.
  - Fully responsive layout adapting down to mobile screen sizes.

---

## 🛠️ Tech Stack & Tools

- **Frontend Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **State Management:** React Context API + Custom Hooks
- **Persistence:** `localStorage` Utility
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
src/
├── assets/             # Static images and visual assets
├── components/         # Modular UI components
│   ├── accordion/      # AccordionStep & StepHeader
│   ├── products/       # ProductCard, VariantSelector & QuantityStepper
│   └── review/         # ReviewPanel, ReviewItem & OrderSummary
├── context/            # BundleContext for global synced state
├── data/               # bundleData.json (JSON data source)
├── types/              # TypeScript interfaces and types
├── utils/              # Persistence (localStorage) and formatting helpers
├── App.tsx             # Root Layout & Provider wrapper
└── main.tsx            # Application entry point
