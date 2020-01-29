import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./Util/hash";
import API from "./API/API";
import logo from "./Spotify_Logo.png";
import "./App.css";
import Welcome from "./Welcome/Welcome";
import Nav from "./Nav/Nav";
import Artists from "./Artists/Artists";
import Playlist from "./Playlist/Playlist";

const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user: null,
      artists: null,
      playlist: null
    };
  }

  async componentDidMount() {
    const token = hash.access_token;
    if (token) {
      const user = await API.getUser(token);
      const artists = await API.getTopArtists(token);
      this.setState({ token, user, artists });
    }
  }

  setArtists = async query => {
    const artists =
      query && query.length >= 1
        ? await API.getSearch(query, this.state.token)
        : await API.getTopArtists(this.state.token);
    this.setState({ artists });
  };

  buildPlaylist = async (artistId, artistName) => {
    let tracks = [];
    const selectedArtistTracks = await API.getTopTracks(
      artistId,
      this.state.token
    );
    const selectedArtistTrack = await selectedArtistTracks[
      Math.round(Math.random() * 5)
    ];
    const relatedArtists = await API.getRelatedArtists(
      artistId,
      this.state.token
    );
    let relatedArtistsTracks = relatedArtists.map(async artist => {
      let topTracks = await API.getTopTracks(artist.id, this.state.token);
      return topTracks[Math.round(Math.random() * 5)];
    });
    tracks = await Promise.all(relatedArtistsTracks);
    tracks = await [selectedArtistTrack, ...tracks];
    const uris = { uris: tracks.map(track => track.uri) };
    const createdPlaylist = await API.createPlaylist(
      { name: artistName + " Smart Playlist" },
      this.state.user.id,
      this.state.token
    );
    await API.addTracks(uris, createdPlaylist.id, this.state.token);
    const playlist = await API.getPlayist(createdPlaylist.id, this.state.token);
    this.setState({ playlist, artists: null });
  };

  newPlaylist = async () => {
    await this.setArtists();
    this.setState({ playlist: null });
  };

  render() {
    const { token, user, artists, playlist } = this.state;
    return (
      <div className="container-fluid">
        {!token && <Welcome url={authUrl} logo={logo}></Welcome>}
        {token && (
          <div>
            <Nav user={user}></Nav>
            {artists && (
              <Artists
                artists={artists.items}
                selectArtist={this.buildPlaylist}
                onChange={this.setArtists}
              ></Artists>
            )}
            {playlist && (
              <Playlist
                playlist={playlist}
                newPlaylist={this.newPlaylist}
              ></Playlist>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
