import React from 'react';
import './Playlist.css'

export default function Playlist(props) {
  const {playlist, newPlaylist} = props;
  return (
    <div>
      <div className="row">
        <div className="col-sm-6 info">
          <h2 className="mb-0">Playlist</h2>
          <p>Your new playlist</p>
        </div>
        <div className="col-sm-6 button-group">
          <button onClick={newPlaylist} className="btn btn-primary mb-3 mb-md-0">Create New</button>
          <a href={playlist.external_urls.spotify} className="btn btn-secondary mb-3 mb-md-0 ml-0 ml-md-2">Listen Now</a>
        </div>
      </div>
      <div className="row">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.items.map(item => 
              <tr key={item.track.id}>
                <td>{item.track.name}</td>
                <td>{item.track.artists[0].name}</td>
                <td>{item.track.album.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


