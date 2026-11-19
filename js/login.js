const form = document.getElementById("login_form");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function(event){
    event.preventDefault();
    clearErrors();

    if(isLocked){
        document.getElementById("passwordError").innerHTML="Password is locked. Try again after 1 minute."
        return;
    }

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let role = document.querySelector('input[name="role"]:checked');

    let valid = true;

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
        valid = false;
    }
    else if(password.value !=="PawNest123"){
        wrongAttempts++;

        showError(
            password, "passwordError", 
            "Wrong Password! Attempt " + wrongAttempts + " of 3." 
        );
        valid = false;
        if(wrongAttempts >= 3){
            isLocked = true;
            document.getElementById("passwordError").innerHTML = "Too many wrong attempts. Password locked for 1 minute.";
            password.disabled = true;

            setTimeout(function(){
                isLocked = false;
                wrongAttempts= 0;
                password.disabled = false;
                document.getElementById("passworderror").innerHTML = "Password unlocked. Try again.";
            }, 60000);
        }
    }
    else {
        wrongAttempts = 0;
        showSuccess(password);
    }

    //Role Validation
    if(role === null){
        document.getElementById("roleError").innerHTML = "Please select your role.";
        valid = false ;
    }

    if (valid){
        alert("Login Successful!");
        let selectedRole = document.querySelector('input[name="role"]:checked').value;

        if(selectedRole ==="seller"){
            window.location.href = "sellerDashboard.html";
        }
        else if(selectedRole ==="customer"){
            window.location.href = "customerDashboard.html";
        }
        else if(selectedRole ==="admin"){
            window.location.href = "adminDashboard.html";
        }
        else if(selectedRole ==="rider"){
            window.location.href = "riderDashboard.html";
        }
        
    }

});


function showError(input, errorId, message){
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML= message;
}

function showSuccess(input){
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

function clearErrors(){
    let errors = document.querySelectorAll(".error");

    errors.forEach(function(item){
        item.innerHTML ="";
    });

    let fields = document.querySelectorAll("input");

    fields.forEach(function(field){
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}