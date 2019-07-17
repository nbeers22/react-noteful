import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import FolderNoteContext from './components/FolderNoteContext.js';
import FolderError from './components/FolderError.js';
import NoteError from './components/NoteError.js';
import config from './config.js';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      store: {
        folders: [],
        notes: []
      }
    }
  }
  componentDidMount(){
    this.getData();
  }

  getData(){
    const urls = [
      config.API_ENDPOINT + 'api/folders',
      config.API_ENDPOINT + 'api/notes'
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
          store
        });
      })
  }

  deleteNote = (noteID) => {
    fetch(config.API_ENDPOINT + `api/notes/${noteID}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => this.getData())
  }

  addFolder = (folderName) => {
    const folderID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    fetch(config.API_ENDPOINT + `api/folders`, {
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
    const { folderID, id, noteContent, noteName } = values;
    const date = new Date();
    const postObj = {
      folder_id: folderID,
      content: noteContent,
      id: id,
      name: noteName,
      date_created: date.toLocaleString()
    }

    fetch(config.API_ENDPOINT + `api/notes`, {
      method: 'POST',
      body: JSON.stringify(postObj),
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
      folders,
      notes,
      deleteNote: (noteID) => {
        this.deleteNote(noteID)
      },
      addFolder: (folderName) => {
        this.addFolder(folderName)
      },
      addNote: (values) => {
        this.addNote(values)
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