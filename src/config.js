export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "YOUR CLIENT ID";
export const redirectUri = "http://localhost:3000/callback";
// export const redirectUri = "https://mark-dearmond.github.io/smart-spotify-playlist/";
export const scopes = [
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-top-read"
];
export const baseUrl = "https://api.spotify.com/v1";
