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
const pagination = document.getElementById('pagination');
const title      = document.getElementById('title');
const count      = document.getElementById('count');

const ageButtons = document.querySelectorAll('.age-btn');
const addButtons = document.querySelectorAll('.add-btn');
const cards      = document.querySelectorAll('.card');

// ---------- Variables that remember things ----------
let selectedAge = 'young';
let cartItems = 0;
let currentPage = 1;
let matching = [];          // the cards that pass the filters, in the order shown
const perPage = 9;          // cards on one page (3 full rows of 3)


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
  // find the ticked category radio (only Shop and Supplies have them)
  let category = 'All';
  const ticked = document.querySelector('input[name="category"]:checked');
  if (ticked) {
    category = ticked.value;
  }
  const min = Number(minPrice.value);
  const max = Number(maxPrice.value);
  const search = searchBox.value.toLowerCase();

  // start with an empty list of matching cards
  matching = [];

  // look at the cards in the order they are on the page right now
  const cardList = grid.querySelectorAll('.card');

  // check every card one by one
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i];
    const price = Number(card.dataset.price);
    let show = true;

    if (price < min || price > max) {
      show = false;
    }
    if (category !== 'All' && card.dataset.category !== category) {
      show = false;
    }
    // supplies have no data-age, so only pets are checked by age
    if (card.dataset.age && card.dataset.age !== selectedAge) {
      show = false;
    }
    // (textContent is kept here: it reads only the words on the card)
    if (!card.textContent.toLowerCase().includes(search)) {
      show = false;
    }

    // remember the cards that passed
    if (show) {
      matching.push(card);
    }
  }

  // Dogs, Cats and Supplies keep their own heading (data-fixed="yes")
  if (title.dataset.fixed !== 'yes') {
    if (category === 'All') {
      title.innerHTML = 'Shop';
    } else {
      title.innerHTML = category;
    }
  }
  count.innerHTML = matching.length;

  // always go back to page 1 after filtering
  currentPage = 1;
  showPage();
}

applyBtn.addEventListener('click', filterCards);
searchBox.addEventListener('input', filterCards);


// ---------- 4. Pages (9 cards on each page) ----------
// Shows only the cards of the current page and builds the page numbers
function showPage() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  // hide every card first
  const cardList = grid.querySelectorAll('.card');
  for (let i = 0; i < cardList.length; i++) {
    cardList[i].style.display = 'none';
  }

  // show only the matching cards that belong to this page
  for (let i = start; i < end && i < matching.length; i++) {
    matching[i].style.display = '';
  }

  // build the page numbers: 1, 2, 3 ...
  const totalPages = Math.ceil(matching.length / perPage);
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.innerHTML = i;
    if (i === currentPage) {
      link.classList.add('active');
    }
    link.addEventListener('click', function () {
      currentPage = i;
      showPage();
    });
    pagination.appendChild(link);
  }
}


// ---------- 5. Sort the cards ----------
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

  // keep the matching cards in the new order and go back to page 1
  const ordered = [];
  const cardList = grid.querySelectorAll('.card');
  for (let i = 0; i < cardList.length; i++) {
    if (matching.includes(cardList[i])) {
      ordered.push(cardList[i]);
    }
  }
  matching = ordered;
  currentPage = 1;
  showPage();
}

sortSelect.addEventListener('change', sortCards);


// ---------- 6. Add to cart ----------
for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener('click', function () {
    cartItems++;
    cartCount.innerHTML = cartItems;
    cartCount.style.display = 'block';   // show the number
  });
}


// ---------- 7. Run once when the page opens ----------
showPrices();
filterCards();
sortCards();
