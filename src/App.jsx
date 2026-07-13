import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import { SECTIONS, DEFAULT_PAGES, defaultClasses } from "./lib/defaults";
import { loadStore, saveStore, loadClasses } from "./lib/storage";
import { copyText } from "./lib/clipboard";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AddPageForm from "./components/AddPageForm.jsx";
import OptionsPanel from "./components/OptionsPanel.jsx";
import PageList from "./components/PageList.jsx";
import CodeCard from "./components/CodeCard.jsx";

export default function App() {
  const persisted = loadStore();

  const [nameField, setNameField] = useState("");
  const [slugField, setSlugField] = useState("");
  const [slugHadSpace, setSlugHadSpace] = useState(false);
  const [wrapSpan, setWrapSpan] = useState(persisted.wrapSpan || false);
  const [spanClass, setSpanClass] = useState(persisted.spanClass || "");
  const [ariaCurrent, setAriaCurrent] = useState(persisted.ariaCurrent ?? false);
  const [pages, setPages] = useState(Array.isArray(persisted.pages) ? persisted.pages : DEFAULT_PAGES);
  const [open, setOpen] = useState({
    Header: true,
    Drawer: true,
    Footer: true,
    Sitemap: false,
    ...persisted.open,
  });
  const [classes, setClasses] = useState(() => loadClasses(persisted.classes));
  const [copied, setCopied] = useState(null);
  const copyTimer = useRef(null);

  // Persist the parts that should survive reloads.
  useEffect(() => {
    saveStore({ classes, spanClass, wrapSpan, pages, open, ariaCurrent });
  }, [classes, spanClass, wrapSpan, pages, open, ariaCurrent]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const normalizedSlug = slugField.trim().replace(/^[-/]+|[-/]+$/g, "");
  const normalizedHref = normalizedSlug === "top" || normalizedSlug === "home" ? "/" : `/${normalizedSlug}/`;
  const isDuplicateSlug =
    normalizedSlug !== "" && pages.some((p) => p.slug === normalizedSlug || p.href === normalizedHref);
  const canAdd = nameField.trim() !== "" && normalizedSlug !== "" && !isDuplicateSlug;

  const addPage = useCallback(() => {
    const name = nameField.trim();
    if (!name || !normalizedSlug || isDuplicateSlug) return;
    setPages((prev) => [...prev, { name, slug: normalizedSlug, href: normalizedHref }]);
    setNameField("");
    setSlugField("");
    setSlugHadSpace(false);
  }, [nameField, normalizedSlug, normalizedHref, isDuplicateSlug]);

  const onSlugChange = useCallback((e) => {
    const raw = e.target.value;
    const next = raw.replace(/[\s_]+/g, "-");
    setSlugField(next);
    if (/[\s_]/.test(raw)) {
      setSlugHadSpace(true);
    } else if (next === "") {
      setSlugHadSpace(false);
    }
  }, []);

  const removePage = useCallback((i) => {
    setPages((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const restoreDefaultPages = useCallback(() => {
    setPages(DEFAULT_PAGES);
  }, []);

  const reorderPages = useCallback((from, to) => {
    setPages((prev) => {
      const arr = prev.slice();
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
  }, []);

  const setClass = useCallback((title, field, value) => {
    setClasses((prev) => ({ ...prev, [title]: { ...prev[title], [field]: value } }));
  }, []);

  const resetClass = useCallback((title) => {
    setClasses((prev) => ({ ...prev, [title]: defaultClasses(title) }));
  }, []);

  const doCopy = useCallback((title, text) => {
    copyText(text);
    setCopied(title);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 1400);
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="app__mobile-warning">
        本ツールはPC専用（SP非対応）です。<br />PC環境でのご利用を推奨します。
      </div>

      <main className="app__main">
        <div className="app__controls">
          <AddPageForm
            nameField={nameField}
            slugField={slugField}
            onName={(e) => setNameField(e.target.value)}
            onSlug={onSlugChange}
            onAdd={addPage}
            canAdd={canAdd}
            duplicateSlug={isDuplicateSlug}
            slugHadSpace={slugHadSpace}
          />
          <OptionsPanel
            wrapSpan={wrapSpan}
            onToggleWrap={() => setWrapSpan((v) => !v)}
            spanClass={spanClass}
            onSpanClass={(e) => setSpanClass(e.target.value)}
            ariaCurrent={ariaCurrent}
            onToggleAriaCurrent={() => setAriaCurrent((v) => !v)}
          />
          <PageList
            pages={pages}
            onReorder={reorderPages}
            onRemove={removePage}
            onRestoreDefaults={restoreDefaultPages}
          />
        </div>

        <div className="app__preview">
          {SECTIONS.map((title) => (
            <CodeCard
              key={title}
              title={title}
              open={open[title]}
              onToggle={() => setOpen((prev) => ({ ...prev, [title]: !prev[title] }))}
              cls={classes[title]}
              pages={pages}
              spanClass={spanClass}
              wrapSpan={wrapSpan}
              ariaCurrent={ariaCurrent}
              copied={copied === title}
              onCopy={(text) => doCopy(title, text)}
              onClassChange={(field, value) => setClass(title, field, value)}
              onReset={() => resetClass(title)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
