import './App.css';
import { Note as NoteType, Label } from "./types"; // Alias the imported Note type to avoid conflicts.
import { dummyNotesList } from "./constant";
import { ClickCounter } from "./hooksExercise";
import ToggleTheme from "./hooksExercise";
import { useState, useEffect } from "react";

// Define the Note interface
interface Note {
  id: number;
  title: string;
  content: string;
  label: string;
}

const initialNote: Note = {
  id: -1,
  title: "",
  content: "",
  label: Label.other, // Default label
};

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList); // Notes state
  const [createNote, setCreateNote] = useState<Note>(initialNote); // Note creation state
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote); // Selected note for editing
  const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]); // Favorite notes state
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false); // State for theme toggle

  // Function to toggle the favorite state of a note by its title.
  const toggleFavorite = (noteTitle: string) => {
    setFavoriteNotes((prevFavorites) =>
      prevFavorites.includes(noteTitle)
        ? prevFavorites.filter((title) => title !== noteTitle)
        : [...prevFavorites, noteTitle]
    );
  };

  // Log the list of favorite notes to observe changes.
  useEffect(() => {
    console.log("Favorite Notes:", favoriteNotes);
  }, [favoriteNotes]);

  // Handler for creating a note
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (createNote.title.trim() === "" || createNote.content.trim() === "") {
      return; // Prevent creating an empty note
    }
    createNote.id = notes.length + 1; // Assign a new ID
    setNotes([createNote, ...notes]); // Add new note to the list
    setCreateNote(initialNote); // Reset the creation state
  };

  // Function to delete a note
  const deleteNoteHandler = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  // Toggle theme handler
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };
  useEffect(() => {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const contentInput = document.getElementById("content") as HTMLTextAreaElement;
  
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement; // Type assertion
      target.style.backgroundColor = "#e0f7fa"; // Light blue background on focus
    };
  
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement; // Type assertion
      target.style.backgroundColor = ""; // Reset background on blur
    };
  
    if (titleInput) {
      titleInput.addEventListener("focus", handleFocus);
      titleInput.addEventListener("blur", handleBlur);
    }
    if (contentInput) {
      contentInput.addEventListener("focus", handleFocus);
      contentInput.addEventListener("blur", handleBlur);
    }
  
    // Cleanup event listeners on unmount
    return () => {
      if (titleInput) {
        titleInput.removeEventListener("focus", handleFocus);
        titleInput.removeEventListener("blur", handleBlur);
      }
      if (contentInput) {
        contentInput.removeEventListener("focus", handleFocus);
        contentInput.removeEventListener("blur", handleBlur);
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className={`app-container ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="toggle-theme-container">
        <button className="toggle-theme-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Note Content"
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          />
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => toggleFavorite(note.title)}>
                {favoriteNotes.includes(note.title) ? "❤️" : "♡"}
              </button>
              <button onClick={() => setSelectedNote(note)}>✏️</button>
              <button onClick={() => deleteNoteHandler(note.id)}>🗑️</button>
            </div>

            {/* Editable Title */}
            <h2
              contentEditable={selectedNote.id === note.id}
              onBlur={(e) => {
                const updatedTitle = e.currentTarget.textContent || "";
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, title: updatedTitle } : n
                  )
                );
              }}
            >
              {note.title}
            </h2>

            {/* Editable Content */}
            <p
              contentEditable={selectedNote.id === note.id}
              onBlur={(e) => {
                const updatedContent = e.currentTarget.textContent || "";
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, content: updatedContent } : n
                  )
                );
              }}
            >
              {note.content}
            </p>

            {/* Editable Label */}
            <select
              value={note.label}
              onChange={(e) => {
                const updatedLabel = e.target.value;
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, label: updatedLabel } : n
                  )
                );
              }}
              disabled={selectedNote.id !== note.id} // Disable if not selected
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
        ))}
      </div>

      <div className="favorite-list">
        <h3>List of favorites:</h3>
        <ul>
          {favoriteNotes.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;