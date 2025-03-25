// page.js for the About route.

import { Peachy } from '@peach/component';
import { AppState } from '@peach/state';

export default function AboutPage() {
  // Update global state.
  AppState.set('lastVisited', 'About');
  
  return (
    <div className="about-page">
      <h2>About Peachy</h2>
      <p>
        Peachy is a fully reactive, secure, and enterprise‑ready front-end framework,
        using file‑based routing and advanced state management.
      </p>
    </div>
  );
}

