import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import FolderList from './FolderList';
import SingleNoteSidebar from './SingleNoteSidebar';

class Sidebar extends Component {
  render() {

    const { folders,notes } = this.props;
    const currentNoteId = this.props.location.pathname.split('/note/')[1];

    return (
      <aside className="Sidebar">
        <Route
          exact path='/'
          render={() => (
            <FolderList folders={folders} />
          )}
        />
        <Route
          path='/folder/:folderId'
          render={() => (
            <FolderList folders={folders} />
          )}
        />
        <Route
          path='/note/:noteId'
          render={() => (
            <SingleNoteSidebar
              currentNoteId={currentNoteId}
              notes={notes}
              folders={folders}
              goBack={() => this.props.history.goBack()} />
          )}
        />
      </aside>
    )
  }
}

export default withRouter(Sidebar);