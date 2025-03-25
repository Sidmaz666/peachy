// utils.js
// Utility functions for obfuscating (Base64) global state.

export const encodeState = (state) => {
  try {
    const json = JSON.stringify(state);
    return btoa(json);
  } catch (err) {
    console.error("Encoding error:", err);
    return "";
  }
};

export const decodeState = (encodedState) => {
  try {
    const json = atob(encodedState);
    return JSON.parse(json);
  } catch (err) {
    console.error("Decoding error:", err);
    return null;
  }
};

