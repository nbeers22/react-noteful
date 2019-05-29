import React, { Component } from 'react';
import FolderNoteContext from './FolderNoteContext';
import ValidationError from './ValidationError';

export default class AddNote extends Component {

  constructor() {
    super();
    this.state = {
      noteName: '',
      folderID: '',
      noteContent: '',
      noteNameValid: false,
      folderIDValid: false,
      noteContentValid: false,
      formValid: false,
      validationMessages: {
        noteName: '',
        folderID: '',
        noteContent: '',
      }
    }
  }

  static contextType = FolderNoteContext;

  updateNoteName(noteName) {
    this.setState({ noteName }, () => {
      this.validateNoteName(noteName)
    });
  }

  updateFolderID(folderID) {
    this.setState({ folderID }, () => {
      this.validateFolderID(folderID)
    });
  }

  updateNoteContent(noteContent) {
    this.setState({ noteContent }, () => {
      this.validateNoteContent(noteContent)
    });
  }

  validateNoteName(fieldValue){
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Note name is required';
      hasError = true;
    }
    this.setState({
      validationMessages: fieldErrors,
      noteNameValid: !hasError
    }, this.formValid);
  }
  
  validateNoteContent(fieldValue){
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Note content is required';
      hasError = true;
    }
    this.setState({
      validationMessages: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid);
  }
  
  validateFolderID(fieldValue){
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue === "Select folder") {
      fieldErrors.name = 'Please select a folder';
      hasError = true;
    }
    this.setState({
      validationMessages: fieldErrors,
      folderIDValid: !hasError
    }, this.formValid);
  }

  formValid() {
    this.setState({
      formValid: this.state.noteNameValid && this.state.folderIDValid && this.state.noteContentValid
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)

    this.state.formValid === true
      ? this.newNote()
      : alert('Please fill out the entire form before submitting');
  }

  newNote = () => {
    const { noteName, folderID, noteContent } = this.state;
    const values = {
      noteName: noteName,
      folderID: folderID,
      noteContent: noteContent
    }
    this.context.contextValue.addNote(values);
  }

  getFolderNames(){
    return this.context.contextValue.folders.map( folder => (
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    ));
  }

  render() {
    return (
      <div className="AddNote">
        <h1>Add New Note</h1>
        <form onSubmit={event => this.handleSubmit(event)} className="add-note-form">
          <div className="form-group">
            <label htmlFor="note-name">Note Name</label>
            <input type="text" id="note-name" onChange={e => this.updateNoteName(e.target.value)} />
            <ValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessages.noteName} />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Note Content</label>
            <textarea id="note-content" onChange={e => this.updateNoteContent(e.target.value)}></textarea>
            <ValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.noteContent} />
          </div>
          <div className="form-group">
            <label htmlFor="folder-name">Folder Name</label>
            <select name="folder-name" id="folder-name" defaultValue="Select folder" onChange={e => this.updateFolderID(e.target.value)}>
              <option value="Select folder" disabled>Select folder</option>
              {this.getFolderNames()}
            </select>
            <ValidationError hasError={!this.state.FolderIDValid} message={this.state.validationMessages.FolderID} />
          </div>
          <button type="submit" disabled={!this.state.formValid}>Submit</button>
        </form>
      </div>
    )
  }
}
