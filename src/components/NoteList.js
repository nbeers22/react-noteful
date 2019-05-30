import React, { Component } from 'react';
import Note from './Note.js';
import FolderNoteContext from './FolderNoteContext.js';
import AddNoteButton from './AddNoteButton.js';

export default class NoteList extends Component {

  static contextType = FolderNoteContext;

  getNotes() {
    const { notes } = this.context.contextValue;

    return notes.map((note, index) => (
      <Note
        key={index}
        id={note.id}
        name={note.name}
        route={this.props.route}
        modified={note.modified}
        folderId={note.folderId}
        content={note.content} />
    ));
  }

  render() {

    return (
      <div className="NoteList">
        {this.getNotes()}
        <AddNoteButton />
      </div>
    )
  }
}
