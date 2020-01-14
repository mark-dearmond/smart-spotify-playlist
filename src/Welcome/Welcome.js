import React from 'react';
import image from '../mixtape.png';

export default function Welcome(props) {
  const {logo, url} = props;
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="https://mark-dearmond.github.io/smart-spotify-playlist/">
          <img src={logo} height="40" className="d-inline-block align-middle" alt="logo"/>
          <b>Smart Playlist</b>
        </a>
      </nav>
      <div className="row">
        <div className="col-12">
          <div className="jumbotron jumbotron-fluid" style={{backgroundImage: "url(" + image + ")"}}>
            <div className="container">
              <h1 className="display-4">Smart Playlist</h1>
              <p className="lead">Create a specially curated playlist based on your favorite artist</p>
              <a href={url} 
               className="btn btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="mb-0">Mark DeArmond</p>
      </footer>
    </div>
  );
}