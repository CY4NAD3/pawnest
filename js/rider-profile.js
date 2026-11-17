// PawNest - Rider Profile page JavaScript
// =====================================================

// ---------- Get the things we need from the HTML ----------
const saveBtn  = document.getElementById('save-btn');
const saveMsg  = document.getElementById('save-msg');
const fullName = document.getElementById('full-name');
const phone    = document.getElementById('phone');


// ---------- Save button ----------
// (this only checks the boxes and shows a message, nothing is stored yet)
function saveProfile() {
  if (fullName.value === '' || phone.value === '') {
    saveMsg.innerHTML = 'Please fill in your name and phone';
  } else {
    saveMsg.innerHTML = 'Profile saved';
  }
}

saveBtn.addEventListener('click', saveProfile);
