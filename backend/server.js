const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Store contacts per username
let userContacts = {};

// Friendly message
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Get all contacts for a user
app.get('/contacts/:username', (req, res) => {
    const username = req.params.username;
    const contacts = userContacts[username] || [];
    res.json(contacts);
});

// Add a new contact for a user
app.post('/contacts', (req, res) => {
    const { username, name, phone } = req.body;
    if (!username || !name || !phone) {
        return res.status(400).json({ error: "Please provide username, name, and phone" });
    }

    if (!userContacts[username]) {
        userContacts[username] = [];
    }

    userContacts[username].push({ name, phone });
    res.status(201).json({ success: true });
});

// Delete a contact by index for a user
app.delete('/contacts/:username/:index', (req, res) => {
    const { username, index } = req.params;
    if (userContacts[username] && userContacts[username][index]) {
        userContacts[username].splice(index, 1);
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ error: "Contact not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
