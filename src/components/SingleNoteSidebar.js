import React, { Component } from 'react';
import FolderNoteContext from './FolderNoteContext.js';

export default class SingleNoteSidebar extends Component {

  static contextType = FolderNoteContext;

  getNoteById(noteId){
    const { notes } = this.context.contextValue;
    return notes.find(note => note.id === noteId);
  }

  getCurrentFolderId(){
    const currentNote = this.getNoteById(+this.props.currentNoteId);
    return currentNote && currentNote.folder_id;
  }

  showCurrentFolder(){
    const { folders } = this.context.contextValue;
    const folderId = this.getCurrentFolderId();
    const currentFolder = folders.find(folder => (
      folder.id === folderId
    ));
    return currentFolder && currentFolder.name;
  }

  render() {
    return (
      <div className="SingleNoteSidebar">
        <button className="add-folder" onClick={this.props.goBack}>&#8592; Go Back</button>
        <h3 className="folder-title">{this.showCurrentFolder()}</h3>
      </div>
    )
  }
}
