import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import FolderNoteContext from './components/FolderNoteContext.js';
import FolderError from './components/FolderError.js';
import NoteError from './components/NoteError.js';
import './App.css';

class App extends Component {

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

  addFolder = (folderName) => {
    const folderID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      body: JSON.stringify({
        id: folderID,
        name: folderName
      }),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if(!response.ok){
        alert(`Error: ${response.statusText}`)
      }else{
        this.getData();
        this.props.history.push('/');
      }
    });
  }
  
  addNote = (values) => {
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if(!response.ok){
        alert(`Error: ${response.statusText}`)
      }else{
        this.getData();
        this.props.history.push('/');
      }
    });
  }

  render(){
    const { folders, notes } = this.state.store;
    const contextValue = {
      folders: folders,
      notes: notes,
      deleteNote: (noteID) => {
        this.deleteNote(noteID)
      },
      addFolder: (folderName) => {
        this.addFolder(folderName)
      },
      addNote: (values) => {
        this.addFolder(values)
      },
    }

    return (
      <FolderNoteContext.Provider value={{ contextValue }}>
        <div className="App">
          <header className="header">
            <Link to="/"><h1>Noteful</h1></Link>
          </header>
          <FolderError>
            <Sidebar />
          </FolderError>
          <NoteError>
            <Main />
          </NoteError>
        </div>
      </FolderNoteContext.Provider>
    );
  }
}

export default withRouter(App);