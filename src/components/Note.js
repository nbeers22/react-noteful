import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FolderNoteContext from './FolderNoteContext.js'
import './Note.css';

class Note extends Component {

  static contextType = FolderNoteContext;

  convertModifiedIntoDate(){
    const time = new Date(this.props.modified)
    return time.toLocaleDateString();
  }

  render() {

    const { id, name, content, route } = this.props;

    return (
      <div className="Note">
        { !route.includes('/note/') && <Link to={`/note/${id}`}><h3>{name}</h3></Link>}
        <div className="note-columns">
          <aside>
            <p>Modified: {this.convertModifiedIntoDate()}</p>
          </aside>
          <Route
            path="/note/:noteId"
            render={() => (
              <div>
                <h2 className="note-title">{name}</h2>
                <p className="note-content">{content}</p>
              </div>
            )}
          />
          <aside>
            <button
              className="delete"
              onClick={() => {
                this.context.contextValue.deleteNote(id)
                if(route.includes('/note/')){
                  this.props.history.push('/')
                }
              }}
            >
              Delete Note
            </button>
          </aside>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  content: PropTypes.string,
  route: PropTypes.string.isRequired,
}

export default withRouter(Note)