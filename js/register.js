const form = document.getElementById("registerForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    clearErrors();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let address = document.getElementById("address");
    let gender = document.querySelector('input[name="gender"]:checked');

    let valid = true;

    //Name Validation
    if(name.value.trim() === ""){
        showError(name, "nameError", "Name is required");
        valid = false;
    }
    else if(!/^[A-Za-z ]+$/.test(name.value.trim())){
        showError(name, "nameError", "Only letters are allowed.");
        valid = false;
    }
    else{
        showSuccess(name);
    }

    //Email Validation
    if(email.value.trim() === ""){
        showError(email, "emailError", "Email is required.");
        valid = false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        showError(email, "emailError", "Invalid email address.");
        valid = false;
    }
    else{
        showSuccess(email);
    }

    //Password Validation
    if(password.value ===""){
        showError(password, "passwordError", "Password is required.");
        valid =false;
    }
    else if(password.value.length <6){
        showError(password,"passwordError", "Password must be at least 6 characters.");
        valid = false;
    }
    else{
        showSuccess(password);
    }

    //Confirm password Validation
    if(confirmPassword.value ===""){
        showError(confirmPassword, "confirmPasswordError", "Please confirm your password.");
        valid = false;
    }
    else if(confirmPassword.value !== password.value){
        showError(confirmPassword,"confirmPasswordError", "Password do not match.");
        valid = false;
    }
    else{
        showSuccess(confirmPassword);
    }

    //Gender Validation
    if(gender === null){
        document.getElementById("genderError").innerHTML = "Please select your gender.";
        valid = false;
    }

    //Address Validation
    if(address.value.trim() ===""){
        showError(address,"addressError", "Address is required.");
        valid = false;
    }
    else if (address.value.trim().length <10){
        showError(address, "addressError", "Address must be at least 10 characters.");
        valid = false;
    }
    else{
        showSuccess(address);
    }

    if(valid){
        alert("Registration Successful!");
        form.reset();
        clearErrors();
    }
});    

function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

function clearErrors() {
    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {
        item.innerHTML = "";
    });

    let fields = document.querySelectorAll("input, textarea");

    fields.forEach(function (field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}
