import { baseUrl } from '../config';

export const getUser = async (token) => {
  const res = await fetch(baseUrl + '/me', {
    headers: {
     'Authorization': 'Bearer ' + token
    }
  })
  return await res.json()
}

export const getTopArtists = async (token) => {
  const res = await fetch(baseUrl + '/me/top/artists?limit=18', {
    headers: {
     'Authorization': 'Bearer ' + token
    }
  })
  return await res.json()
}

export const getSearch = async (str, token) => {
  const query = encodeURIComponent(str);
  const res = await fetch(baseUrl + '/search?q=' + query + '&type=artist&limit=18', {
    headers: {
     'Authorization': 'Bearer ' + token
    }
  })

  const results = await res.json();
  return await results.artists;
}

export const getRelatedArtists = async (id, token) => {
  const res = await fetch(baseUrl + '/artists/' + id + '/related-artists', {
    headers: {
     'Authorization': 'Bearer ' + token
    }
  })

  const relatedArtists = await res.json();
  return await relatedArtists.artists;
}

export const getTopTracks = async (id, token) => {
  const res = await fetch(baseUrl + '/artists/' + id + '/top-tracks?country=from_token', {
    headers: {
     'Authorization': 'Bearer ' + token
    }
  })

  const topTracks = await res.json();
  return await topTracks.tracks;
}

export const createPlaylist = async (data, userId, token) => {
  const res = await fetch(baseUrl + '/users/' + userId + '/playlists', {
    method: 'POST',
    headers: {
     'Authorization': 'Bearer ' + token,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const playlist = await res.json();
  return await playlist;
}

export const addTracks = async (data, playlistId, token) => {
  const res = await fetch(baseUrl + '/playlists/' + playlistId + '/tracks', {
    method: 'POST',
    headers: {
     'Authorization': 'Bearer ' + token,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const playlist = await res.json();
  return await playlist;
}

