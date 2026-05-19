# Asset License Notes

This file records asset and media license-review notes for Loot Corner.

This is an engineering audit aid, not legal advice.

## Current Asset Audit Summary

Temporary audit files can be regenerated with:

```bash
find public src -type f | sort > asset-files.txt
grep -RInE "next/font|fonts\.googleapis|@font-face|url\(|<img|OptimizedImage|cloudinary|res\.cloudinary|lucide-react|react-icons|/[^\"' )]+\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|otf)" src public > asset-refs.txt || true
```

These generated files are local-only and should not be committed:

```txt
asset-files.txt
asset-refs.txt
```

## Findings

### Repository Static Assets

Status: review before production

Finding:

- The asset scan found `public/favicon.ico`.
- The app references this file as `/favicon.ico`.
- The original source of this favicon is currently unknown.

Decision:

- Replaced the unknown `public/favicon.ico` with a simple original `public/favicon.svg`.
- The SVG uses basic shapes and text only.
- No copied logo, icon pack, external image, or embedded font is used.

### Fonts

Status: review before final commercial delivery

Finding:

- The app imports `Geist` through `next/font/google`.
- No separate committed font files were found in the repository scan.

Decision:

- Keep for now.
- Before final commercial delivery, verify the font license from the official source and keep a note or proof of license.
- Do not add paid or proprietary fonts unless the client has the right to use them.

### Product Images and Cloudinary Media

Status: review before final commercial delivery

Finding:

- Product images are uploaded through Cloudinary.
- Product images are rendered through the app using `OptimizedImage`.
- Product image URLs are expected to come from Cloudinary.

Decision:

- Treat Cloudinary product images as client/business content.
- Before production, confirm every real product image is client-owned, supplier-approved, original, or properly licensed.
- Replace temporary, demo, or test product images before production.
- Do not use images copied from marketplaces, Google Images, anime/game pages, social media, or other stores unless usage rights are confirmed.

### Icons, SVGs, and UI Asset Packs

Status: no separate committed icon pack found in this scan

Finding:

- The scan did not show committed SVG packs, icon packs, illustration packs, or downloaded UI assets in `public`.
- The current app mainly uses text, CSS, product images, and Cloudinary-hosted media.

Decision:

- Keep current approach.
- If icons, illustrations, templates, or UI kits are added later, record their source and license before commercial delivery.

## Required Production Actions

Before handing the project to a real client or launching production:

- Replace or verify `public/favicon.ico`.
- Verify the font license and keep proof.
- Verify every real product image uploaded to Cloudinary.
- Remove temporary, test, or demo product images.
- Do not use copyrighted figures, anime/game artwork, product photos, logos, posters, or character art without permission.
- Keep source/license notes for all commercial assets.
