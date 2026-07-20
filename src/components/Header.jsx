import AppSearchPopover from "./AppSearchPopover.jsx";
import "./Header.css";

/**
 * Border spans full width; inner content is centered at the shared max-width.
 * `__APP_VERSION__` is injected from package.json at build time (vite.config.js).
 * `AppSearchPopover` is self-contained (owns its own open state + Cmd+K
 * listener) — no props to wire up here.
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <span className="app-header__title">Navigation</span>
          <span className="app-header__version">v{__APP_VERSION__}</span>
        </div>
        <AppSearchPopover />
      </div>
    </header>
  );
}
