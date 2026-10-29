# PHONIX GLOBAL TRADE — India Exports & Global Imports (Content V3)

This is the updated **Carysil-inspired blue-and-white frontend** with **new content reflecting the client's actual import–export focus**. The visual theme, loading animation, homepage scrolling and product carousel remain in place.

## Start on Ubuntu

```bash
cd ~/Downloads
mkdir -p phonix-content-v3
unzip PHONIX_GLOBAL_TRADE_IMPORT_EXPORT_V3.zip -d phonix-content-v3
cd phonix-content-v3
npm ci
npm run dev -- --port 3000
```

Open http://localhost:3000. For a direct view without the intro: http://localhost:3000/?noIntro=1

## What's new

- Homepage: exports from India, dehydrated vegetables/fruits, Indian manufacturing, imports to India.
- Product gallery: six categories, 12 illustrative inquiry-focused product entries.
- Product details: product enquiry CTA, no unverified guaranteed specifications.
- About, Import & Export, Gallery and Contact rewritten for the business.
- Contact form now asks trade direction, product category and destination/origin. **Frontend only: does not send email or store data.**
- Removed invented shipping routes/volumes/partnerships and contact offices from visible pages.

## Before client launch

Read `CONTENT_UPDATE.md` and `IMAGE_SOURCES.md`. Replace stock visuals with approved actual product images. Confirm company spelling, product availability, descriptions and origin details, certifications, MOQ, packing, business contact details, and final export/import countries. Connect the enquiry form to a verified email or backend.

## Build and test

```bash
npm ci
npm run build
npm run dev -- --port 3000
```

## Test status here

Source TS/TSX syntax and CSS parsed successfully, and local image references were verified. A complete npm production build **could not** be performed here because the required npm package files were not in the offline cache; run `npm ci && npm run build` on your Ubuntu machine.
