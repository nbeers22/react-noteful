import React, { Component } from 'react';
import FolderNoteContext from './FolderNoteContext';

export default class AddFolder extends Component {

  constructor(){
    super();
    this.nameInput = React.createRef();
  }

  static contextType = FolderNoteContext;

  newFolder = (event) => {
    event.preventDefault();
    const value = this.nameInput.current.value;
    if(value.length > 0){
      document.querySelector('#error').innerText = "";
      this.context.contextValue.addFolder(value);
    }else{
      document.querySelector('#error').innerText = "Please enter a folder name";
    }
  }

  render() {
    return (
      <div className="AddFolder">
        <h1>Add New Folder</h1>
        <form onSubmit={event => this.newFolder(event)} className="add-folder-form">
          <label htmlFor="folder-name">Folder Name</label>
          <input type="text" ref={this.nameInput} id="folder-name"/>
          <div id="error"></div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
