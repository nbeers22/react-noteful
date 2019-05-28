import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Folder from './Folder.js';
import FolderNoteContext from './FolderNoteContext.js'

export default class FolderList extends Component {

  static contextType = FolderNoteContext;

  getFolders(){
    const { folders } = this.context.contextValue;

    return folders.map((folder, index) => (
      <Folder key={index} id={folder.id} name={folder.name} />
    ));
  }

  render() {
    return (
      <div className="FolderList">
        {this.getFolders()}
        <Link className="add-folder" to="/add-folder">Add Folder+</Link>
      </div>
    )
  }
}
