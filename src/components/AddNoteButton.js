import React from 'react';
import { Link } from 'react-router-dom';

export default function AddNoteButton(){
  return (
    <div className="Note">
      <button className="add-note">
        <Link to="/add-note">Add Note+</Link>
      </button>
    </div>
  )
}