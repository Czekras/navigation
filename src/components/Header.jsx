import AppSearchPopover from './AppSearchPopover.jsx'
import './Header.css'

/**
 * Border spans full width; inner content is centered at the shared max-width.
 * `__APP_VERSION__` is injected from package.json at build time (vite.config.js).
 * `AppSearchPopover` is self-contained (owns its own open state + Cmd+K
 * listener) — no extra props to wire up for it.
 *
 * @param {Object} props
 * @param {string} props.title - App name shown in the header (e.g. "Navigation").
 */
export default function Header({ title }) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <h1 className="app-header__title">{title}</h1>
          <span className="app-header__version">v{__APP_VERSION__}</span>
        </div>
        <AppSearchPopover />
      </div>
    </header>
  )
}
