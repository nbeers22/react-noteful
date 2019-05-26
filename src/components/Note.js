import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Note.css';

export default class Note extends Component {

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
            <button className="delete">Delete Note</button>
          </aside>
        </div>
      </div>
    )
  }
}
