const form = document.querySelector("#list-form");
const list = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-list");
const filter = document.querySelector("#filter");
const listInput = document.querySelector("#item");

let isEditMode = false;
let currentItem;

// Load all events
loadEventListeners();

function loadEventListeners() {
  // Add item
  form.addEventListener("submit", addItem);
  //   Remove item
  list.addEventListener("click", removeItem);
  // Edit item
  list.addEventListener("click", editItem);
  //   Clear list
  clearBtn.addEventListener("click", clearList);
  //   Filter list
  filter.addEventListener("keyup", filterList);
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getItems);
}

// Fetch items from backend
async function getItems() {
  const res = await fetch("http://localhost:5000/api/items");
  const items = await res.json();

  items.forEach((item) => {
    addItemToDOM(item);
  });
}

// Add Item
async function addItem(e) {
  e.preventDefault();
  if (listInput.value === "") {
    alert("Add item to field");
  }

  const newItem = listInput.value;

  if (isEditMode) {
    // Update item in backend
    const res = await fetch(`http://localhost:5000/api/items/${ItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: newItem }),
    });
    const data = await res.json();
    currentItem.firstChild.textContent = data.item.name;
    isEditMode = false;
    listInput.value = "";
    currentItem = null;
  } else {
    // Send new item to backend
    const res = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: newItem }),
    });
    const data = await res.json();
    addItemToDOM(data.item);

    // Clear input
    listInput.value = "";
    //   Create li
  }
}

// Add item to DOM
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(item));

  const editLink = document.createElement("a");
  editLink.className = "edit-item secondary-content";
  editLink.innerHTML = '<i class="fa fa-edit"></i>';
  li.appendChild(editLink);

  const deleteLink = document.createElement("a");
  deleteLink.className = "delete-item secondary-content";
  deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(deleteLink);

  list.appendChild(li);
}

// Remove Item
async function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure")) {
      const item = e.target.parentElement.parentElement.firstChild.textContent;
      await fetch(`http://localhost:5000/api/items/${item}`, {
        method: "DELETE",
      });
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Edit Item
function editItem(e) {
  if (e.target.parentElement.classList.contains("edit-item")) {
    currentItem = e.target.parentElement.parentElement;
    listInput.value = currentItem.firstChild.textContent;
    isEditMode = true;
  }
}

// Clear list
async function clearList() {
  await fetch("http://localhost:5000/api/items", {
    method: "DELETE",
  });
  list.innerHTML = "";
}

// Filter list
function filterList(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (item) {
    const itemText = item.firstChild.textContent;
    if (itemText.includes(text)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
