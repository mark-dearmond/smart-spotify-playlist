import React from 'react';
import './Artists.css';

export default function Artists(props) {
  const {artists, selectArtist, onChange} = props;
  return (
    <div>
      <div className="row">
        <div className="col-sm-6 order-sm-12 mb-3 mb-sm-0">
          <form className="form-inline">
            <input className="form-control ml-auto" type="search" onChange={(e) => onChange(e.target.value)} placeholder="Search" aria-label="Search"/>
          </form>
        </div>
        <div className="col-sm-6 order-sm-1">
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
              <p className="artist-name mt-2">{artist.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}