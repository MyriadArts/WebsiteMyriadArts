# MYRIAD ARTS ISSUE TRACKER

## P0 - Critical (Functionality / Layout Breaking)
- [x] **Contact Form Webhook Missing:** `.env.example` already exists with `GOOGLE_APPS_SCRIPT_URL`. The API route gracefully falls back to dev mode logging when unset. Ensure production env is configured. (Status: ✅ Verified)
- [x] **Invalid Parent Position for Fill Image:** Fixed `position: static` → `relative` on the parent `<div>` wrapping `gallery-classical-performance.jpg` in `MissionSection.jsx`. Added `sizes` prop. (Status: ✅ Fixed)

## P1 - High (Performance / SEO)
- [x] **Missing LCP Priority:** Added `priority` prop to `/images/home/gallery-mandala-art.png` in `GlobalBackground.jsx` (first mandala — detected as LCP). (Status: ✅ Fixed)
- [x] **Missing Sizes Prop on Fill Images:** Added `sizes` to all `fill` Images: `GlobalBackground.jsx` (2 mandala images), `GallerySection.jsx` (3 gallery columns), `MissionSection.jsx` (1 performance image), `PartnersSection.jsx` (1 backdrop image). (Status: ✅ Fixed)
- [x] **Slow Navigation Between Pages:** Created `app/loading.jsx` — an instant loading spinner that shows immediately during route transitions instead of a blank screen. Removed redundant AOS imports from `about/page.jsx` and `services/page.jsx` to reduce per-page JS bundles. (Status: ✅ Fixed)
- [x] **Slow Hero Video Loading:** Removed 3 heavy `<link rel="preload" as="video">` tags from `layout.jsx` that were downloading multiple large video files on every page load. Replaced with `dns-prefetch` + `preconnect` for the CDN. Changed `preload="auto"` → `preload="metadata"` across 5 video elements (HeroSection, SplashScreen, About, Vaarsa, EventDescription). Changed CategorySection hover videos to `preload="none"`. (Status: ✅ Fixed)

## P2 - Medium (Warnings / Technical Debt)
- [x] **Framer Motion Warning:** Added `layoutEffect: false` to all 6 `useScroll()` calls across `HeroSection`, `MissionSection`, `GallerySection`, `CategorySection`, `EventDescriptionSection`, and `ContactPage`. (Status: ✅ Fixed)
- [x] **Outdated Browserslist:** Ran `npx update-browserslist-db@latest` — updated `caniuse-lite` from v1.0.30001791 → v1.0.30001814. (Status: ✅ Fixed)

## P3 - Low (Enhancements / Cleanup)
- [x] **Verify Navigation Links:** Fixed dead footer links — `Privacy Policy` → `/privacy`, `Terms of Use` → `/terms` (changed `<a href="#">` to `<Link>`). Fixed Facebook social link from generic `facebook.com` → `facebook.com/myriadarts`. (Status: ✅ Fixed)
- [x] **Accessibility Check:** Custom cursor already has `aria-hidden="true"` and `pointerEvents: "none"`. Added `aria-label` to all 4 contact form fields (name, email, inquiry type, message). (Status: ✅ Fixed)

