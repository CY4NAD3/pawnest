const form  = document.getElementById("forgotPasswordForm");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const showPassword = document.getElementById("showPassword");

form.addEventListener("submit", function(event){
    event.preventDefault();
    clearErrors();

    let valid = true;

    if(newPassword.value.trim() ===""){
        showError(newPassword,"newPasswordError", "New password is required.");
        valid = false;
    }
    else if(newPassword.value.length <8){
        showError(newPassword,"newPasswordError", "Password must be at least 8 characters.");
        valid = false;
    }
    else{
        showSuccess(newPassword);
    }

    if(confirmPassword.value.trim() ===""){
        showError(confirmPassword, "confirmPasswordError", "Please confirm your password.");
        valid = false;
    }
    else if(confirmPassword.value !== newPassword.value){
        showError(confirmPassword, "confirmPasswordError", "Passwords do not match.");
        valid = false;
    }
    else{
        showSuccess(confirmPassword);
    }

    if (valid){
        alert("Password reset successfully");
        window.location.href = "Login.html";
    }
    
});

