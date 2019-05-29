import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import NoteList from './NoteList.js';
import FolderNotes from './FolderNotes.js';
import Note from './Note.js';
import FolderNoteContext from './FolderNoteContext.js'
import AddFolder from './AddFolder.js';
import AddNote from './AddNote.js';

class Main extends Component {

  static contextType = FolderNoteContext;

  getNote(){
    const { notes } = this.context.contextValue;
    const noteId = this.props.location.pathname.split('/note/')[1];
    const note = notes.find( note => (
      note.id === noteId
    ));
    return (
      <Note
        id={note.id}
        name={note.name}
        content={note.content}
        route={this.props.location.pathname}
        modified={note.modified} />
    )
  }

  render() {
    const path = this.props.location.pathname

    return (
      <main className="Main">
        <Route
          exact path='/'
          render={() => (
            <NoteList route={path} />
          )}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
        <Route
          path='/folder/:folderId'
          render={() => (
            <FolderNotes
              location={this}
              route={path} />
          )}
        />
        <Route
          exact path='/note/:noteId'
          render={() => (
            this.getNote()
          )}
        />
      </main>
    )
  }
}

export default withRouter(Main);