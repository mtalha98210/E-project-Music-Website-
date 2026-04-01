# Design Document: MusicWorld Website

## Overview

MusicWorld.com is a pure frontend web application built with HTML5, CSS3, and vanilla JavaScript. It presents music information across five genres (Rock, Jazz, Pop, Rap, Classical) with artist profiles, album records, reviews, articles, and a simulated music player. The site is split into two completely separate codebases — one for desktop (≥1024px) and one for mobile (<1024px) — with an entry-point `index.html` that detects screen width and redirects accordingly.

Key design decisions:
- No backend or build tools; all data lives in JS data files
- Auth simulation via `localStorage` (no server calls)
- Music player is UI-only (no real audio files required)
- Blue/white theme enforced through CSS custom properties
- Bootstrap 5 + Font Awesome + Swiper.js loaded via CDN

---

## Architecture

### High-Level Structure

```
music-world-website/
├── index.html                  ← Entry point: detects device, redirects
├── desktop/
│   ├── index.html              ← Desktop home page
│   ├── css/
│   │   ├── variables.css       ← CSS root variables (theme)
│   │   ├── base.css            ← Reset, typography, utilities
│   │   ├── navbar.css
│   │   ├── splash.css
│   │   ├── home.css
│   │   ├── category.css
│   │   ├── artist.css
│   │   ├── album.css
│   │   ├── player.css
│   │   ├── auth.css
│   │   ├── search.css
│   │   └── animations.css
│   ├── js/
│   │   ├── data/
│   │   │   ├── music-data.js   ← All music content (artists, albums, songs)
│   │   │   └── articles-data.js
│   │   ├── auth.js             ← localStorage auth simulation
│   │   ├── player.js           ← UI music player
│   │   ├── search.js           ← Client-side search
│   │   ├── slider.js           ← Swiper.js initialization
│   │   ├── animations.js       ← Intersection Observer scroll animations
│   │   ├── splash.js           ← Splash screen logic
│   │   ├── router.js           ← Hash-based page routing
│   │   └── main.js             ← App bootstrap
│   ├── pages/
│   │   ├── category.html       ← Category/subcategory view
│   │   ├── artist.html         ← Artist profile
│   │   ├── album.html          ← Album detail
│   │   ├── reviews.html        ← Reviews section
│   │   ├── articles.html       ← Articles section
│   │   ├── search.html         ← Search results
│   │   └── auth.html           ← Login / Register
│   └── assets/
│       ├── images/
│       └── icons/
└── mobile/
    ├── index.html              ← Mobile home page
    ├── css/
    │   ├── variables.css       ← Same theme variables
    │   ├── base.css
    │   ├── navbar.css          ← Mobile hamburger nav
    │   ├── splash.css
    │   ├── home.css
    │   ├── category.css
    │   ├── artist.css
    │   ├── album.css
    │   ├── player.css
    │   ├── auth.css
    │   ├── search.css
    │   └── animations.css
    ├── js/
    │   ├── data/
    │   │   ├── music-data.js   ← Same data shape, shared-by-copy
    │   │   └── articles-data.js
    │   ├── auth.js
    │   ├── player.js
    │   ├── search.js
    │   ├── slider.js
    │   ├── animations.js
    │   ├── splash.js
    │   ├── router.js
    │   └── main.js
    ├── pages/
    │   ├── category.html
    │   ├── artist.html
    │   ├── album.html
    │   ├── reviews.html
    │   ├── articles.html
    │   ├── search.html
    │   └── auth.html
    └── assets/
        ├── images/
        └── icons/
```

### Device Detection and Routing

`index.html` at the root performs a one-time redirect:

```html
<script>
  const isMobile = window.innerWidth < 1024;
  window.location.replace(isMobile ? './mobile/index.html' : './desktop/index.html');
</script>
```

Within each version, navigation between pages uses standard `<a href>` links relative to the `pages/` folder. No SPA router is needed; each page is a standalone HTML file that includes the shared navbar and footer via a small `loadComponent()` helper.

---

## Components and Interfaces

### Navbar

Desktop navbar: horizontal bar with logo left, category dropdowns center, search + auth icons right.

Mobile navbar: logo left, hamburger icon right. Tapping hamburger slides in a full-height side drawer with the same links stacked vertically.

```
[Logo]  [Rock ▾] [Jazz ▾] [Pop ▾] [Rap ▾] [Classical ▾]  [New Releases] [Best of Year] [Top Composers] [Reviews]  [🔍] [👤]
```

Each category dropdown contains its subcategories plus a "View All" link pointing to `category.html?genre=rock`.

### Splash Screen

Displayed on `DOMContentLoaded`. Covers the full viewport with a centered logo + animated music note icon. Fades out after a minimum of 1 second (or when `window.onload` fires, whichever is later), capped at 3 seconds.

```
┌─────────────────────────────┐
│                             │
│        🎵 MusicWorld        │
│     [animated pulse ring]   │
│                             │
└─────────────────────────────┘
```

### Music Cards

Reusable card component used for artists, albums, and featured content:

```html
<div class="mw-card" data-id="{id}" data-type="artist|album">
  <div class="mw-card__img">
    <img src="{image}" alt="{name}" loading="lazy">
    <div class="mw-card__overlay">
      <button class="btn-play" aria-label="Play preview">▶</button>
    </div>
  </div>
  <div class="mw-card__body">
    <h3 class="mw-card__title">{name}</h3>
    <p class="mw-card__meta">{genre} · {year}</p>
  </div>
</div>
```

### Sliders (Swiper.js)

Used for: New Releases, Best of Year, Top Composers, Featured Artists per category.

```javascript
// slider.js
function initSlider(containerSelector, options = {}) {
  return new Swiper(containerSelector, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    ...options
  });
}
```

### Music Player

Fixed bottom bar (desktop) / bottom sheet (mobile). UI-only — no real audio. Simulates play/pause/skip/volume with JS state.

```
┌──────────────────────────────────────────────────────────────────┐
│ [Album Art]  Song Title - Artist Name   ◀◀  ▶  ▶▶   🔊 ──●──   │
└──────────────────────────────────────────────────────────────────┘
```

Player state is managed in `player.js` as a plain object; DOM is updated on state change.

### Auth Modal

Login and Register presented as Bootstrap modals triggered from the navbar auth icon. No page navigation required.

Tabs: `Login | Register`

Login form fields: email, password  
Register form fields: username, email, password, confirm password

### Search Bar

Inline search in the navbar expands on click (desktop) or occupies full width (mobile). Results page at `search.html?q={query}`.

---

## Data Models

All data lives in `js/data/music-data.js` as plain JS objects/arrays exported to `window.MusicData`.

### Genre

```javascript
{
  id: "rock",                    // string, URL-safe slug
  name: "Rock",                  // display name
  subcategories: [Subcategory],
  description: "string",
  heroImage: "path/to/image"
}
```

### Subcategory

```javascript
{
  id: "classic-rock",
  name: "Classic Rock",
  genreId: "rock",               // parent genre reference
  description: "string"
}
```

### Artist

```javascript
{
  id: "led-zeppelin",
  name: "Led Zeppelin",
  genreIds: ["rock"],            // array — artist may span genres
  subcategoryIds: ["classic-rock"],
  image: "path/to/image",
  bio: "string",                 // personal details
  achievements: ["string"],      // career achievements list
  albums: ["album-id"],          // references to Album ids
  formedYear: 1968,
  origin: "London, UK"
}
```

### Album

```javascript
{
  id: "led-zeppelin-iv",
  title: "Led Zeppelin IV",
  artistId: "led-zeppelin",
  genreIds: ["rock"],
  releaseDate: "1971-11-08",     // ISO 8601
  coverImage: "path/to/image",
  songs: [Song],
  description: "string",
  isFeatured: false,
  isNewRelease: false,
  isBestOfYear: false
}
```

### Song

```javascript
{
  id: "stairway-to-heaven",
  title: "Stairway to Heaven",
  albumId: "led-zeppelin-iv",
  duration: "8:02",              // display string
  trackNumber: 4
}
```

### Review

```javascript
{
  id: "review-001",
  targetType: "album" | "artist",
  targetId: "led-zeppelin-iv",
  author: "string",
  rating: 5,                     // 1–5
  body: "string",
  date: "2024-01-15"
}
```

### Article

```javascript
// articles-data.js
{
  id: "article-001",
  title: "string",
  category: "history" | "culture" | "gear" | "news",
  author: "string",
  date: "2024-01-15",
  summary: "string",
  body: "string",                // HTML string
  image: "path/to/image"
}
```

### User (localStorage)

```javascript
// stored under key "mw_users" as JSON array
{
  id: "uuid-v4-string",
  username: "string",
  email: "string",
  passwordHash: "string",        // simple btoa hash (simulation only)
  createdAt: "ISO 8601"
}

// current session stored under key "mw_session"
{
  userId: "string",
  username: "string",
  email: "string",
  loggedInAt: "ISO 8601"
}
```

---

## User Authentication Flow (localStorage)

`auth.js` exposes a simple API:

```javascript
const Auth = {
  register(username, email, password) { ... },  // returns { ok, error }
  login(email, password) { ... },               // returns { ok, error }
  logout() { ... },
  currentUser() { ... },                        // returns session or null
  isLoggedIn() { ... }                          // returns boolean
};
```

Flow:

```
Register:
  1. Validate fields (non-empty, email format, passwords match)
  2. Check email not already in mw_users
  3. Push new user object to mw_users array, save to localStorage
  4. Write mw_session, close modal, update navbar UI

Login:
  1. Validate fields
  2. Find user by email in mw_users
  3. Compare passwordHash (btoa of password)
  4. Write mw_session, close modal, update navbar UI

Logout:
  1. Remove mw_session from localStorage
  2. Update navbar UI (show login icon, hide username)

Download guard:
  1. On download button click, call Auth.isLoggedIn()
  2. If false → open auth modal with register tab active + prompt message
  3. If true → simulate download (show "Downloading..." toast)
```

---

## Theme System Design

All colors and spacing tokens live in `css/variables.css` (identical file in both `desktop/css/` and `mobile/css/`):

```css
:root {
  /* Primary palette */
  --color-primary:        #1565C0;   /* deep blue */
  --color-primary-light:  #1E88E5;   /* medium blue */
  --color-primary-dark:   #0D47A1;   /* dark blue */
  --color-accent:         #42A5F5;   /* light blue accent */

  /* Neutrals */
  --color-white:          #FFFFFF;
  --color-off-white:      #F5F8FF;   /* slight blue tint */
  --color-gray-100:       #EEF2F7;
  --color-gray-300:       #B0BEC5;
  --color-gray-600:       #546E7A;
  --color-gray-900:       #1A1A2E;   /* near-black with blue tint */

  /* Semantic */
  --color-bg:             var(--color-off-white);
  --color-surface:        var(--color-white);
  --color-text:           var(--color-gray-900);
  --color-text-muted:     var(--color-gray-600);
  --color-border:         var(--color-gray-100);

  /* Typography */
  --font-family-base:     'Segoe UI', system-ui, sans-serif;
  --font-size-base:       16px;
  --line-height-base:     1.6;

  /* Spacing scale */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   48px;

  /* Radius */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card: 0 2px 12px rgba(21, 101, 192, 0.10);
  --shadow-nav:  0 2px 8px  rgba(21, 101, 192, 0.15);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow:   600ms ease;

  /* Player */
  --player-height-desktop: 72px;
  --player-height-mobile:  64px;
}
```

Bootstrap's default colors are overridden by setting `--bs-primary` to `var(--color-primary)` in `base.css`.

---

## Interactive Elements Design

### Splash Screen (`splash.js`)

```javascript
// Timing: show for min 1s, max 3s, hide when page ready
const MIN_DISPLAY = 1000;
const MAX_DISPLAY = 3000;

function hideSplash(splashEl) {
  splashEl.classList.add('splash--fade-out');
  splashEl.addEventListener('transitionend', () => splashEl.remove(), { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const start = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const delay = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(() => hideSplash(splash), delay);
  });

  // Hard cap at 3 seconds regardless
  setTimeout(() => hideSplash(splash), MAX_DISPLAY);
});
```

### Scroll Animations (`animations.js`)

Uses the Intersection Observer API. Elements with `data-animate` attribute get the `is-visible` class when they enter the viewport.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

CSS in `animations.css`:

```css
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}
```

Animation duration is set to `var(--transition-slow)` = 600ms, well within the 1-second requirement.

### Swiper.js Sliders (`slider.js`)

Three slider configurations used across the site:

| Slider | Location | Slides per view |
|--------|----------|-----------------|
| New Releases | Home | 4 (desktop) / 1.5 (mobile) |
| Best of Year | Home | 4 (desktop) / 1.5 (mobile) |
| Top Composers | Home | 3 (desktop) / 1.2 (mobile) |
| Category Artists | Category page | 5 (desktop) / 2 (mobile) |

---

## Technology Integration Details

| Library | Version | Load method | Purpose |
|---------|---------|-------------|---------|
| Bootstrap | 5.3.x | CDN `<link>` + `<script>` | Grid, modals, dropdowns, utilities |
| Font Awesome | 6.x | CDN `<link>` | Icons throughout |
| Swiper.js | 11.x | CDN `<link>` + `<script>` | Carousels / sliders |

All CDN links are placed in `<head>` (CSS) and before `</body>` (JS). Custom scripts load after library scripts.

Page load order per HTML file:
1. `variables.css` → `base.css` → page-specific CSS
2. Bootstrap CSS → Font Awesome CSS → Swiper CSS
3. `music-data.js` (data) → library JS → `auth.js` → `player.js` → `animations.js` → `slider.js` → `splash.js` → `main.js`


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Every genre has at least one subcategory

*For any* genre object in `MusicData.genres`, its `subcategories` array must have length ≥ 1.

**Validates: Requirements 2.2**

---

### Property 2: Category content filter returns only matching items

*For any* genre or subcategory id, the content filter function applied to the full artist/album dataset must return only items whose `genreIds` or `subcategoryIds` include that id — and must include all such items (no omissions).

**Validates: Requirements 2.3, 2.4, 3.1, 3.2**

---

### Property 3: Artist profile render includes all required fields

*For any* artist object in `MusicData.artists`, the artist profile render function must produce output that contains the artist's bio (personal details), at least one achievement, and at least one album reference.

**Validates: Requirements 4.1, 4.2, 4.3**

---

### Property 4: Album record render includes all required fields

*For any* album object in `MusicData.albums`, the album detail render function must produce output that contains the release date, the artist name, and at least one song title.

**Validates: Requirements 5.1, 5.2, 5.3**

---

### Property 5: Best-of-year albums have a current-year release date

*For any* album in `MusicData.albums` where `isBestOfYear` is `true`, the year portion of `releaseDate` must equal the current calendar year.

**Validates: Requirements 6.4**

---

### Property 6: Every review references a valid target

*For any* review object in `MusicData.reviews`, its `targetId` must correspond to an existing album id (when `targetType === "album"`) or an existing artist id (when `targetType === "artist"`).

**Validates: Requirements 7.3, 7.4**

---

### Property 7: Search returns all and only matching results

*For any* non-empty search query string, the search function applied to the full dataset must return results where every item's artist name, album title, or release date contains the query string (case-insensitive), and no matching item is omitted. For a query that matches nothing, the result set must be empty.

**Validates: Requirements 8.1, 8.2, 8.3, 8.5**

---

### Property 8: Auth registration and login round trip

*For any* valid registration input (non-empty username, valid email, matching passwords), calling `Auth.register()` followed by `Auth.login()` with the same credentials must result in `Auth.isLoggedIn()` returning `true` and `Auth.currentUser()` returning a user object with the matching email.

**Validates: Requirements 9.3, 9.4, 9.5**

---

### Property 9: Download access control

*For any* album, the download guard function must return `true` (allow) when `Auth.isLoggedIn()` is `true`, and must return `false` (deny) when `Auth.isLoggedIn()` is `false`.

**Validates: Requirements 10.1, 10.2**

---

### Property 10: Streaming is available to all users regardless of auth state

*For any* album and any auth state (logged in or not), the player's `canPlay()` function must return `true`.

**Validates: Requirements 11.1, 11.2**

---

### Property 11: Article list render includes all articles

*For any* articles dataset, the article list render function must produce exactly one list item per article in the dataset, and the article detail render function must include the full `body` content for any given article.

**Validates: Requirements 12.2, 12.3**

---

### Property 12: Scroll animation elements receive visible class on intersection

*For any* element with the `data-animate` attribute, after the IntersectionObserver callback fires with `isIntersecting: true`, the element must have the `is-visible` class added.

**Validates: Requirements 14.2**

---

### Property 13: Animation transition duration does not exceed 1 second

*For any* element with the `data-animate` attribute, the computed CSS `transition-duration` must be ≤ 1000ms.

**Validates: Requirements 14.4**

---

### Property 14: Splash screen display duration is bounded

*For any* page load time, the splash screen hide function must not be called before `MIN_DISPLAY` (1000ms) has elapsed since `DOMContentLoaded`, and must always be called by `MAX_DISPLAY` (3000ms) regardless of load state.

**Validates: Requirements 15.3**

---

### Property 15: Device detection routes to correct version

*For any* `window.innerWidth` value ≥ 1024, the entry-point redirect must target `./desktop/index.html`. For any value < 1024, it must target `./mobile/index.html`.

**Validates: Requirements 16.3, 16.4**

---

### Property 16: HTML files use semantic elements

*For any* HTML file in the project, the document must contain at least one each of `<header>`, `<nav>`, `<main>`, and `<footer>` elements.

**Validates: Requirements 17.3**

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| Registration with duplicate email | `Auth.register()` returns `{ ok: false, error: "Email already registered" }`; form shows inline error |
| Login with wrong credentials | `Auth.login()` returns `{ ok: false, error: "Invalid email or password" }`; form shows inline error |
| Registration with mismatched passwords | Client-side validation before calling `Auth.register()`; inline error shown |
| Search with empty query | Search function returns empty array; UI shows prompt to enter a search term |
| Data lookup for unknown id | Filter/render functions return `null`; page shows "Content not found" message |
| localStorage unavailable | `Auth` methods catch `SecurityError` and fall back to in-memory session (no persistence) |
| Swiper.js fails to initialize | `slider.js` wraps `new Swiper()` in try/catch; falls back to plain scrollable container |
| Image load failure | All `<img>` tags include `onerror` fallback to a placeholder image |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- Unit tests catch concrete bugs in specific scenarios and edge cases
- Property-based tests verify general correctness across the full input space

### Unit Tests (specific examples and edge cases)

Focus areas:
- Navbar renders all 5 genre links (Requirement 1.1)
- Navbar contains New Releases, Best of Year, Top Composers, Reviews links (Requirements 1.2, 1.3)
- Home page contains new releases, best of year, top composers sections (Requirements 6.1–6.3)
- Auth modal contains login and register tabs (Requirements 9.1, 9.2)
- Player exposes play, pause, skip, volume controls (Requirement 11.4)
- Articles section renders on navigation (Requirement 12.1)
- CSS variables file defines `--color-primary` as blue and `--color-white` as white (Requirement 13.1)
- Font Awesome and Bootstrap 5 CDN links present in HTML (Requirements 13.5, 13.6)
- Swiper.js CDN link present and slider containers have `.swiper` class (Requirement 14.1)
- Splash screen is visible on DOMContentLoaded (Requirement 15.1)
- Splash screen gets fade-out class after hide timer fires (Requirement 15.2)
- Splash screen CSS uses CSS variables (Requirement 15.4)
- Download attempt by non-logged-in user triggers auth modal (Requirement 10.3)
- Search with no-match query shows no-results message (Requirement 8.5)
- `desktop/` and `mobile/` folder structures exist with expected files (Requirement 17.1)
- Multiple CSS and JS files exist per version (Requirements 17.4, 17.5)

### Property-Based Tests

Library: **fast-check** (JavaScript) — loaded as a dev dependency or via CDN in test environment.

Each property test runs a minimum of **100 iterations**.

Each test is tagged with a comment in the format:
`// Feature: music-world-website, Property {N}: {property_text}`

| Property | Test description | fast-check arbitraries |
|----------|-----------------|----------------------|
| P1 | Every genre has ≥1 subcategory | `fc.constantFrom(...MusicData.genres)` |
| P2 | Content filter returns only matching items | `fc.constantFrom(...genreIds)`, `fc.constantFrom(...subcategoryIds)` |
| P3 | Artist profile render includes all required fields | `fc.constantFrom(...MusicData.artists)` |
| P4 | Album record render includes all required fields | `fc.constantFrom(...MusicData.albums)` |
| P5 | Best-of-year albums have current-year release date | `fc.constantFrom(...MusicData.albums.filter(a => a.isBestOfYear))` |
| P6 | Every review references a valid target | `fc.constantFrom(...MusicData.reviews)` |
| P7 | Search returns all and only matching results | `fc.string({ minLength: 1 })` for query |
| P8 | Auth registration and login round trip | `fc.record({ username: fc.string(), email: fc.emailAddress(), password: fc.string({ minLength: 6 }) })` |
| P9 | Download access control | `fc.boolean()` for auth state, `fc.constantFrom(...MusicData.albums)` |
| P10 | Streaming available to all users | `fc.boolean()` for auth state, `fc.constantFrom(...MusicData.albums)` |
| P11 | Article list render includes all articles | `fc.array(fc.record({ id: fc.uuid(), title: fc.string(), body: fc.string() }))` |
| P12 | Scroll animation elements receive visible class | `fc.array(fc.record({ animate: fc.boolean() }))` for element set |
| P13 | Animation transition duration ≤ 1000ms | `fc.constantFrom(...animatedElements)` |
| P14 | Splash screen duration bounded [1000, 3000]ms | `fc.integer({ min: 0, max: 5000 })` for simulated load time |
| P15 | Device detection routes correctly | `fc.integer({ min: 0, max: 2560 })` for window.innerWidth |
| P16 | HTML files use semantic elements | `fc.constantFrom(...htmlFiles)` |

### Test File Organization

```
tests/
├── unit/
│   ├── navbar.test.js
│   ├── auth.test.js
│   ├── player.test.js
│   ├── search.test.js
│   ├── splash.test.js
│   └── structure.test.js
└── property/
    ├── data.property.test.js      (P1, P2, P5, P6)
    ├── render.property.test.js    (P3, P4, P11)
    ├── auth.property.test.js      (P8, P9, P10)
    ├── search.property.test.js    (P7)
    ├── animations.property.test.js (P12, P13, P14)
    ├── routing.property.test.js   (P15)
    └── structure.property.test.js (P16)
```
