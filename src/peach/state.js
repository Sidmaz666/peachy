import { encodeState, decodeState } from "@peach/utils";

const STATE_KEY = "__PEACHY_APP_STATE__";

class GlobalState {
  constructor() {
    // Initialize from window if available or start with an empty state.
    this._rawState = window[STATE_KEY] ? decodeState(window[STATE_KEY]) : {};
    this.subscribers = [];
  }

  subscribe(callback) {
    if (typeof callback === "function") {
      this.subscribers.push(callback);
    }
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this._rawState));
    // Also update the window state with an encrypted version.
    window[STATE_KEY] = encodeState(this._rawState);
  }

  get state() {
    return this._rawState;
  }

  set state(newState) {
    this._rawState = newState;
    this.notify();
  }

  update(updates) {
    this._rawState = { ...this._rawState, ...updates };
    this.notify();
  }

  get(key) {
    return this._rawState[key];
  }

  set(key, value) {
    this._rawState[key] = value;
    this.notify();
  }
}

/**
 * PersistedGlobalState extends GlobalState to persist its data using IndexedDB.
 * It automatically loads the stored state on initialization and persists updates.
 */
export class PersistedGlobalState extends GlobalState {
  /**
   * @param {string} storageKey - The key under which the state is stored.
   */
  constructor(storageKey = "__PEACHY_PERSISTED_STATE__") {
    super();
    this.storageKey = storageKey;
    this.dbName = "PeachyDB";
    this.storeName = "GlobalState";
    this.db = null;
    // Initialize IndexedDB (async) and load stored state.
    this.initDB();
  }

  initDB() {
    const request = indexedDB.open(this.dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName);
      }
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.loadState();
    };
    request.onerror = (event) => {
      console.error("IndexedDB error during open:", event.target.errorCode);
      // Fallback: use empty state.
      this._rawState = {};
      this.notify();
    };
  }

  loadState() {
    if (!this.db) return;
    const transaction = this.db.transaction([this.storeName], "readonly");
    const store = transaction.objectStore(this.storeName);
    const getRequest = store.get(this.storageKey);
    getRequest.onsuccess = (event) => {
      const stored = event.target.result;
      if (stored) {
        try {
          this._rawState = decodeState(stored);
        } catch (e) {
          console.error("Failed to decode persisted state:", e);
          this._rawState = {};
        }
      } else {
        this._rawState = {};
      }
      // Notify subscribers after loading state.
      this.notify();
    };
    getRequest.onerror = (event) => {
      console.error("Failed to load persisted state:", event.target.errorCode);
      this._rawState = {};
      this.notify();
    };
  }

  notify() {
    // Persist the encrypted state to IndexedDB.
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const putRequest = store.put(
        encodeState(this._rawState),
        this.storageKey
      );
      putRequest.onsuccess = () => {
        super.notify();
      };
      putRequest.onerror = (event) => {
        console.error("Failed to persist state:", event.target.errorCode);
        // Still notify subscribers even if persisting failed.
        super.notify();
      };
    } else {
      super.notify();
    }
  }
}

export const AppState = new GlobalState();
export const PersistedAppState = new PersistedGlobalState();
