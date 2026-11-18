// PawNest cart. Shared localStorage key used by the shop and cart pages.
const CART_KEY = "pawnestCart";
const money = value => "Tk " + Number(value).toLocaleString("en-BD");

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (error) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateHeaderCount(cart);
}
function updateHeaderCount(cart = readCart()) {
  const count = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const badge = document.getElementById("cart-count");
  if (badge) { badge.textContent = count; badge.style.display = count ? "block" : "none"; }
}

function renderCart() {
  const cart = readCart();
  const container = document.getElementById("cart-items");
  const empty = document.getElementById("empty-cart");
  const countLabel = document.getElementById("item-count");
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const quantity = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
  const delivery = cart.length ? 100 : 0;

  countLabel.textContent = `${quantity} item${quantity === 1 ? "" : "s"}`;
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("delivery").textContent = money(delivery);
  document.getElementById("total").textContent = money(subtotal + delivery);
  document.getElementById("checkout-btn").disabled = cart.length === 0;
  empty.hidden = cart.length !== 0;
  container.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("article");
    row.className = "cart-row";
    const image = item.image
      ? `<img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.name)}">`
      : `<span class="emoji">🐾</span>`;
    row.innerHTML = `
      <div class="item-image">${image}</div>
      <div>
        <p class="item-name">${escapeHTML(item.name)}</p>
        <p class="item-meta">${escapeHTML(item.category || "Pet shop item")}</p>
        <div class="item-price">${money(item.price)} each</div>
        <div class="quantity-control">
          <button type="button" data-action="decrease" data-id="${escapeAttribute(item.id)}" aria-label="Decrease quantity">−</button>
          <span>${Number(item.quantity)}</span>
          <button type="button" data-action="increase" data-id="${escapeAttribute(item.id)}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="item-actions">
        <div class="line-total">${money(Number(item.price) * Number(item.quantity))}</div>
        <button class="remove-btn" type="button" data-action="remove" data-id="${escapeAttribute(item.id)}">Remove</button>
      </div>`;
    container.appendChild(row);
  });
  updateHeaderCount(cart);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function escapeAttribute(value) { return escapeHTML(value).replace(/`/g, "&#96;"); }

document.getElementById("cart-items").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const cart = readCart();
  const item = cart.find(product => String(product.id) === button.dataset.id);
  if (!item) return;
  if (button.dataset.action === "increase") item.quantity++;
  if (button.dataset.action === "decrease") item.quantity--;
  let updated = cart.filter(product => product.quantity > 0);
  if (button.dataset.action === "remove") updated = cart.filter(product => String(product.id) !== button.dataset.id);
  saveCart(updated);
  renderCart();
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  const cart = readCart();
  if (!cart.length) return;
  document.getElementById("checkout-message").textContent =
    "Cart is ready. Connect this button to your checkout/order page when that module is available.";
});

renderCart();
