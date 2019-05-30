import React, { Component } from 'react';
import FolderNoteContext from './FolderNoteContext';

export default class AddFolder extends Component {

  constructor(){
    super();
    this.nameInput = React.createRef();
    this.state = {
      errorMsg: '',
      formValid: false
    }
  }

  static contextType = FolderNoteContext;

  validateName = (value) => {
    if (value.length === 0) {
      this.setState({
        errorMsg: 'Please enter a folder name',
        formValid: false
      });
    }else if (value.length > 0 && value.length < 3) {
      this.setState({
        errorMsg: 'Folder name must be at least 3 characters',
        formValid: false
      });
    }else {
      this.setState({
        errorMsg: '',
        formValid: true
      });
    }
  }

  newFolder = (event) => {
    event.preventDefault();
    const { value } = this.nameInput.current;
    if(this.state.formValid){
      this.context.contextValue.addFolder(value);
    }
  }

  render() {
    return (
      <div className="AddFolder">
        <h1>Add New Folder</h1>
        <form onSubmit={event => this.newFolder(event)} className="add-folder-form">
          <label htmlFor="folder-name">Folder Name</label>
          <input type="text" ref={this.nameInput} defaultValue="" onChange={e => this.validateName(e.target.value)} id="folder-name"/>
          <div id="error">{this.state.errorMsg}</div>
          <button disabled={!this.state.formValid} type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
