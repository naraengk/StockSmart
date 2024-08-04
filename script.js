let pantry = [];

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

function addItem() {
  const itemName = capitalizeWords(document.getElementById('item-name').value.trim());
  const itemAmount = document.getElementById('item-amount').value.trim();
  const itemMetric = document.getElementById('item-metric').value.trim();
  
  if (itemName && itemAmount && itemMetric) {
    const existingItem = pantry.find(item => item.name === itemName && item.metric === itemMetric);
    if (existingItem) {
      existingItem.quantity = `${parseInt(existingItem.quantity) + parseInt(itemAmount)}`;
    } else {
      pantry.push({ name: itemName, quantity: itemAmount, metric: itemMetric });
    }
    document.getElementById('item-name').value = '';
    document.getElementById('item-amount').value = '';
    document.getElementById('item-metric').value = '';
    renderPantryList();
  }
}

function increaseQuantity(itemName) {
  const item = pantry.find(item => item.name === itemName);
  if (item) {
    item.quantity = `${parseInt(item.quantity) + 1}`;
  }
  renderPantryList();
}

function decreaseQuantity(itemName) {
  const item = pantry.find(item => item.name === itemName);
  if (item && parseInt(item.quantity) > 1) {
    item.quantity = `${parseInt(item.quantity) - 1}`;
  } else {
    pantry = pantry.filter(i => i.name !== itemName);
  }
  renderPantryList();
}

function deleteItem(itemName) {
  pantry = pantry.filter(item => item.name !== itemName);
  renderPantryList();
}

function renderPantryList() {
  const pantryList = document.getElementById('pantry-list');
  pantryList.innerHTML = '';
  pantry.forEach(item => {
    const itemRow = document.createElement('tr');
    itemRow.className = 'pantry-item';
    itemRow.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}${item.metric}</td>
      <td class="pantry-item-actions">
        <button onclick="increaseQuantity('${item.name}')">+</button>
        <button onclick="decreaseQuantity('${item.name}')">-</button>
        <button onclick="deleteItem('${item.name}')">Delete</button>
      </td>
    `;
    pantryList.appendChild(itemRow);
  });
}

renderPantryList();
