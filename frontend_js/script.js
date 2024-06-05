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
  try {
    const res = await fetch("http://localhost:5000/api/items");
    const items = await res.json();

    items.forEach((item) => {
      console.log(item);
      addItemToDOM(item);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Add Item to the database
async function addItem(e) {
  e.preventDefault();

  const itemInput = document.getElementById('item');
  const quantityInput = document.getElementById('quantity');
  const notesInput = document.getElementById('notes');

  if (itemInput.value === "") {
    alert("Add item to field");
    return;
  }

  const newItem = {
    name: itemInput.value,
    quantity: parseInt(quantityInput.value, 10) || 0,
    notes: notesInput.value || ""
  };

  if (isEditMode) {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${ItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      console.log(data);
      currentItem.firstChild.textContent = `${data.name} (Quantity: ${data.quantity}) - Notes: ${data.notes}`;
      isEditMode = false;
      itemInput.value = "";
      quantityInput.value = "";
      notesInput.value = "";
      currentItem = null;
    } catch (error) {
      console.error('Error updating item:', error);
    }
  } else {
    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      console.log(data);
      addItemToDOM(data);

      // Clear input fields
      itemInput.value = "";
      quantityInput.value = "";
      notesInput.value = "";
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
}

//display item once added
function addItemToDOM(item) {
  const list = document.getElementById('itemsContainer');

  if (!list) {
    console.error('List container not found');
    return;
  }

  if (!item || !item.name) {
    console.error('Invalid item:', item);
    return;
  }

  const li = document.createElement("li");
  li.className = "collection-item";

  const itemText = document.createTextNode(`${item.name} (Quantity: ${item.quantity || 0}) - Notes: ${item.notes || ''}`);
  li.appendChild(itemText);

  const editLink = document.createElement("a");
  editLink.className = "edit-item secondary-content";
  editLink.innerHTML = '<i class="fa fa-edit"></i>';
  editLink.setAttribute('data-id', item.id);
  li.appendChild(editLink);

  const deleteLink = document.createElement("a");
  deleteLink.className = "delete-item secondary-content";
  deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
  deleteLink.setAttribute('data-id', item.id);
  li.appendChild(deleteLink);

  list.appendChild(li);
}


// Remove item
async function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure")) {
      const itemId = e.target.parentElement.getAttribute('data-id');
      try {
        await fetch(`http://localhost:5000/api/items/${itemId}`, {
          method: "DELETE",
        });
        e.target.parentElement.parentElement.remove();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  }
}

// Edit Item
async function editItem(e) {
  if (e.target.parentElement.classList.contains("edit-item")) {
    const currentItem = e.target.parentElement.parentElement;
    const itemId = e.target.parentElement.getAttribute('data-id');
    const itemText = currentItem.firstChild.textContent.trim();
    const [itemName, itemDetails] = itemText.split('(Quantity:');
    const [itemQuantity, itemNotes] = itemDetails.split('- Notes:');
    const list = document.getElementById('itemsContainer');

    currentItem.innerHTML = `
      <input type="text" id="edit-item-name" value="${itemName.trim()}">
      <input type="number" id="edit-item-quantity" value="${itemQuantity.trim()}">
      <input type="text" id="edit-item-notes" value="${itemNotes.trim()}">
      <button id="save-edit-btn">Save</button>
    `;

    const saveEditBtn = currentItem.querySelector('#save-edit-btn');
    saveEditBtn.addEventListener('click', async () => {
      const updatedItem = {
        name: currentItem.querySelector('#edit-item-name').value.trim(),
        quantity: parseInt(currentItem.querySelector('#edit-item-quantity').value.trim(), 10),
        notes: currentItem.querySelector('#edit-item-notes').value.trim()
      };

      try {
        const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        });

        if (!res.ok) {
          throw new Error('Failed to update item');
        }

        const item = await res.json();

        // Clear the currentItem and append the updated item information
        currentItem.innerHTML = '';
        const itemText = document.createTextNode(`${item.name} (Quantity: ${item.quantity || 0}) - Notes: ${item.notes || ''}`);
        currentItem.appendChild(itemText);

        const editLink = document.createElement("a");
        editLink.className = "edit-item secondary-content";
        editLink.innerHTML = '<i class="fa fa-edit"></i>';
        editLink.setAttribute('data-id', item.id);
        currentItem.appendChild(editLink);

        const deleteLink = document.createElement("a");
        deleteLink.className = "delete-item secondary-content";
        deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
        deleteLink.setAttribute('data-id', item.id);
        currentItem.appendChild(deleteLink);

      } catch (error) {
        console.error('Error updating item:', error);
      }
    });
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
