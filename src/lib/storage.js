import { SECTIONS, defaultClasses } from "./defaults";

// Versioned key: a version bump starts users fresh instead of merging in a stale shape.
const KEY_PREFIX = "project_navigation:";
const KEY = `${KEY_PREFIX}${__APP_VERSION__}`;

// Keys from earlier versions of this app, no longer read but left behind in localStorage.
const LEGACY_KEYS = ["navigationArrays", "navigationOptions", "navigationSettings", "navigationVersion"];
const LEGACY_PREFIXES = ["navdc:"];

function removeStaleKeys() {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key || key === KEY) continue;
      const isStale =
        LEGACY_KEYS.includes(key) ||
        LEGACY_PREFIXES.some((prefix) => key.startsWith(prefix)) ||
        key.startsWith(KEY_PREFIX);
      if (isStale) localStorage.removeItem(key);
    }
  } catch (_) {
    /* ignore quota / privacy-mode errors */
  }
}

export function loadStore() {
  removeStaleKeys();
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch (_) {
    return {};
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (_) {
    /* ignore quota / privacy-mode errors */
  }
}

export function loadClasses() {
  const saved = loadStore().classes || {};
  const out = {};
  for (const title of SECTIONS) {
    out[title] = { ...defaultClasses(title), ...(saved[title] || {}) };
  }
  return out;
}
