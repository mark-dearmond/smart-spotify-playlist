import React from 'react';
import './Artists.css';
import Truncate from '../Util/Truncate';

export default function Artists(props) {
  const {artists, selectArtist} = props;
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-0">Artists</h2>
          <p>Choose an artists to build a smart playlist from</p>
        </div>
      </div>
      <div className="row mt-4">
        {artists.map(artist => 
          <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center" key={artist.id}>
            <div className="artist p-3 mb-4" onClick={() => selectArtist(artist.id, artist.name)}>
              {artist.images.length > 0 &&
                <div className="artist-image" style={{ backgroundImage: `url(${artist.images[0].url.toString()})` }}></div>
              }
              {artist.images.length === 0 &&
                <div className="artist-image no-image"></div>
              }
              <p className="artist-name mt-2">{Truncate(artist.name, 15)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}