const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let contacts = [];

// ✅ Friendly message at the base URL
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Get all contacts
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Add new contact
app.post('/contacts', (req, res) => {
    const { name, phone } = req.body;
    contacts.push({ name, phone });
    res.status(201).json({ success: true });
});

// Delete contact by index
app.delete('/contacts/:index', (req, res) => {
    const index = req.params.index;
    if (contacts[index]) {
        contacts.splice(index, 1);
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ error: "Contact not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

