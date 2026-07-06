import "./OptionsPanel.css";
import { cx } from "../lib/cx";

export default function OptionsPanel({
  wrapSpan,
  onToggleWrap,
  spanClass,
  onSpanClass,
  ariaCurrent,
  onToggleAriaCurrent,
}) {
  return (
    <div className="options">
      <div className="options__label">Options</div>

      <div className="options__row">
        <label className="options__checkbox">
          <input
            type="checkbox"
            className="options__checkbox-input"
            checked={wrapSpan}
            onChange={onToggleWrap}
          />
          <span className={cx("options__box", wrapSpan && "options__box--checked")} aria-hidden="true">
            {wrapSpan ? "✓" : ""}
          </span>
          <span className="options__text">{"テキストを <span> で囲む"}</span>
        </label>
      </div>

      {wrapSpan && (
        <div className="options__field">
          <input
            className="options__input"
            value={spanClass}
            onChange={onSpanClass}
            placeholder="spanのクラス名（任意）"
          />
        </div>
      )}

      <div className="options__row">
        <label className="options__checkbox">
          <input
            type="checkbox"
            className="options__checkbox-input"
            checked={ariaCurrent}
            onChange={onToggleAriaCurrent}
          />
          <span className={cx("options__box", ariaCurrent && "options__box--checked")} aria-hidden="true">
            {ariaCurrent ? "✓" : ""}
          </span>
          <span className="options__text">{'Active時に aria-current="page" を追加'}</span>
        </label>
        <span
          className="options__info"
          title="スクリーンリーダーに「現在のページ」であることを伝える属性です"
        >
          ⓘ
        </span>
      </div>
    </div>
  );
}
