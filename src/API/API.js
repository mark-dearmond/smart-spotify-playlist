import { baseUrl } from "../config";

const API = {
  getUser: async token => {
    const res = await fetch(baseUrl + "/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return await res.json();
  },
  getTopArtists: async token => {
    const res = await fetch(baseUrl + "/me/top/artists?limit=18", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return await res.json();
  },
  getSearch: async (str, token) => {
    const query = encodeURIComponent(str);
    const res = await fetch(
      baseUrl + "/search?q=" + query + "&type=artist&limit=18",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const results = await res.json();
    return await results.artists;
  },
  getRelatedArtists: async (id, token) => {
    const res = await fetch(baseUrl + "/artists/" + id + "/related-artists", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const relatedArtists = await res.json();
    return await relatedArtists.artists;
  },
  getTopTracks: async (id, token) => {
    const res = await fetch(
      baseUrl + "/artists/" + id + "/top-tracks?country=from_token",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const topTracks = await res.json();
    return await topTracks.tracks;
  },
  getPlayist: async (id, token) => {
    const res = await fetch(baseUrl + "/playlists/" + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const playlist = await res.json();
    return await playlist;
  },

  createPlaylist: async (data, userId, token) => {
    const res = await fetch(baseUrl + "/users/" + userId + "/playlists", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const playlist = await res.json();
    return await playlist;
  },

  addTracks: async (data, playlistId, token) => {
    const res = await fetch(baseUrl + "/playlists/" + playlistId + "/tracks", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const playlist = await res.json();
    return await playlist;
  }
};

export default API;
