import React from 'react';

export default function Playlist(props) {
  const {playlist} = props;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-0">Playlist</h2>
          <p>Your new playlist</p>
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
            {playlist.map(track => 
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td>{track.album.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


