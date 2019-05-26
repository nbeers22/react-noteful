import React, { Component } from 'react';
import Note from './Note.js'

export default class FolderNotes extends Component {

  getFolderId(){
    const { pathname } = this.props.location.props.location;
    return pathname.split('folder/')[1];
  }

  getFolderNotes(){
    const folderId = this.getFolderId();
    return this.props.notes.map( (note,index) => (
      note.folderId === folderId && 
        <Note 
          key={index}
          id={note.id}
          name={note.name}
          route={this.props.route}
          modified={note.modified}
        />
    ));
  }

  render() {
    return (
      <div className="FolderNotes">
        {this.getFolderNotes()}
      </div>
    )
  }
}
