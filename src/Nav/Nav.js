import React from 'react';
import  User from '../User/User';
import "./Nav.css";

export default function Nav (props) {
  const {user, onChange} = props;
  return (
    <nav className="navbar navbar navbar-dark bg-dark justify-content-between mb-5">
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" onChange={(e) => onChange(e.target.value)} placeholder="Search" aria-label="Search"/>
      </form>
      <span href="" className="navbar-brand">
        <User user={user}></User>
      </span>
    </nav>
  );
}

