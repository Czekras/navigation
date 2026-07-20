import { LayoutGrid } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import "./Icon.css";

/**
 * Fully data-driven: resolves any lucide name at runtime (async import per
 * name), so an icon change in apps.json needs no code change here. While a
 * name is loading, or if it doesn't exist in lucide, `DynamicIcon` renders
 * nothing on its own — the `fallback` keeps a bad/loading icon from ever
 * showing as a blank slot. `DynamicIcon` calls `fallback` with no props, so
 * it needs its own component per call to pick up the caller's sizing
 * className.
 *
 * @param {Object} props
 * @param {string} props.name - Any lucide-react icon name (kebab-case).
 * @param {string} [props.className] - Extra class(es) merged onto the icon.
 */
export default function Icon({ name, className = "" }) {
  const full = `icon ${className}`;
  const Fallback = () => <LayoutGrid className={full} aria-hidden="true" />;
  return <DynamicIcon name={name} className={full} aria-hidden="true" fallback={Fallback} />;
}
