// PawNest - Rider page JavaScript (My deliveries)

//  Get the things we need from the HTML
const markButtons    = document.querySelectorAll('.mark-btn');
const statusTags     = document.querySelectorAll('.delivery-status span');
const deliveredCount = document.getElementById('delivered-count');
const pendingCount   = document.getElementById('pending-count');


//  Mark one delivery as delivered
function markDelivered(i) {
  // change the colour tag to "Delivered"
  statusTags[i].innerHTML = 'Delivered';
  statusTags[i].classList.remove('out', 'picked', 'assigned');
  statusTags[i].classList.add('done');

  // hide the button, this delivery is finished
  markButtons[i].style.display = 'none';

  // Delivered today goes up by 1, Pending goes down by 1
  deliveredCount.innerHTML = Number(deliveredCount.innerHTML) + 1;
  pendingCount.innerHTML = Number(pendingCount.innerHTML) - 1;
}


//  Run the function when a button is clicked
for (let i = 0; i < markButtons.length; i++) {
  markButtons[i].addEventListener('click', function () {
    markDelivered(i);
  });
}
