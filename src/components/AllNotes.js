import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllNotes extends Component {
  render() {
    return (
      <div className="AllNotes main-container">
        <aside className="sidebar">
          <p>sidebar</p>
        </aside>
        <main>
          <p>main</p>
        </main>
      </div>
    )
  }
}
