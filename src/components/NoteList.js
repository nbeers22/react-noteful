import React, { Component } from 'react';
import Note from './Note.js';

export default class NoteList extends Component {

  getNotes() {
    return this.props.notes.map((note, index) => (
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
      </div>
    )
  }
}
