# Chrona Design Rules — Anti-Generic UI System

Rules for developing, styling, and reviewing UI in the Chrona e-commerce storefront. Each rule states what to avoid, what to do instead, and why. Rules are tagged [R0]–[R9] for automated linting and design reviews.

---

## 0. Project Tokens — Chrona (authoritative) [R0]

These tokens define Chrona's core design system. Do NOT introduce arbitrary hex colors, fonts, or radii.

- **Brand Primary:** `#B00020` (`--color-primary`), Dark: `#900010` (`--color-primary-dark`), Light tint: `#FFEDD5` (`--color-primary-light`).
- **Page Background:** `#F9FAFB` (`gray-50/50`) or `#FFFFFF`.
- **Surfaces & Cards:** `#FFFFFF`, flat surface with subtle border `#E5E7EB` (`gray-200`) or `#F3F4F6` (`gray-100`).
- **Text:**
  - Headings: `#111827` (`gray-900`) in `font-syne font-bold`.
  - Body: `#374151` (`gray-700`) in `font-urbanist`.
  - Secondary/Muted: `#6B7280` (`gray-500`) or `#9CA3AF` (`gray-400`).
- **Radius Scale (3-tier strict discipline):**
  - `6px` (`rounded-md`): Buttons, form inputs, badges, tags.
  - `12px` (`rounded-xl`): Cards, modals, dialogs, banners.
  - `9999px` (`rounded-full`): Avatars, search bar pill, filter pills.
  - *No other radii (no `rounded-2xl`, `rounded-3xl`, `rounded-sm`).*
- **Icons:** App code must use **strictly ONE set — Lucide React** — at standard sizing (16px, 20px, 24px) with 1.5–2px stroke. **No raw emojis as UI icons**.
- **Typography Pairing:**
  - Headings: `Syne` (`font-syne`, weights 600/700).
  - Body & UI: `Urbanist` (`font-urbanist`, weights 400/500/600).
- **Currency & Price Display:** All amounts must be formatted in **Naira (₦)** using the centralized `formatPrice()` helper from `@/lib/format`. Single source of truth. No lorem amounts, no `$` placeholders, no `₹` leftovers.
- **Viewports & Targets:** Mobile-first responsive design. All interactive touch targets must be >= 44x44px.

---

## 1. Color [R1]
- **DON'T** use purple-to-blue or orange-to-purple gradients as brand, header, button, or banner backgrounds.
- **DON'T** use gradient hero text or multi-color glowing borders (`animate-pulse` gradient rings).
- **DON'T** differentiate cards purely by arbitrary colored borders.
- **DO** use one flat primary brand color (`#B00020`), used intentionally for primary CTAs, active states, and accents.
- **DO** use solid neutral surfaces with subtle borders (`border-gray-200`).

---

## 2. Typography [R2]
- **DON'T** ship default Inter everywhere or unstyled generic sans.
- **DON'T** mix uncoordinated font weights or drop decorative serif-italics into modern headers.
- **DO** maintain the declared pairing: `Syne` for titles/headlines, `Urbanist` for body copy and UI navigation.
- **DO** establish clear typographic scale: H1 (28–48px), H2 (20–28px), H3 (14–18px), Body (14–16px), Caption/Meta (12px).

---

## 3. Layout & Hierarchy [R3]
- **DON'T** make all product sections identical 4-column cards with identical weight and treatment.
- **DON'T** center everything or use generic 3-box feature rows.
- **DO** designate one primary hero element per view (e.g. Hero Collection Banner, or Flash Sale deal with urgency clock).
- **DO** make numbers the hero on commerce cards: bold prominent prices in ₦, strikethrough original prices, and compact discount badges.

---

## 4. Components [R4]
- **DON'T** ship untouched default component styles with zero customization.
- **DON'T** use glassmorphism (frosted blur `backdrop-blur-xl`, translucent `bg-white/10`) for standard cards or form containers.
- **DON'T** use raw emojis in UI buttons, badges, or category navigation.
- **DO** customize radius, borders, and button styles into a coherent design system.
- **DO** design real hover, active, and focus states (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`).

---

## 5. Depth & Motion [R5]
- **DON'T** put heavy drop shadows (`shadow-xl`, `shadow-2xl`) on every flat card so everything floats.
- **DON'T** use animated floating gradient orbs or cursor-following spotlights in authentication backgrounds.
- **DO** keep cards flat on subtle borders (`border-gray-100` or `border-gray-200`).
- **DO** use elevation and shadows strictly on genuinely floating layers (modals, dropdown menus, floating action sheets).
- **DO** animate with purpose and respect `prefers-reduced-motion`.

---

## 6. Copy & Content [R6]
- **DON'T** put emojis in headings or greetings (e.g. "Welcome back 👋", "🔥 Deal").
- **DON'T** use buzzwords like "cutting-edge", "seamless experience", "unlock your potential".
- **DO** write specific, authentic e-commerce copy with clear units, real product specifications, and concrete delivery estimates.

---

## 7. Spacing & Consistency [R7]
- **DON'T** use ad-hoc arbitrary padding (`p-2.5`, `p-7`, `sm:p-9`).
- **DO** follow the 4/8-based spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px (`p-2`, `p-3`, `p-4`, `p-6`, `p-8`, `p-12`).
- **DO** keep card padding, list item heights, and container gutters uniform across pages.

---

## 8. Accessibility & Realism [R8]
- **DON'T** ship low-contrast text (e.g. translucent placeholder on frosted glass) that fails WCAG AA.
- **DON'T** rely on color alone to convey status (e.g. stock status, discount). Pair with text and icons.
- **DO** ensure all text meets WCAG AA contrast (>= 4.5:1 for regular text, >= 3:1 for large text).
- **DO** ensure touch targets are >= 44x44px on mobile screens.

---

## 9. Imagery [R9]
- **DON'T** use stock gradient blobs or generic 3D illustrations.
- **DO** use authentic product photography and clean lifestyle editorial imagery.
