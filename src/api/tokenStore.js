// Simple in-memory token store
// Used to hold the Supabase access token so write operations can send it manually

let _accessToken = null;

export const setAccessToken = (token) => {
  _accessToken = token;
};

export const getAccessToken = () => _accessToken;
