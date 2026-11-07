# AGENTS.md — Company Website (IoT, Software Solutions & Game Development)

> This document is the single source of truth for the coding agent building this project.
> Read it fully before writing any code. Follow it strictly. If something is ambiguous, choose the simplest option that satisfies the requirements and note the assumption in `docs/DECISIONS.md`.

---

## 1. Project Overview

Build a professional, fast, SEO-friendly marketing website for a company that offers:

1. **IoT solutions** (hardware, firmware, connectivity, dashboards)
2. **Software solutions** (custom software, web/mobile apps, integrations)
3. **Game development** (original games and game dev services)

### Core requirement: data-driven content

**Every piece of page content must come from JSON files**, so the owner can add or edit products, games, blog posts, prices, FAQs, and so on without touching React code. Components render data; they do not hardcode copy.

### Pages required

| Route | Purpose |
|---|---|
| `/` | Home / landing page |
| `/about` | Company story, mission, values, team, timeline |
| `/products` | Product listing (IoT + software), filterable by category |
| `/products/[slug]` | Individual product detail page |
| `/games` | Game listing, filterable by platform/genre/status |
| `/games/[slug]` | Individual game detail page |
| `/blog` | Blog listing with category filter and search |
| `/blog/[slug]` | Individual blog post |
| `/pricing` | Pricing plans, comparison table, FAQ |
| `/contact` | Contact form, company details, map/locations |
| `/support` | Support hub: channels, FAQ, docs links, support request form |

Also required: custom `404` page, `sitemap.xml`, `robots.txt`, favicon/OG images, and a shared header/footer.

---

## 2. Tech Stack (mandatory)

| Concern | Choice |
|---|---|
| Framework | **Next.js** (latest stable, **App Router**, `src/` directory) |
| UI library | **React** (latest stable compatible with Next.js) |
| Language | **TypeScript** (`strict: true`, no `any`) |
| Package manager | **pnpm** (never use npm or yarn; commit `pnpm-lock.yaml`) |
| Styling | **Tailwind CSS** (latest stable; configure per its official Next.js guide) |
| Linting | **ESLint** (flat config, `eslint-config-next` with TypeScript rules) |
| Data | **JSON files** in `src/data/` |

### Allowed supporting dependencies (keep minimal)

- `zod` — validate JSON data at build time/runtime.
- `clsx` + `tailwind-merge` — conditional class names (`cn()` helper).
- `lucide-react` — icons.
- `next-themes` — dark/light mode (optional but recommended).
- `prettier` + `prettier-plugin-tailwindcss` — formatting.
- `react-hook-form` + `@hookform/resolvers` — forms (optional; plain controlled forms with zod are acceptable).

Do **not** add a CMS, database, ORM, UI kit (MUI, Chakra, etc.), or state library (Redux, Zustand) unless the owner requests it. Do not add dependencies without a short justification in `docs/DECISIONS.md`.

---

## 3. Setup Instructions

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
pnpm add zod clsx tailwind-merge lucide-react next-themes
pnpm add -D prettier prettier-plugin-tailwindcss
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit",
    "validate:data": "tsx scripts/validate-data.ts",
    "format": "prettier --write ."
  }
}
```

Also add `tsx` as a dev dependency for the data validation script. Set `"engines": { "node": ">=20" }` and `"packageManager"` for pnpm.

---

## 4. Project Structure

```
.
├── AGENTS.md
├── docs/
│   └── DECISIONS.md
├── public/
│   ├── images/              # all static images, organised by section
│   │   ├── products/
│   │   ├── games/
│   │   ├── blog/
│   │   ├── team/
│   │   └── brand/
│   ├── robots.txt           # or generate via app/robots.ts
│   └── favicon.ico
├── scripts/
│   └── validate-data.ts     # validates every JSON file against its zod schema
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Home
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── about/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── games/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── support/page.tsx
│   │   └── api/
│   │       ├── contact/route.ts
│   │       └── support/route.ts
│   ├── components/
│   │   ├── layout/        # Header, Footer, MobileNav, ThemeToggle
│   │   ├── ui/            # Button, Card, Badge, Container, Section, Input, Accordion, Tabs...
│   │   ├── sections/      # Hero, FeatureGrid, ProductGrid, GameGrid, Testimonials, CTA, StatsBar...
│   │   ├── blog/          # PostCard, PostBody, PostMeta, BlogFilters
│   │   ├── products/      # ProductCard, ProductFilters, SpecTable
│   │   ├── games/         # GameCard, GameFilters, PlatformBadges, MediaGallery
│   │   ├── pricing/       # PricingCard, BillingToggle, ComparisonTable
│   │   └── forms/         # ContactForm, SupportForm
│   ├── data/              # ★ ALL EDITABLE CONTENT LIVES HERE ★
│   │   ├── site.json
│   │   ├── navigation.json
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── products.json
│   │   ├── games.json
│   │   ├── blog.json
│   │   ├── pricing.json
│   │   ├── contact.json
│   │   └── support.json
│   ├── lib/
│   │   ├── data.ts        # typed loaders (the ONLY place that imports JSON)
│   │   ├── schemas.ts     # zod schemas (source of truth for types)
│   │   ├── seo.ts         # metadata helpers
│   │   ├── utils.ts       # cn(), formatDate(), formatPrice(), slugify()
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts       # z.infer<> exports
│   └── styles/
│       └── globals.css
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── prettier.config.mjs
├── tsconfig.json
└── package.json
```

---

## 5. Data Architecture (most important section)

### 5.1 Rules

1. **All content is JSON** in `src/data/`. No marketing copy, prices, links, or lists hardcoded in components.
2. **Only `src/lib/data.ts` imports JSON files.** Pages and components call typed loader functions such as `getProducts()`, `getProductBySlug(slug)`, `getPublishedPosts()`.
3. **Every JSON file has a zod schema** in `src/lib/schemas.ts`. Loaders parse with zod; invalid data must fail the build with a clear message (file name, path to bad field, reason).
4. **Types are inferred from zod** (`z.infer`) and exported from `src/types/index.ts`. Never hand-write duplicate types.
5. **Slugs are the stable identifiers** for products, games, and posts. Slugs must be unique (validate this) and URL-safe (`^[a-z0-9]+(?:-[a-z0-9]+)*$`).
6. **Images are referenced by path** relative to `/public` (e.g. `"/images/products/smart-hub.webp"`). Every image field has a companion `alt` string.
7. **Dates** are ISO 8601 strings (`"2026-03-15"`).
8. **Draft/visibility control:** items support `"published": true|false`. Unpublished items are excluded from listings, sitemap, and static params.
9. **Ordering:** items support an optional numeric `order`; loaders sort by `order` ascending, then by date or name as a fallback.
10. Provide `docs/CONTENT_GUIDE.md` explaining, with examples, how the owner adds a product, game, blog post, pricing plan, FAQ, and nav link.

### 5.2 Data validation script

`scripts/validate-data.ts` loads every JSON file, validates against its schema, checks slug uniqueness and that referenced image files exist in `/public`, and checks that cross-references resolve (e.g. a blog post's `relatedProducts` slugs exist). Run it in `pnpm build` via a `prebuild` script. Exit non-zero on failure.

### 5.3 File schemas (reference; implement as zod)

#### `site.json`: global settings

```json
{
  "name": "Acme Technologies",
  "tagline": "Connected devices. Smart software. Unforgettable games.",
  "description": "We build IoT platforms, custom software, and original games.",
  "url": "https://www.example.com",
  "logo": { "light": "/images/brand/logo-light.svg", "dark": "/images/brand/logo-dark.svg", "alt": "Acme logo" },
  "ogImage": "/images/brand/og-default.png",
  "contactEmail": "hello@example.com",
  "supportEmail": "support@example.com",
  "phone": "+91 00000 00000",
  "address": { "line1": "", "city": "Coimbatore", "state": "Tamil Nadu", "country": "India", "postalCode": "" },
  "social": [
    { "platform": "github", "url": "https://github.com/acme" },
    { "platform": "linkedin", "url": "https://linkedin.com/company/acme" },
    { "platform": "youtube", "url": "https://youtube.com/@acme" },
    { "platform": "x", "url": "https://x.com/acme" }
  ],
  "footer": { "copyright": "© {year} Acme Technologies. All rights reserved.", "legalLinks": [
    { "label": "Privacy Policy", "href": "/privacy" },
    { "label": "Terms of Service", "href": "/terms" }
  ]}
}
```

#### `navigation.json`

```json
{
  "header": [
    { "label": "Products", "href": "/products" },
    { "label": "Games", "href": "/games" },
    { "label": "Pricing", "href": "/pricing" },
    { "label": "Blog", "href": "/blog" },
    { "label": "About", "href": "/about" },
    { "label": "Support", "href": "/support" }
  ],
  "headerCta": { "label": "Contact Us", "href": "/contact" },
  "footerColumns": [
    { "title": "Company", "links": [{ "label": "About", "href": "/about" }, { "label": "Blog", "href": "/blog" }, { "label": "Contact", "href": "/contact" }] },
    { "title": "Offerings", "links": [{ "label": "Products", "href": "/products" }, { "label": "Games", "href": "/games" }, { "label": "Pricing", "href": "/pricing" }] },
    { "title": "Help", "links": [{ "label": "Support", "href": "/support" }] }
  ]
}
```

#### `home.json`: landing page sections

```json
{
  "seo": { "title": "Acme Technologies | IoT, Software & Games", "description": "..." },
  "hero": {
    "eyebrow": "IoT · Software · Games",
    "headline": "We build the things that connect, compute, and play.",
    "subheadline": "…",
    "primaryCta": { "label": "Explore Products", "href": "/products" },
    "secondaryCta": { "label": "See Our Games", "href": "/games" },
    "image": { "src": "/images/brand/hero.webp", "alt": "…" }
  },
  "stats": [ { "value": "120+", "label": "Projects delivered" } ],
  "services": [
    { "id": "iot", "icon": "cpu", "title": "IoT Solutions", "description": "…", "href": "/products?category=iot", "features": ["Firmware", "Cloud dashboards", "Edge analytics"] }
  ],
  "featured": { "productSlugs": ["smart-hub"], "gameSlugs": ["neon-drift"], "postSlugs": ["intro-to-mqtt"] },
  "process": [ { "step": 1, "title": "Discover", "description": "…" } ],
  "testimonials": [ { "quote": "…", "author": "Jane Doe", "role": "CTO", "company": "Foo Inc", "avatar": "/images/team/jane.webp" } ],
  "clients": [ { "name": "Foo Inc", "logo": "/images/brand/clients/foo.svg" } ],
  "finalCta": { "headline": "Ready to build something great?", "description": "…", "cta": { "label": "Get in touch", "href": "/contact" } }
}
```

`featured.*Slugs` reference items in the other files; resolve them via loaders.

#### `about.json`

Fields: `seo`, `intro` (headline, body paragraphs array), `mission`, `vision`, `values[]` (icon, title, description), `timeline[]` (year, title, description), `team[]` (name, role, bio, photo, links[]), `stats[]`, `cta`.

#### `products.json`

```json
{
  "seo": { "title": "Products", "description": "…" },
  "categories": [
    { "id": "iot", "label": "IoT" },
    { "id": "software", "label": "Software" }
  ],
  "items": [
    {
      "slug": "smart-hub",
      "name": "Smart Hub",
      "category": "iot",
      "tagline": "One gateway for every sensor.",
      "summary": "Short description for cards (≤ 160 chars).",
      "description": ["Paragraph 1", "Paragraph 2"],
      "image": { "src": "/images/products/smart-hub.webp", "alt": "Smart Hub device" },
      "gallery": [ { "src": "/images/products/smart-hub-2.webp", "alt": "…" } ],
      "features": [ { "icon": "wifi", "title": "Multi-protocol", "description": "Wi-Fi, BLE, LoRa, Zigbee." } ],
      "specs": [ { "group": "Hardware", "items": [ { "label": "CPU", "value": "ARM Cortex-M33" } ] } ],
      "useCases": ["Smart factory", "Agriculture"],
      "pricingPlanIds": ["starter", "pro"],
      "downloads": [ { "label": "Datasheet (PDF)", "href": "/downloads/smart-hub.pdf" } ],
      "status": "available",
      "tags": ["gateway", "mqtt"],
      "featured": true,
      "published": true,
      "order": 1
    }
  ]
}
```

`status` enum: `available | beta | coming-soon | discontinued`.

#### `games.json`

```json
{
  "seo": { "title": "Games", "description": "…" },
  "genres": [ { "id": "racing", "label": "Racing" } ],
  "platforms": [ { "id": "pc", "label": "PC", "icon": "monitor" }, { "id": "android", "label": "Android", "icon": "smartphone" } ],
  "items": [
    {
      "slug": "neon-drift",
      "title": "Neon Drift",
      "tagline": "Drift through a cyberpunk city.",
      "summary": "Card description.",
      "description": ["Paragraph 1", "Paragraph 2"],
      "genres": ["racing"],
      "platforms": ["pc", "android"],
      "status": "released",
      "releaseDate": "2026-05-20",
      "cover": { "src": "/images/games/neon-drift-cover.webp", "alt": "…" },
      "banner": { "src": "/images/games/neon-drift-banner.webp", "alt": "…" },
      "screenshots": [ { "src": "…", "alt": "…" } ],
      "trailer": { "provider": "youtube", "id": "VIDEO_ID" },
      "features": ["60 FPS", "Online leaderboards"],
      "engine": "Unity",
      "storeLinks": [ { "platform": "steam", "label": "Get on Steam", "href": "https://store.steampowered.com/…" } ],
      "systemRequirements": { "minimum": { "OS": "Windows 10", "RAM": "8 GB" }, "recommended": { "OS": "Windows 11", "RAM": "16 GB" } },
      "pressQuotes": [ { "quote": "…", "source": "GameMag" } ],
      "featured": true,
      "published": true,
      "order": 1
    }
  ]
}
```

`status` enum: `concept | in-development | early-access | released`. Also include an optional top-level `services` block describing game-dev-for-hire (title, description, offerings[], cta) rendered at the bottom of `/games`.

#### `blog.json`

Content is stored as an array of typed **content blocks** so the owner can write posts in JSON without MDX.

```json
{
  "seo": { "title": "Blog", "description": "…" },
  "categories": [ { "id": "iot", "label": "IoT" }, { "id": "gamedev", "label": "Game Dev" }, { "id": "software", "label": "Software" } ],
  "authors": [ { "id": "jane", "name": "Jane Doe", "role": "CTO", "avatar": "/images/team/jane.webp" } ],
  "posts": [
    {
      "slug": "intro-to-mqtt",
      "title": "A Practical Introduction to MQTT",
      "excerpt": "…",
      "category": "iot",
      "tags": ["mqtt", "protocols"],
      "authorId": "jane",
      "publishedAt": "2026-03-15",
      "updatedAt": "2026-03-20",
      "readingTimeMinutes": 7,
      "cover": { "src": "/images/blog/mqtt.webp", "alt": "…" },
      "content": [
        { "type": "heading", "level": 2, "text": "What is MQTT?" },
        { "type": "paragraph", "text": "MQTT is a lightweight publish/subscribe protocol…" },
        { "type": "list", "ordered": false, "items": ["Low bandwidth", "Reliable delivery"] },
        { "type": "code", "language": "ts", "code": "client.publish('sensors/temp', '23.4')" },
        { "type": "image", "src": "/images/blog/mqtt-diagram.webp", "alt": "…", "caption": "…" },
        { "type": "quote", "text": "…", "cite": "…" },
        { "type": "callout", "variant": "info", "title": "Tip", "text": "…" }
      ],
      "relatedProductSlugs": ["smart-hub"],
      "relatedGameSlugs": [],
      "featured": true,
      "published": true
    }
  ]
}
```

Supported block types: `heading`, `paragraph`, `list`, `code`, `image`, `quote`, `callout`, `divider`, `video`. Use a discriminated union in zod. Paragraph text supports simple inline Markdown (`**bold**`, `*italic*`, `` `code` ``, `[link](url)`) rendered by a small safe parser in `PostBody`. Never use `dangerouslySetInnerHTML` with unsanitised data.

Reading time: use `readingTimeMinutes` if present, else compute from content.

#### `pricing.json`

```json
{
  "seo": { "title": "Pricing", "description": "…" },
  "intro": { "headline": "Simple, transparent pricing", "subheadline": "…" },
  "currency": { "code": "USD", "symbol": "$" },
  "billingPeriods": [ { "id": "monthly", "label": "Monthly" }, { "id": "yearly", "label": "Yearly", "badge": "Save 20%" } ],
  "plans": [
    {
      "id": "starter",
      "name": "Starter",
      "description": "For prototypes and small deployments.",
      "price": { "monthly": 29, "yearly": 290 },
      "priceLabel": null,
      "highlighted": false,
      "badge": null,
      "features": [ { "text": "Up to 10 devices", "included": true } ],
      "cta": { "label": "Get started", "href": "/contact?plan=starter" },
      "published": true,
      "order": 1
    },
    {
      "id": "enterprise",
      "name": "Enterprise",
      "description": "Custom solutions at scale.",
      "price": null,
      "priceLabel": "Custom",
      "highlighted": false,
      "features": [ { "text": "Unlimited devices", "included": true } ],
      "cta": { "label": "Contact sales", "href": "/contact?plan=enterprise" }
    }
  ],
  "comparison": {
    "groups": [ { "title": "Devices", "rows": [ { "feature": "Max devices", "values": { "starter": "10", "pro": "500", "enterprise": "Unlimited" } } ] } ]
  },
  "customServices": [ { "title": "Custom software development", "description": "…", "startingAt": "From $5,000", "cta": { "label": "Request a quote", "href": "/contact?service=custom" } } ],
  "faq": [ { "question": "Can I change plans later?", "answer": "Yes." } ]
}
```

#### `contact.json`

Fields: `seo`, `intro`, `form` (`fields[]` with `name`, `label`, `type`, `required`, `placeholder`; `subjectOptions[]`; `successMessage`; `privacyNote`), `channels[]` (icon, label, value, href), `offices[]` (name, address, phone, email, hours, `mapEmbedUrl`), `socialLinks` (reuse `site.json`).

#### `support.json`

Fields: `seo`, `intro`, `channels[]` (email, chat, phone, community, with `hours` and `responseTime`), `categories[]` (id, icon, title, description, href), `faq[]` (`category`, `question`, `answer`), `resources[]` (docs, guides, downloads, video tutorials), `statusPage` (label, href), `form` (`categories[]`, `priorities[]`, `productOptions` derived from `products.json`, `gameOptions` derived from `games.json`), `slaNotes`.

---

## 6. Page Specifications

Every page: one `<h1>`, semantic landmarks (`header`, `main`, `footer`, `nav`), per-page `generateMetadata`, responsive from 320px up, keyboard accessible, and dark mode compatible.

### 6.1 Home (`/`)

Sections in order, each driven by `home.json`: Hero → Stats bar → Services (IoT / Software / Games) → Featured products → Featured games → Process → Testimonials → Client logos → Latest blog posts (3) → Final CTA.

### 6.2 About (`/about`)

Intro, mission & vision, values grid, timeline, team grid, stats, CTA.

### 6.3 Products (`/products`, `/products/[slug]`)

- **Listing:** category filter tabs (from `categories`), search input (name/tags), responsive card grid, status badges. Filters sync to URL query params (`?category=iot&q=hub`).
- **Detail:** hero (name, tagline, image, CTA "Request demo" → `/contact?product=slug`), description, feature grid, gallery, specs table (grouped), use cases, related pricing plans, downloads, related blog posts, related products.
- Use `generateStaticParams` for all published slugs; call `notFound()` for unknown slugs.

### 6.4 Games (`/games`, `/games/[slug]`)

- **Listing:** featured banner, filters for genre/platform/status (URL-synced), game cards with cover, platform icons, status badge. "Game development services" section below.
- **Detail:** banner, title, tagline, store buttons, trailer embed (use privacy-friendly `youtube-nocookie.com`, lazy loaded), screenshot gallery with lightbox, features, system requirements (min/recommended tabs), press quotes, related blog posts.

### 6.5 Blog (`/blog`, `/blog/[slug]`)

- **Listing:** featured post hero, category filter, search, tag display, pagination (`?page=2`, 9 per page; page size configurable in `constants.ts`). Sort by `publishedAt` desc.
- **Detail:** cover image, title, meta (author, date, reading time, category), block-rendered body, table of contents generated from `heading` blocks, share links, author box, related products/games, previous/next posts.
- Add `Article` JSON-LD structured data and an RSS feed at `/blog/rss.xml` (route handler).

### 6.6 Pricing (`/pricing`)

Billing period toggle (monthly/yearly), plan cards (highlight the recommended one), comparison table (horizontally scrollable on mobile, sticky header), custom services, FAQ accordion (also output `FAQPage` JSON-LD), final CTA.

### 6.7 Contact (`/contact`)

Form + contact channels + office details + map embed. Prefill `subject`/`product`/`plan` from query params. Client-side and server-side validation with zod; honeypot field for spam; success and error states; accessible error messages (`aria-describedby`, `aria-live`).

### 6.8 Support (`/support`)

Support channels with hours and response times, category cards, searchable FAQ grouped by category (accordion), resources list, status page link, support request form (category, priority, product/game selector, description, optional email).

### 6.9 Form handling

- `POST /api/contact` and `POST /api/support` route handlers: validate with the same zod schemas used client-side, rate-limit lightly (in-memory per-IP is acceptable for v1), reject honeypot hits silently, and return JSON `{ ok: boolean, message?: string, errors?: Record<string,string> }`.
- Delivery is pluggable via `src/lib/mailer.ts`. Implement a default that logs to the server console in development and reads provider credentials from env vars in production (document support for Resend or Nodemailer SMTP). **Never hardcode secrets.** Provide `.env.example`.

---

## 7. Design & UX Guidelines

- **Look & feel:** modern, clean, technical but approachable. Generous whitespace, strong typographic hierarchy, subtle motion.
- **Theme tokens** in `globals.css` (CSS variables) for brand colors, so the owner can rebrand in one place: `--color-primary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`. Expose them through Tailwind's theme configuration.
- **Typography:** use `next/font` (e.g. Inter for body, a display font for headings). No render-blocking external font links.
- **Layout:** a shared `Container` (max width ~1200px) and `Section` component (consistent vertical rhythm).
- **Dark mode:** supported via `next-themes` and Tailwind's dark variant; respect system preference.
- **Motion:** CSS transitions only for hover/focus; any animation respects `prefers-reduced-motion`.
- **Buttons/links:** clear focus rings, minimum 44×44px touch targets.
- **Empty states:** friendly message when a filter returns no results.
- **Icons:** JSON stores icon names as strings (kebab-case Lucide names). Create `components/ui/Icon.tsx` that maps names to Lucide components through a whitelist and falls back to a default icon.

---

## 8. Coding Standards

### TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`.
- No `any`, no non-null assertions (`!`) unless commented with a reason. Prefer `unknown` plus narrowing.
- Use `import type` for type-only imports.
- Use the `@/` alias for imports from `src/`.

### React / Next.js

- Default to **Server Components**. Add `"use client"` only for interactivity (filters, forms, toggles, mobile nav, theme toggle, lightbox, accordion if needed).
- Keep data loading in server components; pass plain serialisable props to client components.
- Use `next/image` for all images with explicit `width`/`height` or `fill` plus `sizes`; mark above-the-fold hero images `priority`.
- Use `next/link` for internal links; external links get `target="_blank"` and `rel="noopener noreferrer"`.
- Use `generateMetadata` and `generateStaticParams`; the site should be fully statically generated (SSG) except the API routes.
- One component per file, PascalCase filenames, named exports for components (default exports only where Next.js requires them).
- Keep components small (< ~150 lines); extract when a component does more than one thing.
- No inline styles; Tailwind utilities only. Use `cn()` for conditional classes.
- Avoid prop drilling beyond two levels; compose instead.

### Tailwind

- Follow the official setup for the installed version. Do not mix v3 and v4 configuration styles.
- Mobile-first (`sm:`, `md:`, `lg:`, `xl:`). Keep class lists readable; extract repeated patterns into components rather than `@apply` abuse.
- Keep `prettier-plugin-tailwindcss` enabled so classes stay sorted.

### ESLint

- Use the flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`.
- Additionally enforce: `@typescript-eslint/no-explicit-any: error`, `@typescript-eslint/consistent-type-imports: error`, `no-console: ["warn", { allow: ["warn", "error"] }]`, `react/jsx-key`, `jsx-a11y` rules (included via Next config), and `eqeqeq`.
- `pnpm lint` and `pnpm typecheck` must pass with **zero errors and zero warnings** before work is considered complete.

### Naming & conventions

- Files: components `PascalCase.tsx`; utilities/hooks `camelCase.ts`; routes follow Next.js conventions; JSON files `kebab-case` or single lowercase words.
- Hooks start with `use`. Constants `SCREAMING_SNAKE_CASE` in `constants.ts`.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

---

## 9. SEO, Accessibility & Performance

### SEO

- Unique `title` and `description` per page from JSON `seo` fields (fall back to `site.json`).
- `lib/seo.ts` builds Open Graph and Twitter metadata, canonical URLs, and `metadataBase` from `site.url`.
- `app/sitemap.ts` includes all static routes and every published product, game, and post slug (with `lastModified` where available).
- `app/robots.ts` references the sitemap.
- JSON-LD: `Organization` (site-wide), `Article` (blog posts), `Product` (products), `VideoGame` (games), `FAQPage` (pricing/support), `BreadcrumbList` (detail pages). Render via a `JsonLd` component with `JSON.stringify`.
- Breadcrumbs on detail pages.

### Accessibility (WCAG 2.2 AA target)

- Color contrast ≥ 4.5:1 for text in both themes.
- All interactive elements keyboard reachable with visible focus; skip-to-content link in layout.
- Correct heading order; labelled form controls; ARIA only when native semantics are insufficient.
- Accordions, tabs, and mobile menu follow WAI-ARIA authoring patterns (or use native `<details>` where sufficient).
- Meaningful `alt` text from JSON; decorative images use `alt=""`.

### Performance

- Target Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, SEO on all main pages (mobile).
- Prefer WebP/AVIF assets; lazy-load below-the-fold media and the YouTube embed (use a click-to-load facade).
- Avoid large client bundles; do not import the entire icon set (whitelist icons).
- No layout shift: always reserve image dimensions.

### Security

- Security headers in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` or CSP `frame-ancestors`, `Permissions-Policy`).
- Sanitise/escape all user input in API routes. Validate all JSON with zod.
- Secrets only via environment variables; `.env*` files git-ignored except `.env.example`.

---

## 10. Implementation Plan (follow in order)

Complete each phase fully, run `pnpm lint && pnpm typecheck && pnpm build`, and fix problems before moving on.

1. **Scaffold:** create the app, configure TypeScript strictness, ESLint, Prettier, Tailwind theme tokens, fonts, folder structure, `.env.example`, `.gitignore`.
2. **Data layer:** write zod schemas, loaders, types, **realistic sample JSON** for every file (at least: 4 products, 3 games, 6 blog posts, 3 pricing plans, 8 FAQ items), and `scripts/validate-data.ts`. Add placeholder images in `/public/images`.
3. **UI primitives & layout:** `Container`, `Section`, `Button`, `Card`, `Badge`, `Icon`, `Accordion`, `Tabs`, `Input`/`Textarea`/`Select`, `Header` (with mobile nav), `Footer`, `ThemeToggle`, skip link.
4. **Home page** and its section components.
5. **Products** listing and detail.
6. **Games** listing and detail.
7. **Blog** listing, detail, block renderer, RSS.
8. **Pricing** page.
9. **About, Contact, Support** pages plus form components and API routes.
10. **SEO & polish:** metadata, sitemap, robots, JSON-LD, 404 page, Open Graph images, accessibility pass, responsive pass at 320 / 375 / 768 / 1024 / 1440px.
11. **Docs:** `README.md` (setup, scripts, deploy), `docs/CONTENT_GUIDE.md`, `docs/DECISIONS.md`.
12. **Final verification** against the checklist below.

---

## 11. Definition of Done / Acceptance Checklist

- [ ] All 11 routes (plus detail routes, 404, sitemap, robots, RSS) exist and render without console errors.
- [ ] Changing any JSON file and rebuilding changes the page content accordingly. **No content is hardcoded in components.**
- [ ] Adding a new product, game, or blog post requires **only** adding an object to its JSON file (and an image to `/public`). Detail pages, listing, sitemap, and related links update automatically.
- [ ] Invalid JSON (missing field, duplicate slug, broken image path, bad cross-reference) fails `pnpm validate:data` and `pnpm build` with a clear message.
- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` all pass with zero errors and zero warnings.
- [ ] Only pnpm is used; `pnpm-lock.yaml` is present; no `package-lock.json` or `yarn.lock`.
- [ ] Fully responsive and usable by keyboard; dark and light themes both polished.
- [ ] Forms validate on both client and server, show clear success/error states, and have spam protection.
- [ ] Every page has unique metadata, OG tags, canonical URL, and correct structured data.
- [ ] Lighthouse (mobile) ≥ 95 in all four categories on Home, Products, Blog post, and Pricing.
- [ ] `README.md` and `docs/CONTENT_GUIDE.md` are accurate and tested by following them from scratch.

---

## 12. Agent Behaviour Rules

1. **Plan before coding.** At the start, restate the plan briefly and list assumptions.
2. **Work incrementally.** Follow the phases in Section 10. Keep the project in a buildable state after each phase.
3. **Do not invent a different architecture.** Stay within the stack, structure, and conventions here. If you must deviate, document it in `docs/DECISIONS.md` with the reason.
4. **Do not hardcode content.** If you catch yourself typing marketing copy into a component, move it into JSON.
5. **Use realistic placeholder content** (not "lorem ipsum") so the owner can see the intended structure; clearly mark placeholders with a `"_placeholder": true` field or a note in the content guide so they can be replaced.
6. **Never fabricate** claims, certifications, client names, prices, or legal text as if real. Placeholders must be obviously replaceable.
7. **Verify, don't assume.** Run lint, typecheck, build, and the data validator yourself and fix failures. Check the actual rendered output in the dev server when possible.
8. **Keep the diff clean.** No unused files, dead code, commented-out blocks, or leftover debug logs.
9. **Ask only when blocked.** For genuinely missing information (company name, brand colors, real copy), use sensible placeholders in JSON and list them in the final summary.
10. **Final report:** when finished, summarise what was built, how to run it, where to edit content, any assumptions made, and any follow-ups the owner should do (replace placeholder images/copy, configure the email provider, set `site.url`, add legal pages).

---

## 13. Out of Scope (v1)

User accounts/authentication, e-commerce checkout and payments, CMS/admin UI, database, multi-language (i18n), comments system, and analytics beyond an optional environment-variable-driven script slot. Structure the code so these can be added later without rewrites (for example, keep the data-loader layer abstract so JSON could later be swapped for a CMS).