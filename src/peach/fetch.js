// fetchWrapper.js
// A robust minimal wrapper utility around fetch.
//
// Usage:
//   const [loading, response, error, revalidate, abort] = useFetch(url, options);
//
// Options (all optional):
//   - method, headers, body, etc. (passed directly to fetch)
//   - cacheTime (number, in ms; default: 60000) – How long to keep responses in cache.
//   - revalidateInterval (number, in ms) – Automatically re-fetch data at this interval.
//
// The hook returns reactive state values (via our useState hook), so that when
// loading, response, or error updates, the component is automatically re-rendered.

import { useState } from '@peach/component';

// Global in‑memory cache (shared across components).
if (!window.__FETCH_CACHE__) {
  window.__FETCH_CACHE__ = new Map();
}
const fetchCache = window.__FETCH_CACHE__;

export function useFetch(url, options = {}) {
  // Reactive state values.
  const [getLoading, setLoading] = useState(true);
  const [getResponse, setResponse] = useState(null);
  const [getError, setError] = useState(null);
  // Guard to ensure we perform fetch only once on initial render.
  const [getFetched, setFetched] = useState(false);

  // Create a new AbortController for every call.
  const abortController = new AbortController();

  // Generate a cache key from the URL and options.
  const key = JSON.stringify({ url, options });
  // Cache lifetime (default: 60 seconds)
  const cacheTime = options.cacheTime || 60000;

  async function performFetch() {
    setLoading(true);
    setError(null);

    // Check cache.
    const cached = fetchCache.get(key);
    if (cached) {
      const { data, timestamp } = cached;
      if (Date.now() - timestamp < cacheTime) {
        setResponse(data);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(url, { ...options, signal: abortController.signal });
      // Assume JSON response; you may adjust if needed.
      const data = await res.json();
      setResponse(data);
      setLoading(false);
      // Cache the response.
      fetchCache.set(key, { data, timestamp: Date.now() });
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e);
        setLoading(false);
      }
    }
  }

  // Ensure we fetch only once on mount.
  if (!getFetched) {
    setFetched(true);
    performFetch();

    // If an automatic revalidation interval is provided, set it up.
    if (options.revalidateInterval) {
      setInterval(() => {
        performFetch();
      }, options.revalidateInterval);
    }
  }

  // revalidate: manually trigger a new fetch
  const revalidate = () => {
    performFetch();
  };

  // Return reactive state getters, revalidate function, and an abort function.
  return [getLoading, getResponse, getError, revalidate, () => abortController.abort()];
}
