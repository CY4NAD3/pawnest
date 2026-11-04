# PawNest assets

All files are provided as SVG (editable, scales perfectly) and PNG (transparent background, 512px unless noted).

| Folder | Files | Use |
|---|---|---|
| logo/ | logo-horizontal (teal text), logo-horizontal-white (for dark/teal backgrounds), logo-icon | Navbar, login page, footer. Logo text is converted to outlines, so no font is needed. |
| mascots/ | dog-golden, dog-white, cat-grey, cat-orange, hero-dog-and-cat (1280px) | Product tiles, home hero, empty cart, 404 and "order placed" pages |
| products/ | dog-food-bag, toy-ball | Product tiles for supplies |
| favicon/ | favicon.svg, favicon.ico, favicon-32/180/192/512.png | Browser tab, mobile home screen |
| css/ | colors.css | Palette as CSS variables, with a dark mode set |

## Quick use
```html
<link rel="icon" href="assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/colors.css">
<img src="assets/logo/logo-horizontal.svg" alt="PawNest" height="40">
```
Product tile = a colored box (use --amber-light, --sky-tile or --teal-light) with a mascot centered:
```html
<div class="tile" style="background:var(--amber-light)"><img src="assets/mascots/dog-golden.svg" alt="Golden Retriever puppy"></div>
```

## Notes
- The mockups used the Calibri font. colors.css lists Nunito first (free on Google Fonts, rounder look), then Calibri as the fallback.
- The design has no icon set. For nav, cart and similar icons, use any free icon library.
- Avatars in the mockups are initials in colored circles, made with CSS, not images.
