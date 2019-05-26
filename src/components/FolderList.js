import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Folder from './Folder.js';

export default class FolderList extends Component {

  getFolders(){
    return this.props.folders.map((folder, index) => (
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
