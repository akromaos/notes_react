import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState({message: null, type: null})

const toggleImportanceOf = (id) => {
  const note = notes.find(n => n.id === id)
  const changedNote = {...note, important: !note.important}

  noteService.update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(note => note.id === id ? returnedNote : note))
  }).catch(error => {
    setErrorMessage({
      message: `Note '${note.content}' was already removed from server`,
      type: 'error'
  })
    setTimeout(() => {
      setErrorMessage({message: null, type: null})
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })
}

  useEffect(() => {
    noteService.getAll().then(initialData => setNotes(initialData))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService.create(noteObject).then(returnedNote => setNotes([...notes, returnedNote]))
    setErrorMessage({message: 'created a new note', type: 'success'})
    setNewNote('')
    setTimeout(() => {
      setErrorMessage({message: null, type: null})
    }, 5000)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification rmessage={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer />
    </div>
  )
}

export default App