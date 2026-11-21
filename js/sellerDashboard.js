const navLinks = document.querySelectorAll(".nav-link");

const dashboardPage = document.getElementById("dashboardPage");
const listingsPage = document.getElementById("listingsPage");
const ordersPage = document.getElementById("ordersPage");

const pageTitle = document.getElementById("pageTitle");

const addBtn = document.getElementById("addBtn");

const listingModal = document.getElementById("listingModal");
const closeModal = document.getElementById("closeModal");

const listingForm = document.getElementById("listingForm");

const productName = document.getElementById("productName");
const category = document.getElementById("category");
const price = document.getElementById("price");
const status = document.getElementById("status");

const listingTable = document.getElementById("listingTable");
const modalTitle = document.getElementById("modalTitle");
const activeCount = document.getElementById("activeCount");
const pendingCount = document.getElementById("pendingCount");

const animalImage = document.getElementById("animalImage");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");


let currentRow = null;

navLinks.forEach(function(link){
    link.addEventListener("click", function(event){
        event.preventDefault();

        navLinks.forEach(function(item){
            item.classList.remove("active");
        });

        link.classList.add("active");

        listingModal.classList.remove("show");

        dashboardPage.style.display ="none";
        listingsPage.style.display = "none";
        ordersPage.style.display = "none";

        if(link.dataset.page ==="dashboard"){
            dashboardPage.style.display = "block";
            pageTitle.textContent = "Seller Dashboard";
        }

        else if (link.dataset.page ==="listings"){
            listingsPage.style.display = "block";
            pageTitle.textContent = "Seller Dashboard";
        }
        else if (link.dataset.page ==="add"){
            listingsPage.style.display = "block";
            pageTitle.textContent = "Seller Dashboard";
            openModal();
        }
        else if(link.dataset.page ==="orders"){
            ordersPage.style.display = "block";
            pageTitle.textContent = "Orders";
        }
    });
});

addBtn.addEventListener("click", function(){
    openModal();
});

function openModal(){
    listingForm.reset();
    clearErrors();
    currentRow = null;
    modalTitle.textContent = "ADD Listing";
    listingModal.classList.add("show");
}

closeModal.addEventListener("click", function(){
    listingModal.classList.remove("show");
    listingForm.reset();
    clearErrors();
    currentRow = null;
});

listingModal.addEventListener("click", function(event){
    if(event.target === listingModal){
        listingModal.classList.remove("show");
        listingForm.reset();
        clearErrors();
        currentRow = null;

    }
});

listingForm.addEventListener("submit", function(event){
    event.preventDefault();
    clearErrors();
    let valid = true;

    if (productName.value.trim() ===""){
        showError(productName,"nameError", "Product name is required.");
        valid = false;
    }

    if (category.value ===""){
        showError(category,"categoryError", "Please select a category.");
        valid = false;
    }

    if(price.value ==="" || Number(price.value) <=0){
        showError(price,"priceError", "Enter a valid price.");
        valid = false;
    }

    if(valid === true){
        let name = productName.value.trim();
        let cat = category.value;
        let productPrice = Number(price.value);
        let productStatus = status.value;

        if(currentRow !== null){
            currentRow.cells[0].innerHTML="<strong>" + name + "</strong>";
            currentRow.cells[1].textContent = cat;
            currentRow.cells[2].textContent = "Tk "+ productPrice.toLocaleString();
            currentRow.cells[3].innerHTML='<span class="status ' + productStatus.toLowerCase() +'">' + productStatus + '</span>';
        }

        else{
            let newRow =document.createElement("tr");

            newRow.innerHTML= 
                '<td><strong>' + name + '</strong></td>' +
                '<td>' + cat + '</td>' +
                '<td>Tk ' + productPrice.toLocaleString() + '</td>' +
                '<td>' +
                '<span class="status ' +
                productStatus.toLowerCase() +
                '">' +
                productStatus +
                '</span>' +
                '</td>' +

                '<td class="actions">' +
                '<button type="button" class="edit-btn">Edit</button>' +
                '<span>·</span>' +
                '<button type="button" class="delete-btn">Delete</button>' +
                '</td>';
            listingTable.appendChild(newRow);    
        }

        updateCounts();

        listingModal.classList.remove("show");
        listingForm.reset();
        clearErrors();
        currentRow = null;
    }
});

animalImage.addEventListener("change", function(){
    const file = animalImage.files[0];
    if(file){
        const reader = new FileReader();

        reader.onload = function(event){
            previewImage.src = event.target.result;
            imagePreview.style.display= "block";
        };

        reader.readAsDataURL(file);
    }
});

listingTable.addEventListener("click", function(event){
    let row = event.target.closest("tr");

    if(event.target.classList.contains("edit-btn")){

        currentRow = row;

        productName.value = row.cells[0].textContent.trim();
        category.value = row.cells[1].textContent.trim();
        price.value = row.cells[2].textContent.replace("TK","").replace(/,/g,"").trim();
        status.value = row.cells[3].textContent.trim();

        modalTitle.textContent = "Edit Listing";

        clearErrors();
        listingModal.classList.add("show");
    }

    else if (event.target.classList.contains("delete-btn")){
        let confirmDelete = confirm("Do you want to delete this listing?");
        if(confirmDelete === true){
            row.remove();
            updateCounts();
        }
    }
});

function updateCounts(){
    let approved = 0;
    let pending = 0;

    const statusList = listingTable.querySelectorAll(".status");

    statusList.forEach(function(item){
        if(item.classList.contains("approved")){
            approved++;
        }
        else if (item.classList.contains("pending")){
            pending++;
        }

    });

    activeCount.textContent = approved;
    pendingCount.textContent = pending;
}

function showError(input,errorId,message){
    const error = document.getElementById(errorId);
    error.textContent = message;

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");
    errors.forEach(function(item) {
        item.textContent = "";
    });

    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(function(item) {
        item.classList.remove("errorBorder");
        item.classList.remove("successBorder");
    });

}
