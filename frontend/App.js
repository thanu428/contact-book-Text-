const API_URL = "http://localhost:3000/contacts";
let contacts = [];
let deletedCount = 0;

// Add new contact
async function addContact() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !phone) {
    alert("Please fill in both fields.");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone })
  });

  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  loadContacts();
  updateRecentAdded();
}

// Load all contacts
async function loadContacts() {
  const res = await fetch(API_URL);
  contacts = await res.json();
  renderContacts(contacts);
}

// Render contact list
function renderContacts(list) {
  const listElement = document.getElementById('contactList');
  listElement.innerHTML = "";

  list.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${contact.name} - ${contact.phone}
      <button onclick="deleteContact(${index})">Delete</button>
    `;
    listElement.appendChild(li);
  });

  document.getElementById('totalContacts').textContent = list.length;
}

// Search contacts
function searchContacts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.phone.includes(query)
  );
  renderContacts(filtered);
}

// Delete contact
async function deleteContact(index) {
  await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
  deletedCount++;
  document.getElementById('deletedCount').textContent = deletedCount;
  loadContacts();
}

// Update recently added count
function updateRecentAdded() {
  const recentAdded = document.getElementById('recentAdded');
  recentAdded.textContent = parseInt(recentAdded.textContent) + 1;
}

loadContacts();

