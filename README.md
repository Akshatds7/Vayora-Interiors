# SKY HOME FURNISHING — Production Luxury Full-Stack Platform

> Production-grade full-stack web application for **SKY HOME FURNISHING** — an architectural luxury home furnishing & interior lifestyle brand.

---

## Key Features

- **Luxury Aesthetics**: Inspired by Restoration Hardware, B&B Italia, and Poliform. Built with Playfair Display & Inter typography, glassmorphism overlays, warm ivory (`#FDFBF7`), obsidian charcoal, and metallic gold accents.
- **Hero Background Carousel**: Auto-playing full viewport background carousel with cross-fade transition, Ken Burns slow zoom, synchronized text animations, progress bar, play/pause controls, and touch swipe support.
- **Full Page Architecture**:
  1. **Home**: Hero carousel, featured categories, bestseller showcase, brand promises, client testimonials, inspiration gallery preview, newsletter subscription.
  2. **About Us**: Brand story, history timeline, mission & vision, materials craftsmanship, sustainability manifesto, founders.
  3. **Product Catalog**: Dynamic product grid with category tab filtering (Sofas, Beds, Dining, Chairs, Wardrobes, Curtains, Cushions, Carpets, Mattresses, Lighting, Wooden Furniture, Modular Furniture, Home Decor), search, Quick View modal, and wishlist.
  4. **Product Detail (`/products/[id]`)**: Multi-angle image gallery with zoom, technical specifications, dimensions, materials, availability, instant inquiry trigger, and related products.
  5. **Curated Collections**: Themed collection pages (Modern Living, Royal Collection, Scandinavian, Wooden Heritage, Minimal Elegance, Luxury Bedroom).
  6. **Inspirations Gallery**: Responsive masonry layout with lightbox modal preview for Living rooms, Bedrooms, Villas, Hotels, and Commercial projects.
  7. **Services**: Interior consultation, bespoke custom furniture, space planning, white-glove delivery, and on-site installation.
  8. **Contact Us**: Working contact form with Zod client validation, rate limiting feedback, database storage, official office address, Google Maps location embed, click-to-call, click-to-email, and floating WhatsApp concierge.
  9. **Executive Admin CMS**: Complete management dashboard (`/admin/dashboard` & `/admin/login`) with live reactive CMS capabilities to edit every single webpage and functionality: Products & Catalog, Homepage Hero Slides, Inquiries & Lead capture, Services, About Us & Founders, Digital Brochure, Global Contacts, and Newsletter Subscribers. Default credentials: `admin@skyhome.com` / `SkyHome2026!`.
- **Backend Architecture**: Express + TypeScript REST API, Prisma ORM, PostgreSQL database, Redis caching & rate limiting, JWT auth with HttpOnly cookies, Helmet security headers.
- **DevOps & Infrastructure**: Multi-stage Docker containers, Docker Compose, Nginx reverse proxy with Gzip compression and security headers, and GitHub Actions CI/CD pipeline.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, React Hook Form, Zod.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT, Bcrypt, Rate Limiter, Helmet, Cookie Parser.
- **Database & Cache**: PostgreSQL, Redis.
- **DevOps**: Docker, Docker Compose, Nginx, GitHub Actions.

---

## Quick Local Setup

```bash
# 1. Install Monorepo Dependencies
npm install

# 2. Start Shared Types Build
npm --prefix packages/types run build

# 3. Launch Development Mode
# Frontend: http://localhost:3000
npm run dev:frontend

# Backend API: http://localhost:5000
npm run dev:backend
```

---

## Docker Production Launch

```bash
cd docker
docker compose up -d --build
```
- Access web application at `http://localhost`

---

## Testing

```bash
npm run test
```

---

## Project Structure

```
d:\SKYhome\
├── apps/
│   ├── frontend/         # Next.js 14 App Router, Tailwind CSS, Framer Motion
│   └── backend/          # Express, TypeScript, Prisma ORM, JWT, Redis
├── packages/
│   └── types/            # Shared TypeScript interfaces & DTOs
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── nginx.conf
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── API.md
│   └── DEPLOYMENT.md
└── README.md
```
# Vayora-Interiors
