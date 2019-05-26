import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css';

function Folder(props){

  const { name, id } = props;

  return(
    <div className="Folder">
      <NavLink to={`/folder/${id}`}>{name}</NavLink>
    </div>
  )
}

export default Folder;