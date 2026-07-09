# 🌌 Chrona E-Commerce Storefront

Chrona is a premium, high-performance, and feature-rich full-stack e-commerce storefront. Crafted using the latest Next.js 16 (App Router), React 19, and Tailwind CSS v4, it offers an immersive, fluid shopping experience optimized for desktop and mobile devices.

---

## 🎨 Design & Aesthetics
Chrona prioritizes visual excellence with curated color schemes, glassmorphic UI components, and fluid micro-animations:
* **Custom Dark Theme Auth Screens:** The Login and Registration pages feature a dark stellar theme with 4 animated floating color orbs (`orbFloat`), glassmorphism cards with glowing borders on focus, and modern input transitions.
* **Modern Color Palette:** Styled using a custom HSL palette configured in Tailwind CSS v4 with an elegant orange primary accent and swirly off-white background.
* **Dynamic Animations:** Micro-animations for button hovers, page transitions (`fadeInUp`), and interactive loaders.
* **Notched Mobile Safe Areas:** Integrated support for notched mobile displays using CSS safe area inset variables (`pb-safe`).

---

## ✨ Key Features
* 🔍 **Dynamic Live Search:** Search suggestions populate instantly as you type, filtering product cards dynamically in a responsive grid without requiring a page reload.
* 🌐 **Dynamic Localization System:** Powered by a custom `TranslationProvider` and a `MutationObserver` layout watch-list, the app dynamically translates dynamic text fetched from APIs or user-generated reviews into the active language, falling back gracefully where necessary.
* 📍 **Smart Shipping Location:** Detects location automatically using browser geolocation coupled with reverse geocoding via OpenStreetMap's Nominatim API, or lets users enter details manually.
* 🛍️ **Comprehensive Cart Management:** Supports add, remove, and quantity updates, dynamic coupon discounts, delivery estimation calculations, and persistent state.
* 💳 **Intuitive Address & Payment Checkout:** Step-by-step checkout featuring:
  - Saved addresses selection cards with a dashed border "Add Address" trigger.
  - One-click GPS address autofill.
  - Dynamic payment options accordion (UPI, Credit/Debit Cards, Net Banking, and COD) with input validation.
* 📱 **Mobile-Optimized UX:**
  - Swipeable category nav pills hiding scrollbars natively.
  - Glassmorphic floating mobile navigation bar at the bottom.
  - Sticky checkout details and CTA bars.
  - 2-column product grids designed specifically for mobile screens.

---

## 🛠️ Tech Stack
* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Library:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & CSS Variables
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Icons:** [Lucide React](https://lucide.dev/)
* **API Geolocation:** [OpenStreetMap Nominatim](https://nominatim.org/)

---

## 📂 Directory Structure

```
chrona-frontend/
├── public/                # Static assets, SVG badges, and browser favicons
└── src/
    ├── app/               # Next.js App Router pages
    │   ├── cart/          # Cart page with mobile sticky checkout
    │   ├── checkout/      # Address entry and Payment method steps
    │   ├── product/       # Product details page with sticky bottom CTA
    │   ├── search/        # Live dynamic search results grid
    │   └── globals.css    # Global stylesheet & custom keyframe animations
    ├── components/        # Shared components
    │   ├── auth/          # Redesigned glassmorphic auth shells & inputs
    │   ├── ui/            # Reusable UI controls (Button, Switch)
    │   ├── Header.tsx     # Location-aware navigation header
    │   ├── MobileNav.tsx  # Sticky bottom glass nav bar for mobile devices
    │   └── CategoryNav.tsx# Horizontal sliding pills for mobile
    ├── hooks/             # Custom React hooks (useTranslation)
    ├── store/             # Zustand stores (useAddressStore, useAuthStore, useCartStore, useLocaleStore)
    └── lib/               # Utility functions, translation tables, and mock API data
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js (v18 or higher)** and npm installed.

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Running the Development Server
Start the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production
Create an optimized production build:
```bash
npm run build
```

To run the production build locally:
```bash
npm run start
```

### Code Verification
Run the TypeScript compiler to check for type issues:
```bash
npx tsc --noEmit
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
