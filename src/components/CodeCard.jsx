import { useId, useMemo } from "react";
import { CopyIcon, CheckIcon, ChevronRightIcon, ResetIcon } from "../lib/icons.jsx";
import "./CodeCard.css";
import { makeCodeText, CodeHighlight } from "../lib/codegen.jsx";
import { cx } from "../lib/cx";

/**
 * @param {Object} props
 * @param {string} props.label - Field label, associated with the input via `useId`.
 * @param {string} props.value - Current class-name value.
 * @param {(e: Event) => void} props.onChange - Updates the value from the input's `onChange`.
 * @param {string} [props.placeholder] - Optional input placeholder.
 */
function ClassField({ label, value, onChange, placeholder }) {
  const id = useId();
  return (
    <div className="code-card__field">
      <label className="code-card__field-label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className="code-card__input" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

/**
 * One collapsible section (Header/Drawer/Footer/Sitemap): editable class
 * name fields on the left, the generated `<li><a>` markup with basic syntax
 * highlighting and a copy button on the right.
 */
export default function CodeCard({
  title,
  open,
  onToggle,
  cls,
  pages,
  spanClass,
  wrapSpan,
  ariaCurrent,
  copied,
  onCopy,
  onClassChange,
  onReset,
}) {
  const codeText = useMemo(
    () => makeCodeText(pages, cls, spanClass, wrapSpan, ariaCurrent),
    [pages, cls, spanClass, wrapSpan, ariaCurrent]
  );
  const lineCount = useMemo(() => (codeText.match(/\n/g) || []).length + 1, [codeText]);

  const stopAnd = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="code-card">
      <div className="code-card__header">
        <button type="button" className="code-card__toggle" aria-expanded={open} onClick={onToggle}>
          <ChevronRightIcon
            color="var(--muted)"
            className={cx("code-card__chevron", open && "code-card__chevron--open")}
          />
          <span className="code-card__title">{title}</span>
        </button>
        <button
          className={cx("code-card__copy", copied && "code-card__copy--copied")}
          type="button"
          title="このコードをコピー"
          onClick={() => onCopy(codeText)}
        >
          {copied ? (
            <>
              <CheckIcon />
              <span className="code-card__copy-text">コピーしました</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span className="code-card__copy-text">このコードをコピー</span>
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="code-card__body">
          <div className="code-card__classes">
            <ClassField
              label={"<li>クラス名"}
              value={cls.item}
              onChange={(e) => onClassChange("item", e.target.value)}
            />
            <ClassField
              label={"<a>クラス名"}
              value={cls.link}
              onChange={(e) => onClassChange("link", e.target.value)}
            />
            <ClassField
              label="Active時のクラス名"
              value={cls.active}
              onChange={(e) => onClassChange("active", e.target.value)}
              placeholder="classname__link--active"
            />
            <button className="code-card__reset" type="button" title="デフォルトに戻す" onClick={stopAnd(onReset)}>
              <ResetIcon />
            </button>
          </div>

          <div className="code-card__code">
            <div className="code-card__gutter">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="code-card__source">
              <CodeHighlight code={codeText} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
