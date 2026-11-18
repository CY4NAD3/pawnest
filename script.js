
var pets = [
  { name: "Golden Pup", info: "Golden Retriever · 3 months", price: 25000, picture: "🐶" },
  { name: "Misty",      info: "Persian cat · 4 months",      price: 18000, picture: "🐱" },
  { name: "Snowy",      info: "Samoyed · 2 months",          price: 30000, picture: "🐕" },
  { name: "Ginger",     info: "Tabby cat · 5 months",        price: 9000,  picture: "😺" }
];

var cartCount = 0;

function showPets() {
  var petList = document.getElementById("petList");
  var html = "";

  for (var i = 0; i < pets.length; i++) {
    html += '<div class="pet-card">';
    html += '  <div class="pet-picture">' + pets[i].picture + '</div>';
    html += '  <h3>' + pets[i].name + '</h3>';
    html += '  <p class="info">' + pets[i].info + '</p>';
    html += '  <div class="pet-bottom">';
    html += '    <span class="price">Tk ' + pets[i].price + '</span>';
    html += '    <button class="add-btn" onclick="addToCart(' + i + ')">Add</button>';
    html += '  </div>';
    html += '</div>';
  }

  petList.innerHTML = html;
}

function addToCart(index) {
  cartCount = cartCount + 1;
  document.getElementById("cartCount").innerHTML = cartCount;
  alert(pets[index].name + " was added to your cart!");
}

function searchItems() {
  var text = document.getElementById("searchBox").value;

  if (text == "") {
    alert("Please type something to search.");
  } else {
    alert("Searching for: " + text + " (Shop page coming soon)");
  }
}

document.getElementById("searchBtn").onclick = searchItems;

showPets();
