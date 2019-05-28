import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import store from './store.js'
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import FolderNoteContext from './components/FolderNoteContext.js'
import './App.css';

export default class App extends Component {

  state = {
    store: store
  }

  deleteNote = (noteID) => {
    const { notes, folders } = this.state.store;

    const newNotes = notes.filter( note => (
      note.id !== noteID
    ));

    this.setState({
      store: {
        folders: folders,
        notes: newNotes
      }
    })
  }

  render(){
    const { folders, notes } = this.state.store;
    const contextValue = {
      folders: folders,
      notes: notes,
      deleteNote: (noteID) => {
        this.deleteNote(noteID)
      }
    }

    return (
      <FolderNoteContext.Provider value={{ contextValue }}>
        <div className="App">
          <header className="header">
            <Link to="/"><h1>Noteful</h1></Link>
          </header>
          <Sidebar />
          <Main />
        </div>
      </FolderNoteContext.Provider>
    );
  }
}
