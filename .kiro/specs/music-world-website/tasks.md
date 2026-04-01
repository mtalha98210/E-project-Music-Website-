# Implementation Plan: MusicWorld Website

## Overview

Pure frontend HTML5/CSS3/JavaScript website split into `desktop/` and `mobile/` codebases, with a root `index.html` device-detection entry point. Bootstrap 5, Font Awesome, and Swiper.js loaded via CDN. Auth simulated with localStorage. No build tools required.

## Tasks

- [x] 1. Set up project folder structure
  - Create `desktop/` and `mobile/` trees: `css/`, `js/data/`, `pages/`, `assets/images/`, `assets/icons/`
  - Create all empty placeholder files so later tasks can fill them in
  - _Requirements: 17.1_

- [x] 2. Implement CSS variables and base styles
  - [x] 2.1 Create `desktop/css/variables.css` and `mobile/css/variables.css` with all CSS custom properties from the design (colors, spacing, radius, shadows, transitions, player heights)
    - _Requirements: 13.1, 13.2, 13.3_
  - [x] 2.2 Create `desktop/css/base.css` and `mobile/css/base.css` with reset, typography, utility classes, and Bootstrap primary color override (`--bs-primary`)
    - _Requirements: 13.6, 17.4_

- [x] 3. Create data files
  - [x] 3.1 Create `desktop/js/data/music-data.js` (and copy to `mobile/js/data/`) exposing `window.MusicData` with genres (Rock, Jazz, Pop, Rap, Classical), subcategories, artists, albums (with songs), and reviews — include at least 2 artists and 2 albums per genre, mark some albums as `isNewRelease`, `isBestOfYear`, `isFeatured`
    - _Requirements: 2.1, 2.2, 6.1, 6.2, 6.3_
  - [x] 3.2 Create `desktop/js/data/articles-data.js` (and copy to `mobile/js/data/`) exposing `window.ArticlesData` with at least 5 sample articles across categories (history, culture, gear, news)
    - _Requirements: 12.1, 12.2_
  - [ ]* 3.3 Write property test for data integrity (P1, P5, P6)
    - **Property 1: Every genre has at least one subcategory**
    - **Property 5: Best-of-year albums have a current-year release date**
    - **Property 6: Every review references a valid target**
    - **Validates: Requirements 2.2, 6.4, 7.4**

- [x] 4. Create root entry point with device detection
  - Create root `index.html` with inline script that reads `window.innerWidth` and calls `window.location.replace()` to `./desktop/index.html` or `./mobile/index.html`
  - _Requirements: 16.1, 16.2, 16.3, 16.4_
  - [ ]* 4.1 Write property test for device detection routing (P15)
    - **Property 15: Device detection routes to correct version**
    - **Validates: Requirements 16.3, 16.4**

- [x] 5. Implement desktop navbar
  - [x] 5.1 Create `desktop/css/navbar.css` with horizontal bar styles: logo left, category dropdowns center, search + auth icons right, shadow token
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6_
  - [x] 5.2 Create `desktop/pages/navbar.html` as an includable fragment with Bootstrap dropdown menus for all 5 genres (each with subcategory links + "View All" → `category.html?genre={id}`), New Releases, Best of Year, Top Composers, Reviews links, search icon, and auth icon
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 5.3 Write unit tests for desktop navbar
    - Verify all 5 genre links present
    - Verify New Releases, Best of Year, Top Composers, Reviews links present
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 6. Implement mobile navbar
  - [x] 6.1 Create `mobile/css/navbar.css` with logo-left / hamburger-right layout and full-height side drawer styles
    - _Requirements: 1.5_
  - [x] 6.2 Create `mobile/pages/navbar.html` fragment with hamburger button, side drawer containing stacked genre links and all nav links, and inline JS to toggle drawer open/close
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 7. Implement component loader utility
  - Create `desktop/js/main.js` and `mobile/js/main.js` with a `loadComponent(selector, url)` async helper that fetches an HTML fragment and injects it into the matching element; call it for navbar and footer on every page
  - _Requirements: 17.2_

- [x] 8. Implement splash screen
  - [x] 8.1 Create `desktop/css/splash.css` and `mobile/css/splash.css` with full-viewport overlay, centered logo + animated pulse ring, fade-out transition using CSS variables
    - _Requirements: 15.1, 15.4_
  - [x] 8.2 Create `desktop/js/splash.js` and `mobile/js/splash.js` implementing the timing logic: `MIN_DISPLAY = 1000ms`, `MAX_DISPLAY = 3000ms`, hide on `window.load` (respecting min delay) or hard cap
    - _Requirements: 15.1, 15.2, 15.3_
  - [ ]* 8.3 Write property test for splash screen timing (P14)
    - **Property 14: Splash screen display duration is bounded [1000, 3000]ms**
    - **Validates: Requirements 15.3**

- [x] 9. Implement scroll animations
  - [x] 9.1 Create `desktop/css/animations.css` and `mobile/css/animations.css` with `[data-animate]` initial state (opacity 0, translateY 20px), `.is-visible` final state, `transition: var(--transition-slow)`, and `prefers-reduced-motion` override
    - _Requirements: 14.2, 14.3, 14.4_
  - [x] 9.2 Create `desktop/js/animations.js` and `mobile/js/animations.js` using IntersectionObserver (threshold 0.15) to add `is-visible` class to `[data-animate]` elements on intersection, unobserving after first trigger
    - _Requirements: 14.2_
  - [ ]* 9.3 Write property tests for scroll animations (P12, P13)
    - **Property 12: Scroll animation elements receive visible class on intersection**
    - **Property 13: Animation transition duration does not exceed 1000ms**
    - **Validates: Requirements 14.2, 14.4**

- [x] 10. Implement Swiper.js slider initialization
  - Create `desktop/js/slider.js` and `mobile/js/slider.js` with `initSlider(containerSelector, options)` wrapper around `new Swiper()` inside a try/catch (fallback to plain scrollable container), and export named configs for New Releases (4/1.5 slides), Best of Year (4/1.5), Top Composers (3/1.2), Category Artists (5/2)
  - _Requirements: 14.1, 18.6_

- [x] 11. Implement auth module
  - [x] 11.1 Create `desktop/js/auth.js` and `mobile/js/auth.js` exposing `window.Auth` with `register()`, `login()`, `logout()`, `currentUser()`, `isLoggedIn()` using localStorage keys `mw_users` and `mw_session`; include `SecurityError` catch with in-memory fallback; use `btoa` for password hashing
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  - [ ]* 11.2 Write property test for auth round trip and access control (P8, P9, P10)
    - **Property 8: Auth registration and login round trip**
    - **Property 9: Download access control**
    - **Property 10: Streaming available to all users**
    - **Validates: Requirements 9.3, 9.4, 9.5, 10.1, 10.2, 11.1, 11.2**
  - [ ]* 11.3 Write unit tests for auth module
    - Test duplicate email registration returns error
    - Test wrong credentials login returns error
    - Test logout clears session
    - _Requirements: 9.3, 9.4, 9.5_

- [x] 12. Implement music player bar
  - [x] 12.1 Create `desktop/css/player.css` with fixed bottom bar (height `var(--player-height-desktop)`) and `mobile/css/player.css` with bottom sheet (height `var(--player-height-mobile)`)
    - _Requirements: 11.4_
  - [x] 12.2 Create `desktop/js/player.js` and `mobile/js/player.js` with plain-object state (`currentTrack`, `isPlaying`, `volume`), `play()`, `pause()`, `skip()`, `setVolume()` methods that update DOM, and `canPlay()` always returning `true`
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  - [x] 12.3 Add player bar HTML markup to `desktop/index.html` and `mobile/index.html` (album art placeholder, song title, artist name, prev/play/next buttons, volume slider)
    - _Requirements: 11.4_
  - [ ]* 12.4 Write unit tests for player controls
    - Verify play, pause, skip, volume controls exist in DOM
    - Verify `canPlay()` returns true regardless of auth state
    - _Requirements: 11.1, 11.2, 11.4_

- [x] 13. Implement desktop home page
  - [x] 13.1 Create `desktop/index.html` with semantic structure (`<header>`, `<nav>`, `<main>`, `<footer>`), Bootstrap 5 + Font Awesome + Swiper.js CDN links, hero section, New Releases Swiper container, Best of Year Swiper container, Top Composers Swiper container; load scripts in correct order (variables → base → page CSS, then data → libs → auth → player → animations → slider → splash → main JS)
    - _Requirements: 6.1, 6.2, 6.3, 13.4, 13.5, 13.6, 17.3, 18.1, 18.2, 18.3, 18.4, 18.5_
  - [x] 13.2 Create `desktop/css/home.css` with hero section, section headings, and card grid styles
    - _Requirements: 13.3_
  - [x] 13.3 Populate home page sliders dynamically in `desktop/js/main.js` by reading `MusicData.albums` filtered by `isNewRelease`, `isBestOfYear`, and `isFeatured` flags, rendering `.mw-card` elements into each Swiper wrapper
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ]* 13.4 Write unit tests for home page sections
    - Verify new releases, best of year, top composers sections exist in DOM
    - Verify Swiper CDN link and `.swiper` containers present
    - _Requirements: 6.1, 6.2, 6.3, 14.1_

- [x] 14. Implement mobile home page
  - Create `mobile/index.html` mirroring desktop structure but with mobile-optimized layout (single-column, touch-friendly Swiper configs 1.5/1.2 slides), same CDN links and script load order
  - _Requirements: 16.2, 16.5_

- [x] 15. Implement category page (desktop and mobile)
  - [x] 15.1 Create `desktop/pages/category.html` and `mobile/pages/category.html` with semantic structure; read `?genre=` query param to filter `MusicData` and render: genre hero, subcategory tabs, artists Swiper, albums grid, instruments section, events section; add `data-animate` to content sections
    - _Requirements: 2.3, 2.4, 3.1, 3.2, 3.3, 3.4_
  - [x] 15.2 Create `desktop/css/category.css` and `mobile/css/category.css` with subcategory tab styles, artist/album grid, instruments and events layout
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ]* 15.3 Write property test for category content filter (P2)
    - **Property 2: Category content filter returns only matching items**
    - **Validates: Requirements 2.3, 2.4, 3.1, 3.2**

- [x] 16. Implement artist profile page (desktop and mobile)
  - [x] 16.1 Create `desktop/pages/artist.html` and `mobile/pages/artist.html`; read `?id=` param, look up artist in `MusicData.artists`, render: bio, achievements list, albums collection with download button (guarded by `Auth.isLoggedIn()`); add `data-animate` attributes
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 10.1, 10.2, 10.3_
  - [x] 16.2 Create `desktop/css/artist.css` and `mobile/css/artist.css`
    - _Requirements: 13.3_
  - [ ]* 16.3 Write property test for artist profile render (P3)
    - **Property 3: Artist profile render includes all required fields**
    - **Validates: Requirements 4.1, 4.2, 4.3**

- [x] 17. Implement album detail page (desktop and mobile)
  - [x] 17.1 Create `desktop/pages/album.html` and `mobile/pages/album.html`; read `?id=` param, look up album in `MusicData.albums`, render: cover image, release date, artist name (linked to artist page), songs tracklist, download button with auth guard, play button wired to `player.js`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 10.1, 10.2, 10.3, 11.3_
  - [x] 17.2 Create `desktop/css/album.css` and `mobile/css/album.css`
    - _Requirements: 13.3_
  - [ ]* 17.3 Write property test for album record render (P4)
    - **Property 4: Album record render includes all required fields**
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [x] 18. Implement reviews page (desktop and mobile)
  - [x] 18.1 Create `desktop/pages/reviews.html` and `mobile/pages/reviews.html`; render all reviews from `MusicData.reviews`, each card showing rating stars, author, date, body, and a link to the target album or artist page
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [x] 18.2 Create `desktop/css/` and `mobile/css/` review card styles (reuse `.mw-card` base)
    - _Requirements: 13.3_

- [x] 19. Implement articles page (desktop and mobile)
  - [x] 19.1 Create `desktop/pages/articles.html` and `mobile/pages/articles.html`; render article cards from `ArticlesData` (title, category badge, author, date, summary, read-more link); clicking a card expands or navigates to full `body` content
    - _Requirements: 12.1, 12.2, 12.3_
  - [ ]* 19.2 Write property test for article list render (P11)
    - **Property 11: Article list render includes all articles**
    - **Validates: Requirements 12.2, 12.3**

- [x] 20. Implement search functionality
  - [x] 20.1 Create `desktop/js/search.js` and `mobile/js/search.js` with a `search(query)` function that filters `MusicData.artists` (by name), `MusicData.albums` (by title and release date) case-insensitively and returns combined results; empty query returns `[]`
    - _Requirements: 8.1, 8.2, 8.3, 8.5_
  - [x] 20.2 Create `desktop/pages/search.html` and `mobile/pages/search.html`; read `?q=` param, call `search()`, render results grouped by type; show "No results found" message when result set is empty; wire navbar search input to redirect to `search.html?q={query}`
    - _Requirements: 8.4, 8.5_
  - [x] 20.3 Create `desktop/css/search.css` and `mobile/css/search.css`
    - _Requirements: 13.3_
  - [ ]* 20.4 Write property test for search correctness (P7)
    - **Property 7: Search returns all and only matching results**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.5**
  - [ ]* 20.5 Write unit tests for search edge cases
    - Empty query returns empty array
    - No-match query shows no-results message in DOM
    - _Requirements: 8.5_

- [x] 21. Implement auth modal
  - [x] 21.1 Create `desktop/css/auth.css` and `mobile/css/auth.css` for modal tab styles and form layout
    - _Requirements: 9.1, 9.2_
  - [x] 21.2 Add Bootstrap modal markup to both `desktop/index.html` and `mobile/index.html` with Login and Register tabs; wire form submissions to `Auth.register()` / `Auth.login()`; show inline errors on failure; update navbar UI (show username / hide login icon) on success; wire download buttons to check `Auth.isLoggedIn()` and open modal with register tab if not logged in
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 10.2, 10.3_
  - [ ]* 21.3 Write unit tests for auth modal
    - Verify modal contains login and register tabs
    - Verify download attempt by non-logged-in user opens auth modal
    - _Requirements: 9.1, 9.2, 10.3_

- [ ] 22. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 23. Set up test infrastructure and write all property-based tests
  - [ ] 23.1 Create `tests/` directory with `unit/` and `property/` subdirectories; add `package.json` with `vitest` and `fast-check` dev dependencies; configure `vitest.config.js` for jsdom environment
    - _Requirements: 17.5_
  - [ ] 23.2 Create `tests/property/data.property.test.js` implementing P1, P5, P6 using `fc.constantFrom` over `MusicData` arrays
    - **Property 1, 5, 6 — Validates: Requirements 2.2, 6.4, 7.4**
  - [ ] 23.3 Create `tests/property/render.property.test.js` implementing P3, P4, P11
    - **Property 3, 4, 11 — Validates: Requirements 4.1–4.3, 5.1–5.3, 12.2–12.3**
  - [ ] 23.4 Create `tests/property/auth.property.test.js` implementing P8, P9, P10
    - **Property 8, 9, 10 — Validates: Requirements 9.3–9.5, 10.1–10.2, 11.1–11.2**
  - [ ] 23.5 Create `tests/property/search.property.test.js` implementing P7
    - **Property 7 — Validates: Requirements 8.1–8.3, 8.5**
  - [ ] 23.6 Create `tests/property/animations.property.test.js` implementing P12, P13, P14
    - **Property 12, 13, 14 — Validates: Requirements 14.2, 14.4, 15.3**
  - [ ] 23.7 Create `tests/property/routing.property.test.js` implementing P15
    - **Property 15 — Validates: Requirements 16.3, 16.4**
  - [ ] 23.8 Create `tests/property/structure.property.test.js` implementing P16
    - **Property 16: HTML files use semantic elements**
    - **Validates: Requirements 17.3**
  - [ ] 23.9 Create `tests/unit/` test files: `navbar.test.js`, `auth.test.js`, `player.test.js`, `search.test.js`, `splash.test.js`, `structure.test.js` covering all unit test focus areas from the design

- [x] 24. Final integration and wiring
  - [x] 24.1 Ensure every HTML page (desktop and mobile) loads scripts in the correct order: `variables.css` → `base.css` → page CSS → Bootstrap/FA/Swiper CDN → `music-data.js` → `articles-data.js` → `auth.js` → `player.js` → `animations.js` → `slider.js` → `splash.js` → `main.js`
    - _Requirements: 17.1, 17.4, 17.5_
  - [x] 24.2 Verify all inter-page links work: navbar genre dropdowns → `category.html?genre=`, artist cards → `artist.html?id=`, album cards → `album.html?id=`, search form → `search.html?q=`
    - _Requirements: 2.3, 4.4, 5.4_
  - [x] 24.3 Add `onerror` fallback to placeholder image on all `<img>` tags; wrap all `new Swiper()` calls in try/catch per design error handling spec
    - _Requirements: 17.2_

- [ ] 25. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with minimum 100 iterations each
- Desktop and mobile share the same data shape — copy data files rather than symlinking (no build tools)
- All CDN libraries (Bootstrap 5.3, Font Awesome 6, Swiper 11) are loaded via `<link>`/`<script>` tags — no npm install needed for the site itself
