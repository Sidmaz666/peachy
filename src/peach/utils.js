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

export function waitFor(selector, timeout = 5000, intervalMs = 50) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
      if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(new Error(`Element "${selector}" not found within ${timeout}ms.`));
      }
    }, intervalMs);
  });
}
