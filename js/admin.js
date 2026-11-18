// PawNest Admin Dashboard - front-end demo data stored in localStorage.
// Replace this demo storage layer with PHP/MySQL API calls in the final backend version.
const DB_KEY = "pawnestAdminData";
const CART_KEY = "pawnestCart";
const defaultData = {
  users: [
    {id:1,name:"Ayesha Rahman",email:"ayesha@example.com",role:"Customer",status:"Active"},
    {id:2,name:"Tanvir Hasan",email:"tanvir@example.com",role:"Seller",status:"Active"},
    {id:3,name:"Nusrat Jahan",email:"nusrat@example.com",role:"Customer",status:"Active"},
    {id:4,name:"Rafi Ahmed",email:"rafi@example.com",role:"Rider",status:"Active"}
  ],
  listings: [
    {id:101,name:"Golden Retriever Puppy",seller:"Tanvir Hasan",category:"Dogs",price:25000,status:"Pending"},
    {id:102,name:"Premium Cat Food",seller:"Pet House",category:"Food",price:1800,status:"Pending"},
    {id:103,name:"Cat Scratching Post",seller:"Tanvir Hasan",category:"Accessories",price:1200,status:"Approved"}
  ],
  orders: [
    {id:"PN-1001",customer:"Ayesha Rahman",date:"2026-11-16",items:"Golden Retriever Puppy",total:25000,status:"Processing",address:"Dhanmondi, Dhaka",rider:""},
    {id:"PN-1002",customer:"Nusrat Jahan",date:"2026-11-17",items:"Premium Cat Food × 2",total:3600,status:"Delivered",address:"Uttara, Dhaka",rider:"Rafi Ahmed"},
    {id:"PN-1003",customer:"Ayesha Rahman",date:"2026-11-18",items:"Cat Scratching Post",total:1200,status:"Pending",address:"Mirpur, Dhaka",rider:""}
  ],
  categories:["Dogs","Cats","Food","Accessories"]
};
function loadData(){
  try { const saved=JSON.parse(localStorage.getItem(DB_KEY)); return saved || structuredClone(defaultData); }
  catch(e){ return JSON.parse(JSON.stringify(defaultData)); }
}
let data=loadData();
function saveData(){localStorage.setItem(DB_KEY,JSON.stringify(data));}
const money=n=>"Tk "+Number(n).toLocaleString("en-BD");
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function statusTag(status){return `<span class="status ${String(status).toLowerCase()}">${safe(status)}</span>`;}
function showMessage(message){const el=document.getElementById("admin-message");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200);}

function navigate(view){
  document.querySelectorAll(".view").forEach(el=>el.classList.toggle("active",el.id==="view-"+view));
  document.querySelectorAll(".side-link").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
  const names={dashboard:"Dashboard Overview",listings:"Listing Management",users:"User Management",categories:"Category Management",orders:"Order Management",riders:"Rider Assignment"};
  document.getElementById("page-title").textContent=names[view]||"Admin Dashboard";
}
document.querySelectorAll(".side-link").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.view)));
document.querySelectorAll("[data-go]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.go)));

function renderDashboard(){
  document.getElementById("stat-users").textContent=data.users.length;
  document.getElementById("stat-pending").textContent=data.listings.filter(x=>x.status==="Pending").length;
  document.getElementById("stat-orders").textContent=data.orders.length;
  const revenue=data.orders.filter(x=>x.status==="Delivered").reduce((sum,x)=>sum+Number(x.total),0);
  document.getElementById("stat-revenue").textContent=money(revenue);
  document.getElementById("recent-orders").innerHTML=data.orders.slice(-5).reverse().map(o=>`<tr><td>${safe(o.id)}</td><td>${safe(o.customer)}</td><td>${safe(o.date)}</td><td>${money(o.total)}</td><td>${statusTag(o.status)}</td></tr>`).join("")||emptyRow(5);
  const pending=data.listings.filter(x=>x.status==="Pending");
  document.getElementById("pending-preview").innerHTML=pending.length?pending.slice(0,3).map(x=>`<p>🐾 <strong>${safe(x.name)}</strong> — ${safe(x.seller)} <span style="float:right">${money(x.price)}</span></p>`).join(""):"<p class='empty-row'>No pending listings.</p>";
}
function emptyRow(cols){return `<tr><td colspan="${cols}" class="empty-row">No records found.</td></tr>`;}

function renderListings(){
  document.getElementById("listings-table").innerHTML=data.listings.map(x=>`<tr><td><strong>${safe(x.name)}</strong></td><td>${safe(x.seller)}</td><td>${safe(x.category)}</td><td>${money(x.price)}</td><td>${statusTag(x.status)}</td><td>${x.status==="Pending"?`<button class="action-btn approve" data-listing="${x.id}" data-status="Approved">Approve</button><button class="action-btn reject" data-listing="${x.id}" data-status="Rejected">Reject</button>`:"—"}</td></tr>`).join("")||emptyRow(6);
}
document.getElementById("listings-table").addEventListener("click",e=>{
  const btn=e.target.closest("[data-listing]");if(!btn)return;
  const item=data.listings.find(x=>x.id===Number(btn.dataset.listing));if(!item)return;
  item.status=btn.dataset.status;saveData();renderAll();showMessage(`Listing ${item.status.toLowerCase()}.`);
});

function renderUsers(){
  document.getElementById("users-table").innerHTML=data.users.map(u=>`<tr><td><strong>${safe(u.name)}</strong></td><td>${safe(u.email)}</td><td>${safe(u.role)}</td><td>${statusTag(u.status)}</td><td><button class="action-btn ${u.status==="Active"?"danger":"approve"}" data-user="${u.id}">${u.status==="Active"?"Block":"Activate"}</button></td></tr>`).join("")||emptyRow(5);
}
document.getElementById("users-table").addEventListener("click",e=>{
  const btn=e.target.closest("[data-user]");if(!btn)return;
  const user=data.users.find(x=>x.id===Number(btn.dataset.user));if(!user)return;
  user.status=user.status==="Active"?"Blocked":"Active";saveData();renderAll();showMessage(`User ${user.status.toLowerCase()}.`);
});

function renderCategories(){
  document.getElementById("category-list").innerHTML=data.categories.map((c,i)=>`<span class="category-chip">${safe(c)}<button type="button" aria-label="Remove ${safe(c)}" data-category="${i}">×</button></span>`).join("")||"<p>No categories yet.</p>";
}
document.getElementById("category-form").addEventListener("submit",e=>{
  e.preventDefault();const input=document.getElementById("category-name");const name=input.value.trim();
  if(!name)return;
  if(data.categories.some(c=>c.toLowerCase()===name.toLowerCase())){showMessage("This category already exists.");return;}
  data.categories.push(name);saveData();input.value="";renderAll();showMessage("Category added.");
});
document.getElementById("category-list").addEventListener("click",e=>{
  const btn=e.target.closest("[data-category]");if(!btn)return;
  data.categories.splice(Number(btn.dataset.category),1);saveData();renderAll();showMessage("Category removed.");
});

function renderOrders(){
  const statuses=["Pending","Processing","Shipped","Delivered","Cancelled"];
  document.getElementById("orders-table").innerHTML=data.orders.map(o=>`<tr><td><strong>${safe(o.id)}</strong></td><td>${safe(o.customer)}</td><td>${safe(o.items)}</td><td>${money(o.total)}</td><td>${statusTag(o.status)}</td><td><select data-order-status="${safe(o.id)}">${statuses.map(s=>`<option ${o.status===s?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("")||emptyRow(6);
}
document.getElementById("orders-table").addEventListener("change",e=>{
  const id=e.target.dataset.orderStatus;if(!id)return;
  const order=data.orders.find(o=>o.id===id);if(!order)return;
  order.status=e.target.value;saveData();renderAll();showMessage("Order status updated.");
});

function renderRiders(){
  const riders=data.users.filter(u=>u.role==="Rider"&&u.status==="Active");
  document.getElementById("riders-table").innerHTML=data.orders.map(o=>`<tr><td><strong>${safe(o.id)}</strong></td><td>${safe(o.customer)}</td><td>${safe(o.address||"Not provided")}</td><td>${safe(o.rider||"Not assigned")}</td><td><select data-rider-order="${safe(o.id)}"><option value="">Unassigned</option>${riders.map(r=>`<option ${o.rider===r.name?"selected":""}>${safe(r.name)}</option>`).join("")}</select></td></tr>`).join("")||emptyRow(5);
}
document.getElementById("riders-table").addEventListener("change",e=>{
  const id=e.target.dataset.riderOrder;if(!id)return;
  const order=data.orders.find(o=>o.id===id);if(!order)return;
  order.rider=e.target.value;saveData();renderAll();showMessage(order.rider?"Rider assigned successfully.":"Rider assignment removed.");
});

function renderAll(){renderDashboard();renderListings();renderUsers();renderCategories();renderOrders();renderRiders();}
renderAll();
