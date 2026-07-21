import {
  LayoutGrid,
  Search,
  SearchX,
  UserRoundKey,
  ClipboardList,
  SquareKanban,
  Route,
  ImageDown,
} from "lucide-react";
import "./Icon.css";

/**
 * Static name → component map, not `lucide-react/dynamic`'s `DynamicIcon`:
 * `DynamicIcon` resolves any of lucide's ~1,500 icons via a per-name dynamic
 * import, so Vite bundles a chunk for every one of them regardless of which
 * names this app actually uses (~1,700 unused chunks, ~21MB dist). Add an
 * entry here — and only here — whenever apps.json (or this component)
 * introduces a new icon name, including apps still `off`/`soon` (see
 * `image-down` below), so flipping an app's status later doesn't silently
 * fall back to the default icon.
 */
const ICONS = {
  "layout-grid": LayoutGrid,
  search: Search,
  "search-x": SearchX,
  "user-round-key": UserRoundKey,
  "clipboard-list": ClipboardList,
  "square-kanban": SquareKanban,
  route: Route,
  "image-down": ImageDown, // Image Compressor — status "off" today, not yet visible in the switcher
};

/**
 * @param {Object} props
 * @param {string} props.name - A key in `ICONS` (kebab-case, matching lucide's naming).
 * @param {string} [props.className] - Extra class(es) merged onto the icon.
 */
export default function Icon({ name, className = "" }) {
  const Cmp = ICONS[name] ?? LayoutGrid;
  return <Cmp className={`icon ${className}`} aria-hidden="true" />;
}
