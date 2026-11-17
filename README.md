# 🐾 PawNest

**PawNest** is an online pet shop and marketplace website, built as a group project for **CSC 3215 – Web Technologies**.

Customers can browse and search pets and supplies, add them to a cart and order them with home delivery or shop pickup. Sellers list pets and products, an admin approves listings and manages orders, and delivery riders handle the deliveries. Live pets are limited to local delivery or pickup.

> **Midterm status:** front end only (HTML, CSS, JavaScript) with **dummy data**. The database and server side (XAMPP, PHP, MySQL) come in the final term.

---

## Users

| Role | What they do |
|---|---|
| Customer | Browse, search and filter pets and supplies, manage the cart, checkout, track orders |
| Seller | Add and manage listings, check listing status, mark orders ready |
| Admin | Approve or reject listings, manage users, categories and orders, assign riders |
| Delivery Rider | See assigned deliveries, update delivery status, view delivery history |

---

## Pages

| Page | File | Status |
|---|---|---|
| Home | `index.html` | Planned |
| Shop (all pets and supplies) | `shop.html` | Done |
| Dogs | `dogs.html` | Done |
| Cats | `cats.html` | Done |
| Supplies | `supplies.html` | Done |
| Cart | `cart.html` | Planned |
| Login | `login.html` | Planned |
| Rider – My deliveries | `rider.html` | Done |
| Rider – Delivered | `rider-delivered.html` | Done |
| Rider – Profile | `rider-profile.html` | Done |
| Seller dashboard | – | Planned |
| Admin dashboard | – | Planned |

---

## Features so far

**Shop, Dogs, Cats and Supplies**
- Filter by category, price range (Min and Max sliders) and age
- Search box and sort (price low to high, high to low, name A to Z)
- Pagination, 9 cards per page
- Add button that raises the cart number in the header

**Delivery Rider**
- Dashboard with Assigned, Delivered today and Pending numbers
- "Mark delivered" button that updates the status and the numbers
- Delivery history table and a profile form
- Log out button

---

## Built with

- HTML, CSS and JavaScript only, kept in separate files
- No frameworks or libraries
- Colours come from shared CSS variables in `css/colors.css` (with a dark theme)

---

## Project structure

```
pawnest/
├── css/
│   ├── colors.css        shared colour variables
│   ├── shop.css          Shop, Dogs, Cats, Supplies
│   └── rider.css         Rider pages
├── js/
│   ├── shop.js           filter, sort, pages, cart count
│   ├── rider.js          Mark delivered
│   └── rider-profile.js  Profile save message
├── PawNest_Assets/       logo, favicon, mascots, product images
├── PawNest_Design/       page designs (SVG), use case and ER diagrams
├── shop.html
├── dogs.html
├── cats.html
├── supplies.html
├── rider.html
├── rider-delivered.html
├── rider-profile.html
└── README.md
```

---

## Run it locally

1. Install and start **XAMPP** (Apache).
2. Put the project folder here: `/opt/lampp/htdocs/pawnest`
3. Open the Shop page in your browser: `http://localhost/pawnest/shop.html`

Other pages work the same way, for example `http://localhost/pawnest/rider.html`.

---

## Team workflow (Git)

- `main` is the shared branch. Everyone works on their own branch and merges into `main`.
- Before merging, bring the latest `main` into your branch:

```bash
git pull origin main
git add .
git commit -m "Describe your change"
git push origin your-branch
```

- Then open a pull request into `main` on GitHub.

---

## Known gaps

- All data is dummy data written into the HTML. It will come from the database in the final term.
- The cart number is not saved after a page refresh.
- Price filter uses two separate sliders instead of one two-handle bar.
- No mobile layout yet.
- "Save profile" and "Mark delivered" only change the page, nothing is stored.

---

## Team

| Name | Part |
|---|---|
| Azraf | Shop, Dogs, Cats, Supplies, Delivery Rider |
| _Add name_ | _Home_ |
| _Add name_ | _Cart and Login_ |
| _Add name_ | _Seller and Admin dashboards_ |

_Course: CSC 3215 Web Technologies._
