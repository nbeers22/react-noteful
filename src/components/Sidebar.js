import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import FolderList from './FolderList';
import SingleNoteSidebar from './SingleNoteSidebar';

class Sidebar extends Component {

  render() {
    const { history } = this.props;
    const currentNoteId = this.props.location.pathname.split('/note/')[1];

    return (
      <aside className="Sidebar">
        <Route
          exact path='/'
          render={() => (
            <FolderList />
          )}
        />
        <Route
          path='/add-folder'
          render={() => (
            <FolderList />
          )}
        />
        <Route
          path='/folder/:folderId'
          render={() => (
            <FolderList />
          )}
        />
        <Route
          path='/note/:noteId'
          render={() => (
            <SingleNoteSidebar
              currentNoteId={currentNoteId}
              goBack={() => history.goBack()} />
          )}
        />
      </aside>
    )
  }
}

export default withRouter(Sidebar);