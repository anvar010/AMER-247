# Amer 24/7 — Frontend (Next.js)

Revamp of [amer247.com](https://amer247.com/). Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and lucide-react icons.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000.

## Asset placeholders

All logos and images are placeholders. Drop your final assets into `public/` using these paths and they'll appear automatically:

| Asset | Path |
|---|---|
| Amer wordmark logo | `public/logos/amer.png` |
| 24/7 mark logo | `public/logos/247.png` |
| Tas-heel partner logo | `public/logos/tasheel.png` |
| Tahjeeh partner logo | `public/logos/tahjeeh.png` |
| Hero video (Dubai skyline — see Pinterest ref) | `public/videos/hero-dubai.mp4` |
| Hero video poster | `public/images/hero-poster-placeholder.jpg` |
| "Why Choose" office image | `public/images/office.jpg` |

After adding the files, update the `<img>` / `<video>` / placeholder `<div>` references in `components/Header.tsx`, `components/Hero.tsx`, `components/WhyChoose.tsx`, and `components/Footer.tsx`.

## Hero video reference

The hero section uses a vertical Dubai skyline video (reference: the provided Pinterest pin). Place an MP4 at `public/videos/hero-dubai.mp4`; the `<video>` element auto-plays muted on loop.

## Structure

```
frontend/
├─ app/                  # App router pages
│  ├─ layout.tsx         # Root layout (Header + Footer)
│  ├─ page.tsx           # Home page composition
│  └─ globals.css
├─ components/
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ ServiceSearch.tsx
│  ├─ Services.tsx
│  ├─ WhyChoose.tsx
│  ├─ HowItWorks.tsx
│  ├─ VisaPackages.tsx
│  ├─ StatsBar.tsx
│  └─ Footer.tsx
└─ public/
   ├─ logos/
   └─ images/
```

## Content source

Page copy mirrors the section structure from amer247.com (Tourist Visa, Entry Permit, Residency Services, Emirates ID, Medical Test, Golden Visa, Family Visa, Business Services) and the supplied screenshot.
