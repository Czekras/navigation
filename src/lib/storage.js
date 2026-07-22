import { SECTIONS, defaultClasses } from './defaults'

const KEY_PREFIX = 'project_navigation:'

/**
 * Bumped only when the stored data's *shape* changes in a breaking way (a field renamed
 * or removed, not just added) — deliberately NOT tied to package.json's version, so an
 * ordinary release doesn't wipe every user's saved pages. Add the previous key to
 * LEGACY_KEYS below whenever this changes, so existing data gets migrated forward instead
 * of silently discarded.
 */
const SCHEMA_VERSION = 1
const KEY = `${KEY_PREFIX}schema-${SCHEMA_VERSION}`

/**
 * Keys the app has stored data under before the storage key was decoupled from
 * package.json's version — "project_navigation:2.1.0" was the key in production up to
 * this point. Checked once, in order, if the current schema-versioned key has no data yet,
 * so upgrading doesn't erase anyone's saved pages.
 */
const LEGACY_KEYS = [KEY_PREFIX + '2.1.0']

/** Keys from earlier versions of this app, no longer read but left behind in localStorage. */
const OBSOLETE_KEYS = [
  'navigationArrays',
  'navigationOptions',
  'navigationSettings',
  'navigationVersion',
]
const OBSOLETE_PREFIXES = ['navdc:']

function removeStaleKeys() {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (!key || key === KEY) continue
      const isStale =
        OBSOLETE_KEYS.includes(key) ||
        OBSOLETE_PREFIXES.some((prefix) => key.startsWith(prefix)) ||
        key.startsWith(KEY_PREFIX)
      if (isStale) localStorage.removeItem(key)
    }
  } catch (_) {
    /* ignore quota / privacy-mode errors */
  }
}

/**
 * Reads the current schema-versioned key; falls back to migrating the most
 * recent legacy key forward (and saving it under the new key) if the current
 * one has no data yet.
 *
 * @returns {Object}
 */
export function loadStore() {
  try {
    const current = localStorage.getItem(KEY)
    if (current) return JSON.parse(current) || {}

    for (const legacyKey of LEGACY_KEYS) {
      const legacy = localStorage.getItem(legacyKey)
      if (legacy) {
        const data = JSON.parse(legacy) || {}
        saveStore(data)
        return data
      }
    }
    return {}
  } catch (_) {
    return {}
  } finally {
    removeStaleKeys()
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch (_) {
    /* ignore quota / privacy-mode errors */
  }
}

/**
 * Merges saved per-section class names over the defaults, so a partially
 * saved/older shape still gets every field filled in.
 *
 * @param {Object} [savedClasses]
 * @returns {Object}
 */
export function loadClasses(savedClasses) {
  const saved = savedClasses || {}
  const out = {}
  for (const title of SECTIONS) {
    out[title] = { ...defaultClasses(title), ...(saved[title] || {}) }
  }
  return out
}
