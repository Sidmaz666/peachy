// state.js
// Global state with reactivity and persistence using IndexedDB.
import { encodeState, decodeState } from "@peach/utils";

const STATE_KEY = "__PEACHY_APP_STATE__";

class GlobalState {
  constructor() {
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
 * PersistedGlobalState persists state using IndexedDB.
 */
export class PersistedGlobalState extends GlobalState {
  constructor(storageKey = "__PEACHY_PERSISTED_STATE__") {
    super();
    this.storageKey = storageKey;
    this.dbName = "PeachyDB";
    this.storeName = "GlobalState";
    this.db = null;
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
      this.notify();
    };
    getRequest.onerror = (event) => {
      console.error("Failed to load persisted state:", event.target.errorCode);
      this._rawState = {};
      this.notify();
    };
  }

  notify() {
    if (this.db) {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const putRequest = store.put(encodeState(this._rawState), this.storageKey);
      putRequest.onsuccess = () => {
        super.notify();
      };
      putRequest.onerror = (event) => {
        console.error("Failed to persist state:", event.target.errorCode);
        super.notify();
      };
    } else {
      super.notify();
    }
  }
}

export const AppState = new GlobalState();
export const PersistedAppState = new PersistedGlobalState();
