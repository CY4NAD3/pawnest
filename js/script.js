
var pets = [
  {
    name: "Golden Pup",
    info: "Golden Retriever · 3 months",
    price: 25000,
    category: "Dogs",
    picture: "PawNest_Assets/mascots/dog-golden.svg"
  },
  {
    name: "Misty",
    info: "Persian cat · 4 months",
    price: 18000,
    category: "Cats",
    picture: "PawNest_Assets/mascots/cat-grey.svg"
  },
  {
    name: "Snowy",
    info: "Samoyed · 2 months",
    price: 30000,
    category: "Dogs",
    picture: "PawNest_Assets/mascots/dog-white.svg"
  },
  {
    name: "Ginger",
    info: "Tabby cat · 5 months",
    price: 9000,
    category: "Cats",
    picture: "PawNest_Assets/mascots/cat-orange.svg"
  }
];

var cartCount = 0;
var displayedPets = pets;

function showPets() {
  var petList = document.getElementById("petList");
  var html = "";

  for (var i = 0; i < displayedPets.length; i++) {
  
  html += '<div class="pet-card">';
  html += '  <div class="pet-picture">';
  html += '    <img src="' + displayedPets[i].picture + '" alt="' + displayedPets[i].name + '">';
  html += '  </div>';
  html += '  <h3>' + displayedPets[i].name + '</h3>';
  html += '  <p class="info">' + displayedPets[i].info + '</p>';
  html += '  <div class="pet-bottom">';
  html += '    <span class="price">Tk ' + displayedPets[i].price + '</span>';
  html += '    <button class="add-btn" onclick="addToCart(' + i + ')">Add</button>';
  html += '  </div>';
  html += '</div>';

  }

  petList.innerHTML = html;
}

function addToCart(index) {
  cartCount = cartCount + 1;
  document.getElementById("cartCount").innerHTML = cartCount;
  alert(displayedPets[index].name + " was added to your cart!");
}

function searchItems() {
  var text = document.getElementById("searchBox").value.toLowerCase().trim();

  if (text == "") {
  displayedPets = pets;
  showPets();
  return;
  }

  var results = [];

  for (var i = 0; i < pets.length; i++) {
    if (
      pets[i].name.toLowerCase().includes(text) ||
      pets[i].info.toLowerCase().includes(text) ||
      pets[i].category.toLowerCase().includes(text)
    ) {
      results.push(pets[i]);
    }
  }

  displayedPets = results;
  showPets();
}

document.getElementById("searchBtn").onclick = searchItems;

showPets();
