import React from 'react';

export default function Welcome(props) {
  const {logo, url} = props;
  return (
    <div className="text-center">
      <img src={logo} className="logo" alt="logo" />
      <a href={url} 
         className="btn btn-primary">Get Started</a>
    </div>
  );
}