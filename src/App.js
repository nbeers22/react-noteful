import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import store from './store.js'
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import FolderNoteContext from './components/FolderNoteContext.js'
import './App.css';

export default class App extends Component {

  constructor(){
    super();
    this.getData();
    this.state = {
      store: {
        folders: [],
        notes: []
      }
    }
  }

  getData(){
    const urls = [
      'http://localhost:9090/folders',
      'http://localhost:9090/notes'
    ];
    Promise.all(urls.map(url => fetch(url)))
      .then(responses => Promise.all(
        responses.map(response => response.json())
      ))
      .then(data => {
        const store = {};
        store.folders = [...data[0]];
        store.notes = [...data[1]];
        this.setState({
          store: store
        });
      })
  }

  deleteNote = (noteID) => {
    fetch(`http://localhost:9090/notes/${noteID}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => this.getData())
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
