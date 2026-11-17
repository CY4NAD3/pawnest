// PawNest - Shop page JavaScript
// =====================================================

// ---------- Get the things we need from the HTML ----------
const searchBox  = document.getElementById('search');
const cartCount  = document.getElementById('cart-count');
const minPrice   = document.getElementById('min-price');
const maxPrice   = document.getElementById('max-price');
const minText    = document.getElementById('min-text');
const maxText    = document.getElementById('max-text');
const applyBtn   = document.getElementById('apply-btn');
const sortSelect = document.getElementById('sort');
const grid       = document.getElementById('grid');
const title      = document.getElementById('title');
const count      = document.getElementById('count');

const ageButtons = document.querySelectorAll('.age-btn');
const addButtons = document.querySelectorAll('.add-btn');
const cards      = document.querySelectorAll('.card');

// ---------- Variables that remember things ----------
let selectedAge = 'young';
let cartItems = 0;


// ---------- 1. Price sliders ----------
// Shows the price numbers under the sliders
function showPrices() {
  minText.innerHTML = Number(minPrice.value).toLocaleString();
  maxText.innerHTML = Number(maxPrice.value).toLocaleString();
}

// When the Min slider moves
function minSliderMoved() {
  // Min should never be bigger than Max
  if (Number(minPrice.value) > Number(maxPrice.value)) {
    maxPrice.value = minPrice.value;
  }
  showPrices();
}

// When the Max slider moves
function maxSliderMoved() {
  // Max should never be smaller than Min
  if (Number(maxPrice.value) < Number(minPrice.value)) {
    minPrice.value = maxPrice.value;
  }
  showPrices();
}

minPrice.addEventListener('input', minSliderMoved);
maxPrice.addEventListener('input', maxSliderMoved);


// ---------- 2. Age buttons ----------
for (let i = 0; i < ageButtons.length; i++) {
  ageButtons[i].addEventListener('click', function () {

    // take "active" off all the age buttons
    for (let j = 0; j < ageButtons.length; j++) {
      ageButtons[j].classList.remove('active');
    }

    // put "active" on the one we clicked
    ageButtons[i].classList.add('active');
    selectedAge = ageButtons[i].dataset.age;
  });
}


// ---------- 3. Filter the cards ----------
function filterCards() {
  const category = document.querySelector('input[name="category"]:checked').value;
  const min = Number(minPrice.value);
  const max = Number(maxPrice.value);
  const search = searchBox.value.toLowerCase();

  let shown = 0;

  // check every card one by one
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const price = Number(card.dataset.price);
    let show = true;

    if (price < min || price > max) {
      show = false;
    }
    if (category !== 'All' && card.dataset.category !== category) {
      show = false;
    }
    if (card.dataset.age !== selectedAge) {
      show = false;
    }
    // (textContent is kept here: it reads only the words on the card)
    if (!card.textContent.toLowerCase().includes(search)) {
      show = false;
    }

    // show or hide the card
    if (show) {
      card.style.display = '';
      shown++;
    } else {
      card.style.display = 'none';
    }
  }

  title.innerHTML = category;
  count.innerHTML = shown;
}

applyBtn.addEventListener('click', filterCards);
searchBox.addEventListener('input', filterCards);


// ---------- 4. Sort the cards ----------
function sortCards() {
  const list = Array.from(cards);   // turn the cards into a normal list
  const choice = sortSelect.value;

  list.sort(function (a, b) {
    if (choice === 'price-low') {
      return Number(a.dataset.price) - Number(b.dataset.price);
    }
    if (choice === 'price-high') {
      return Number(b.dataset.price) - Number(a.dataset.price);
    }
    return a.dataset.name.localeCompare(b.dataset.name);
  });

  // put the cards back into the grid in the new order
  for (let i = 0; i < list.length; i++) {
    grid.appendChild(list[i]);
  }
}

sortSelect.addEventListener('change', sortCards);


// ---------- 5. Add to cart ----------
for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener('click', function () {
    cartItems++;
    cartCount.innerHTML = cartItems;
    cartCount.style.display = 'block';   // show the number
  });
}


// ---------- 6. Run once when the page opens ----------
showPrices();
sortCards();
filterCards();
