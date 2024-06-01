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
}

// Add Item
function addItem(e) {
  if (listInput.value === "") {
    alert("Add item to field");
  }

  if (isEditMode) {
    currentItem.firstChild.textContent = listInput.value;
    isEditMode = false;
    listInput.value = "";
    currentItem = null;
  } else {
    //   Create li
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(listInput.value));

    const editLink = document.createElement("a");
    editLink.className = "edit-item secondary-content";
    editLink.innerHTML = '<i class="fa fa-edit"></i>';
    li.appendChild(editLink);

    const deleteLink = document.createElement("a");
    deleteLink.className = "delete-item secondary-content";
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(deleteLink);

    // Append li to ul
    list.appendChild(li);

    //   Clear inout
    listInput.value = "";
  }

  e.preventDefault();
}

// Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure")) {
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
function clearList() {
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
