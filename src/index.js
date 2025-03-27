// index.js
// Application entry point. Initializes the router and subscribes to global state changes if needed.

import { peachyRouter } from '@peach/router';
//import { AppState, PersistedAppState } from '@peach/state';
import './index.css';

// Example: Subscribe to global state changes (e.g. for logging or debugging).
// AppState.subscribe((newState) => {
//   console.log('Global state changed:', newState);
// });

// // Example: Subscribe to persistent global state changes.
// PersistedAppState.subscribe((newState) => {
//   console.log('Persistent state changed:', newState);
// });

// Start routing based on current URL.
document.addEventListener('DOMContentLoaded', () => {
  peachyRouter.handleRoute(window.location.pathname);
});
