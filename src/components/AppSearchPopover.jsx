import { useEffect, useId, useMemo, useRef, useState } from "react";
import { loadCachedApps, fetchApps, visibleApps, currentAppName, navigateToApp } from "../lib/apps.js";
import Icon from "./Icon.jsx";
import "./AppSearchPopover.css";

/**
 * Cross-app switcher — v3 "search popover". Quiet grid icon in the header
 * (v1's placement); click it or hit Cmd+K/Ctrl+K to open. On wider screens
 * the icon morphs into an inline search field; on SP there's no search, the
 * icon just toggles the list with an active background instead.
 *
 * Popover drops below the trigger, anchored — not a centered modal. Type to
 * filter, arrows/Tab to move, Enter to switch, Esc/click-away closes.
 *
 * Self-contained: owns its own open/query/active state and the global
 * Cmd+K listener. Usage: `<AppSearchPopover />` — no props, no host state.
 */
const B = "app-search";
const EMPTY_QUERY_MAX = 40; // cap the echoed query in "No apps match" so a long paste can't stretch the popover
const SP_QUERY = "(max-width: 640px)"; // matches the CSS mobile breakpoint

/**
 * Shared by the row render and `choose()` so they can never drift apart.
 * A missing url counts as dimmed too — otherwise clicking it does nothing
 * with no explanation why.
 *
 * @param {{status?: string, url?: string}} app
 * @returns {boolean}
 */
function isDimmed(app) {
  return app.status === "soon" || app.status === "maintenance" || !app.url;
}

/**
 * Row's status label. Order matters: being the current app wins over any status tag.
 *
 * @param {{status?: string, url?: string}} app
 * @param {boolean} isCurrent
 * @returns {string}
 */
function statusMeta(app, isCurrent) {
  if (isCurrent) return "Current";
  if (app.status === "soon") return "Coming Soon";
  if (app.status === "maintenance") return "Maintenance";
  if (!app.url) return "Unavailable";
  return ""; // normal apps: no meta (no per-app version in the shared list)
}

export default function AppSearchPopover() {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const [apps, setApps] = useState(() => loadCachedApps());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeState, setActive] = useState(0);
  // SP has no search — tapping the trigger just reveals the list, so the
  // trigger never morphs into the field there.
  const [compact, setCompact] = useState(() => window.matchMedia(SP_QUERY).matches);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(SP_QUERY);
    const onChange = (e) => setCompact(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let alive = true;
    fetchApps()
      .then((fresh) => {
        if (alive) setApps(fresh);
      })
      .catch(() => {
        /* offline / bad deploy — keep the cached copy */
      });
    return () => {
      alive = false;
    };
  }, []);

  const current = currentAppName(apps);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = visibleApps(apps);
    return q ? base.filter((a) => (a.name ?? "").toLowerCase().includes(q)) : base;
  }, [query, apps]);

  // Clamped at render time instead of synced via an effect — never out of
  // range even the instant `results` shrinks below the stored index.
  const active = results.length ? Math.min(activeState, results.length - 1) : 0;

  function openPopover() {
    setOpen(true);
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function close(focusTarget) {
    setOpen(false);
    // Default: return focus to the trigger once it re-mounts as an icon
    // button. Callers (e.g. Escape) can redirect focus elsewhere instead.
    requestAnimationFrame(() => (focusTarget ?? triggerRef.current)?.focus());
  }

  // Cmd+K / Ctrl+K opens from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPopover();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Outside-click + Escape close while open — no backdrop to catch either.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      // Escape hands focus off to the page's main input (add-page form)
      // instead of back to the trigger, so typing can continue right away.
      if (e.key === "Escape") close(document.querySelector(".add-page-form__input"));
    };
    document.addEventListener("mousedown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function scrollActiveIntoView(next) {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelectorAll('[role="option"]')[next];
    if (!el) return;
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (er.bottom > lr.bottom) list.scrollTop += er.bottom - lr.bottom + 6;
    else if (er.top < lr.top) list.scrollTop -= lr.top - er.top + 6;
  }

  // Real DOM focus for Tab/Shift+Tab roving between items (tabIndex={-1}
  // items are still reachable this way, just skipped by native Tab order).
  function focusItem(n) {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelectorAll('[role="option"]')[n];
    el?.focus();
  }

  // `fromItem`: arrow keys pressed while focus is on the input just move the
  // highlight (typing stays live); pressed from an item, they move real
  // focus too so Tab/Shift+Tab position stays in sync with the highlight.
  function move(delta, fromItem) {
    if (!results.length) return;
    let n = active + delta;
    if (n < 0) n = results.length - 1;
    if (n >= results.length) n = 0;
    setActive(n);
    scrollActiveIntoView(n);
    if (fromItem) focusItem(n);
  }

  function choose(app) {
    if (!app) return;
    if (isDimmed(app)) return;
    if (app.name === current) {
      close();
      return;
    }
    navigateToApp(app);
  }

  function onKeyDown(e, fromItem = false) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1, fromItem);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1, fromItem);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      scrollActiveIntoView(0);
      if (fromItem) focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const n = results.length - 1;
      setActive(n);
      scrollActiveIntoView(n);
      if (fromItem) focusItem(n);
    }
  }

  return (
    <div className={B} ref={rootRef}>
      {!open || compact ? (
        <button
          ref={triggerRef}
          type="button"
          className={`${B}__trigger${open ? ` ${B}__trigger--active` : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Switch app"
          title="Switch app · ⌘K"
          onClick={() => (open ? close() : openPopover())}
        >
          <Icon name="layout-grid" className={`${B}__trigger-icon`} />
          <span className={`${B}__kbd`}>Ctrl + K</span>
        </button>
      ) : (
        <div className={`${B}__field`}>
          <Icon name="search" className={`${B}__field-icon`} />
          <input
            ref={inputRef}
            className={`${B}__input`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              if (listRef.current) listRef.current.scrollTop = 0;
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to app…"
            aria-label="Search apps"
            aria-controls={listboxId}
            aria-activedescendant={results.length ? `${baseId}-option-${active}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <span className={`${B}__kbd`}>Esc</span>
        </div>
      )}

      <div className={`${B}__popover`} id={listboxId} role="listbox" aria-label="Support Tools" hidden={!open}>
        <div className={`${B}__list`} ref={listRef}>
          <div className={`${B}__heading`} role="presentation">
            <span className={`${B}__heading-label`}>Support Tools</span>
            <span className={`${B}__count`}>
              {results.length} {results.length === 1 ? "app" : "apps"}
            </span>
          </div>
          {results.map((app, i) => {
            const isCurrent = app.name === current;
            const dimmed = isDimmed(app);
            const isActive = i === active;
            const cls = [
              `${B}__item`,
              isActive && !dimmed && `${B}__item--active`,
              isCurrent && `${B}__item--current`,
              dimmed && `${B}__item--soon`, // reuse the dimmed style for soon + maintenance
            ]
              .filter(Boolean)
              .join(" ");
            const meta = statusMeta(app, isCurrent);
            return (
              <div
                key={app.name}
                id={`${baseId}-option-${i}`}
                className={cls}
                role="option"
                aria-selected={isActive}
                aria-current={isCurrent || undefined}
                tabIndex={dimmed ? -1 : 0}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, true)}
                onMouseMove={() => {
                  if (active !== i) setActive(i);
                }}
                onClick={() => choose(app)}
              >
                <span className={`${B}__icon-wrap`}>
                  <Icon name={app.icon} className={`${B}__icon`} />
                </span>
                <span className={`${B}__name`}>{app.name}</span>
                {meta && <span className={`${B}__meta`}>{meta}</span>}
              </div>
            );
          })}
          {results.length === 0 && (
            <div className={`${B}__empty`}>
              <Icon name="search-x" className={`${B}__empty-icon`} />
              <span>
                No apps match “
                {query.length > EMPTY_QUERY_MAX ? `${query.slice(0, EMPTY_QUERY_MAX)}…` : query}”
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
