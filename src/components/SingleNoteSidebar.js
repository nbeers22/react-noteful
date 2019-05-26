import React from 'react';

const SingleNoteSidebar = (props) => {
  
  const getNoteById = (noteId) => {
    return props.notes.find( note => note.id === noteId);
  }

  const getCurrentFolderId = () => {
    const currentNote = getNoteById(props.currentNoteId);
    return currentNote.folderId;
  }

  const showCurrentFolder = () => {
    const folderId = getCurrentFolderId();
    const currentFolder = props.folders.find( folder => (
      folder.id === folderId
    ));
    return currentFolder.name;
  }

  return (
    <div className="SingleNoteSidebar">
      <a className="add-folder" onClick={props.goBack}>&#8592; Go Back</a>
      <h3 className="folder-title">{showCurrentFolder()}</h3>
    </div>
  )
}

export default SingleNoteSidebar;