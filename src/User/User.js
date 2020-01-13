import React from 'react';
import "./User.css";

export default function User(props) {
  const {user} = props;
  return (
    <div className="user">
      <img src={user.images[0].url} className="user-image rounded-circle" alt=""/>
      <p className="user-name">{user.display_name}</p>
    </div>
  );
}