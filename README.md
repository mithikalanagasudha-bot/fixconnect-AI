# FixConnect AI project guidance

## Project shape
- This is a lightweight static site for a home-repair / technician marketplace, not a framework app.
- Core front-end files are `index.html`, `style.css`, plus page-specific HTML files such as `about.html`, `service.html`, `login.html`, `customer-register.html`, and `provider-register.html`.
- Reuse the shared design language: premium navy/royal-blue palette, rounded cards, soft shadows, large imagery, and spacious layouts.

## Design patterns
- Keep the homepage polished and uncluttered: hero, services, workflow, why-us, CTA, footer.
- Use a responsive container pattern (`.container` + grid/flex layouts) instead of ad hoc widths.
- Prefer semantic sections with `header`, `main`, `section`, and `footer`; keep navigation consistent across pages.
- Use realistic photography from Unsplash/Pexels and maintain a premium, trustworthy commercial look.

## Routing and placeholders
- Navigation items should link to real app pages when available and placeholder pages for unfinished routes.
- Current landing-page routes point to `index.html`, `service.html`, `about.html`, `contact.html`, `login.html`, `customer-register.html`, and `emergency.html`.
- When adding new pages, keep header/footer structure consistent with the homepage for a coherent brand feel.

## Styling conventions
- Colors are defined in `:root` in `style.css`; update centralized tokens rather than hardcoding repeated hex values.
- Use `clamp()` and responsive grid/flex layouts to preserve quality on mobile.
- Buttons use rounded pill shapes, strong contrast, and subtle elevation; maintain this for new CTAs.

## Backend / runtime context
- `server.js` is a small Express API used for demo login checks and is not the main front-end architecture.
- Static HTML pages are served directly and can be previewed with a simple local HTTP server.

## Working approach
- If making UI changes, update the shared design system in `style.css` first, then adjust page markup to match.
- Keep homepage content concise and conversion-oriented: trust, services, reliability, and urgency.
- Favor tangible text and real-world service categories (plumbing, electrical, AC, appliances, cleaning, carpentry) rather than abstract placeholders.
