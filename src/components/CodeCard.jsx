import "./CodeCard.css";
import { makeCodeText, CodeHighlight } from "../lib/codegen.jsx";
import { cx } from "../lib/cx";

function CopyIcon() {
  return (
    <svg
      className="code-card__copy-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="code-card__copy-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8l8 8 8-8" />
    </svg>
  );
}

function ClassField({ label, value, onChange, placeholder }) {
  return (
    <div className="code-card__field">
      <label className="code-card__field-label">{label}</label>
      <input className="code-card__input" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

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
  const codeText = makeCodeText(pages, cls, spanClass, wrapSpan, ariaCurrent);
  const lineCount = (codeText.match(/\n/g) || []).length + 1;

  const stopAnd = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="code-card">
      <div className="code-card__header" onClick={onToggle}>
        <ChevronIcon className={cx("code-card__chevron", open && "code-card__chevron--open")} />
        <span className="code-card__title">{title}</span>
        <button
          className={cx("code-card__copy", copied && "code-card__copy--copied")}
          type="button"
          title="このコードをコピー"
          onClick={stopAnd(() => onCopy(codeText))}
        >
          {copied ? (
            <>
              <CheckIcon />
              コピーしました
            </>
          ) : (
            <>
              <CopyIcon />
              このコードをコピー
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
              label="Activeクラス名"
              value={cls.active}
              onChange={(e) => onClassChange("active", e.target.value)}
              placeholder="classname__link--active"
            />
            <button className="code-card__reset" type="button" title="デフォルトに戻す" onClick={stopAnd(onReset)}>
              ↻
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
