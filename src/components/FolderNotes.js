import React, { Component } from 'react';
import Note from './Note.js';
import FolderNoteContext from './FolderNoteContext.js';
import AddNoteButton from './AddNoteButton.js';

export default class FolderNotes extends Component {

  static contextType = FolderNoteContext;

  getFolderId(){
    const { pathname } = this.props.location.props.location;
    return pathname.split('folder/')[1];
  }

  getFolderNotes(){
    const { notes } = this.context.contextValue;
    const folderId = this.getFolderId();
    
    return notes.map( (note,index) => {
      return note.folder_id === +folderId && 
      <Note 
        key={index}
        id={note.id}
        name={note.name}
        route={this.props.route}
        modified={note.date_created}
      />
    });
  }

  render() {
    return (
      <div className="FolderNotes">
        {this.getFolderNotes()}
        <AddNoteButton />
      </div>
    )
  }
}
