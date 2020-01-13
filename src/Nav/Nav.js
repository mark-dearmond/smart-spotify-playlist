import React from 'react';
import  User from '../User/User';
import "./Nav.css";

export default function Nav (props) {
  const {user, onChange} = props;
  return (
    <nav className="navbar navbar navbar-dark bg-dark justify-content-between mb-5">
      <span href="" className="navbar-brand">
        <User user={user}></User>
      </span>
    </nav>
  );
}

