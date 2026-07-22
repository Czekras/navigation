/**
 * The switcher's data layer. Central source of truth: edit apps.json in the
 * `support-tools` repo — nothing here needs to change when an app is added,
 * hidden, or flagged.
 */

const APPS_URL = 'https://czekras.github.io/support-tools/apps.json'
const CACHE_KEY = 'support-tools:apps:schema-1' // shared across all apps (same origin)

/**
 * Last-resort fallback: only used on a brand-new browser when the FIRST
 * fetch fails and nothing is cached yet. May lag the central list —
 * acceptable since it only ever shows in that rare cold-start-offline case.
 */
const FALLBACK = [
  {
    name: 'Basic Auth',
    short: 'Basic Auth',
    url: 'https://czekras.github.io/basic-auth/',
    icon: 'user-round-key',
    status: 'on',
  },
  {
    name: 'Contact',
    short: 'Contact',
    url: 'https://czekras.github.io/contact/',
    icon: 'clipboard-list',
    status: 'on',
  },
  {
    name: 'Kanban',
    short: 'Kanban',
    url: 'https://czekras.github.io/kanban/',
    icon: 'square-kanban',
    status: 'on',
  },
  {
    name: 'Navigation',
    short: 'Navigation',
    url: 'https://czekras.github.io/navigation/',
    icon: 'route',
    status: 'on',
  },
]

/**
 * Instant, synchronous read for first paint.
 *
 * @returns {Array<Object>} Cached apps, or `FALLBACK` if nothing's cached yet.
 */
export function loadCachedApps() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (_) {
    /* ignore quota / privacy-mode / bad JSON */
  }
  return FALLBACK
}

/**
 * Revalidate from the central JSON; update the cache on success. Throws on
 * failure so the caller can keep showing the cached copy.
 *
 * @returns {Promise<Array<Object>>}
 */
export async function fetchApps() {
  const res = await fetch(APPS_URL) // same-origin; browser HTTP-caches per Pages headers
  if (!res.ok) throw new Error(`apps fetch failed: ${res.status}`)
  const data = await res.json()
  const apps = Array.isArray(data) ? data : data.apps // tolerate bare array or {apps:[]}
  if (!Array.isArray(apps)) throw new Error('apps.json malformed')
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(apps))
  } catch (_) {
    /* ignore quota / privacy-mode errors */
  }
  return apps
}

/**
 * Whitelist, not blacklist: a typo'd or unrecognized status (e.g. "of"
 * instead of "off") hides the app rather than silently showing it as normal.
 */
const VISIBLE_STATUSES = new Set(['on', 'soon', 'maintenance'])

/**
 * Drop hidden/unrecognized-status apps and sort alphabetically by name (the
 * field shown in the UI) — every consumer gets a consistent, display-ready
 * order regardless of how the apps happen to be listed in apps.json.
 *
 * @param {Array<Object>} apps - Raw app entries from apps.json.
 * @returns {Array<Object>}
 */
export function visibleApps(apps) {
  return apps
    .filter((a) => VISIBLE_STATUSES.has(a.status))
    .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
}

/**
 * Which app are we currently viewing? Match the browser URL against each
 * app's url.
 *
 * @param {Array<Object>} apps
 * @returns {string|null} The matching app's name, or null if none match.
 */
export function currentAppName(apps) {
  const strip = (u) => u.replace(/\/+$/, '')
  const here = strip(window.location.href)
  const match = apps.find((a) => a.url && here.startsWith(strip(a.url)))
  return match ? match.name : null
}

/**
 * Same-tab navigation to a sibling app.
 *
 * @param {{url: string}} app
 */
export function navigateToApp(app) {
  window.location.href = app.url
}
