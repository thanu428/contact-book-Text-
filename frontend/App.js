
const API_URL = "http://localhost:3000/contacts";

let contacts = [];
let deletedCount = 0;

// Get the username from input
function getUsername() {
  return document.getElementById('username').value.trim();
}

// Add new contact
async function addContact() {
  const username = getUsername();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!username || !name || !phone) {
    alert("Please fill in all fields including username.");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, phone })
  });

  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  loadContacts();
  updateRecentAdded();
}

// Load contacts for current user
async function loadContacts() {
  const username = getUsername();
  if (!username) return; // do nothing if no username entered

  const res = await fetch(`${API_URL}?username=${username}`);
  contacts = await res.json();
  renderContacts(contacts);
}

// Render contacts
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
  const username = getUsername();
  if (!username) return;

  await fetch(`${API_URL}/${index}?username=${username}`, { method: 'DELETE' });
  deletedCount++;
  document.getElementById('deletedCount').textContent = deletedCount;
  loadContacts();
}

// Update recently added
function updateRecentAdded() {
  const recentAdded = document.getElementById('recentAdded');
  recentAdded.textContent = parseInt(recentAdded.textContent) + 1;
}

// Load contacts whenever username changes
document.getElementById('username').addEventListener('change', loadContacts);
