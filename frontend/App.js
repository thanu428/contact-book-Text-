const API_URL = "https://contact-book-backend.onrender.com/contacts";


async function addContact() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  if (!name || !phone) return alert("Please fill in both fields.");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone })
  });

  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  loadContacts();
}

async function loadContacts() {
  const res = await fetch(API_URL);
  const contacts = await res.json();

  const list = document.getElementById('contactList');
  list.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${contact.name} - ${contact.phone}
      <button onclick="deleteContact(${index})">Delete</button>`;
    list.appendChild(li);
  });
}

async function deleteContact(index) {
  await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
  loadContacts();
}

loadContacts();
