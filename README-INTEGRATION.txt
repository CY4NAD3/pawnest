PAWNEST CART + ADMIN FRONT-END MODULES

Files to copy into the root of your existing pawnest project:
- cart.html
- admin.html
- css/cart.css
- css/admin.css
- js/cart.js
- js/admin.js

Also open SHOP-JS-INTEGRATION.txt and apply the small Add-to-cart replacement to your existing js/shop.js.

The code reuses your existing css/colors.css and PawNest_Assets logo/favicon paths.
It uses vanilla HTML, CSS and JavaScript, with localStorage for demonstration data.

TEST:
1. Open shop.html through XAMPP.
2. Click Add on one or more product cards.
3. Open cart.html and change quantity or remove products.
4. Open admin.html to test listing approval/rejection, user block/activate, category add/remove, order status and rider assignment.

IMPORTANT LIMITATION:
This is a front-end university-project prototype. localStorage is browser-specific and is not secure or shared between users. Admin data is sample data. Do not use it as a real production admin system. For the final term, connect these actions to PHP + MySQL and add server-side authentication and authorization.
