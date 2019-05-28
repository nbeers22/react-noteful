import React from 'react';

const FolderNoteContext = React.createContext({
  folders: null,
  notes: null,
  deleteNote: () => {

  }
})

export default FolderNoteContext