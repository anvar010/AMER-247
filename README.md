# AMER 24/7

Official website for AMER 24/7 — a semi-government organization in Dubai providing visa, residency, and government transaction services around the clock.

## Tech Stack

- **Framework:** Next.js (App Router) + React 19
- **Language:** TypeScript
- **Styling:** CSS Modules + global tokens
- **Icons:** lucide-react
- **Fonts:** Inter

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
  app/                  # Next.js routes
    about/              # /about
    contact/            # /contact
    services/           # /services
    pricing-list/       # /pricing-list
    online-services/    # /online-services
  components/           # Shared UI (Header, Hero, Footer, etc.)
  public/               # Static assets (images, logos, videos)
```

## Pages

- `/` — Home (scroll-driven AMER 24/7 video reveal)
- `/services` — Service catalog
- `/about` — Company story, objectives, differentiators
- `/contact` — Form, address, FAQ
- `/pricing-list` — Service pricing categories
- `/online-services` — Detailed online-service application flow
