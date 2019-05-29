import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

function Folder(props){

  const { name, id } = props;

  return(
    <div className="Folder">
      <NavLink to={`/folder/${id}`}>{name}</NavLink>
    </div>
  )
}

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Folder;