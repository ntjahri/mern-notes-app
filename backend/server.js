const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/Note');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (or local MongoDB)
mongoose.connect('mongodb+srv://jatinrr2213_db_user:pr0gp3SL8n2U4ir4@cluster0.gzbqsd5.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- API ROUTES ---

// 1. Get all notes (READ)
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create a new note (CREATE)
app.post('/api/notes', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Delete a note (DELETE)
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));