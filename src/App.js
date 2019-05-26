import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import store from './store.js'
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import './App.css';

export default class App extends Component {

  state = {
    store: store
  }

  render(){

    const { folders, notes } = this.state.store;

    return (
      <div className="App">
        <header className="header">
          <Link to="/"><h1>Noteful</h1></Link>
        </header>
        <Sidebar folders={folders} notes={notes} />
        <Main notes={notes} />
        
        {/* // <Route
        //   path="/folder/:folderId"
        //   render={ () => <FolderNotes folders={folders} />}
        // />
        // <Route
        //   path="/note/:noteId"
        //   component={Note}
        // /> */}
      </div>
    );
  }
}
