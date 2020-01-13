import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./Util/hash";
import { getUser, getTopArtists, getSearch, getRelatedArtists, getTopTracks, createPlaylist, addTracks, getPlayist } from './API/API'
import logo from './Spotify_Logo.png';
import "./App.css";
import Welcome from './Welcome/Welcome';
import Nav from './Nav/Nav';
import Artists from './Artists/Artists';
import Playlist from './Playlist/Playlist'

const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

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
      const user = await getUser(token);
      const artists = await getTopArtists(token);
      await this.setState({token, user, artists});
    }
  }

  setArtists = async (query) => {
    const artists = query && query.length >= 1 ? await getSearch(query, this.state.token) : await getTopArtists(this.state.token)
    await this.setState({artists})
  }

  buildPlaylist = async (artistId, artistName) => {
    let tracks = [];
    const selectedArtistTracks = await getTopTracks(artistId, this.state.token);
    const selectedArtistTrack = await selectedArtistTracks[Math.round(Math.random() * 5)];
    const relatedArtists = await getRelatedArtists(artistId, this.state.token);
    let relatedArtistsTracks = relatedArtists.map(async artist => {
      let topTracks = await getTopTracks(artist.id, this.state.token);
      return topTracks[Math.round(Math.random() * 5)];
    })
    tracks = await Promise.all(relatedArtistsTracks);
    tracks = await [selectedArtistTrack, ...tracks];
    const uris = {'uris': tracks.map(track => track.uri)};
    const createdPlaylist = await createPlaylist({name: artistName + ' Smart Playlist'}, this.state.user.id, this.state.token);
    await addTracks(uris, createdPlaylist.id, this.state.token);
    const playlist = await getPlayist(createdPlaylist.id, this.state.token);
    await this.setState({playlist, artists: null});
  }

  newPlaylist = async () => {
    await this.setArtists();
    await this.setState({playlist: null});
  }

  render() {
    const {token, user, artists, playlist} = this.state;
    return (
      <div className="container-fluid">
        {!token && (
          <Welcome url={authUrl} logo={logo}></Welcome>
        )}
        {token && (
          <div>
            <Nav user={user}></Nav>
            {artists && 
              <Artists artists={artists.items} selectArtist={this.buildPlaylist} onChange={this.setArtists}></Artists>
            }
            {playlist &&
              <Playlist playlist={playlist} newPlaylist={this.newPlaylist}></Playlist>
            }
          </div>
        )}
      </div>
    );
  }
}

export default App;

