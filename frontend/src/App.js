import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://mern-notes-app-1-seeo.onrender.com/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch all notes from backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle Add Note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await axios.post(API_URL, { title, content });
      setTitle('');
      setContent('');
      fetchNotes(); // refresh list
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  // Handle Delete Note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes(); // refresh list
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>📝 Simple Notes App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea 
          placeholder="Note content..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', height: '80px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div>
        {notes.length === 0 ? <p>No notes yet!</p> : notes.map((note) => (
          <div key={note._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '6px', marginBottom: '10px', position: 'relative' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{note.title}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#555' }}>{note.content}</p>
            <button 
              onClick={() => handleDelete(note._id)}
              style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;