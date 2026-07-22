import './OptionsPanel.css'
import { cx } from '../lib/cx'
import InfoTip from './InfoTip'

/**
 * Output-options panel: toggles for wrapping link text in a `<span>` and
 * emitting `aria-current="page"` on the active link, plus the optional
 * span class-name field (shown only while wrapping is on).
 */
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
            checked={ariaCurrent}
            onChange={onToggleAriaCurrent}
          />
          <span className="options__text">
            {'Active時にaria-current="page"を追加'}
          </span>
          <InfoTip text="スクリーンリーダー等に「現在表示中のページ」であることを伝えるアクセシビリティ属性です。" />
          <span
            className={cx(
              'options__switch',
              ariaCurrent && 'options__switch--on',
            )}
            aria-hidden="true"
          >
            <span className="options__knob" />
          </span>
        </label>
      </div>

      <div className="options__row">
        <label className="options__checkbox">
          <input
            type="checkbox"
            className="options__checkbox-input"
            checked={wrapSpan}
            onChange={onToggleWrap}
          />
          <span className="options__text">
            {'リンクテキストを<span>で囲む'}
          </span>
          <span
            className={cx('options__switch', wrapSpan && 'options__switch--on')}
            aria-hidden="true"
          >
            <span className="options__knob" />
          </span>
        </label>
      </div>

      {wrapSpan && (
        <div className="options__field">
          <input
            className="options__input"
            value={spanClass}
            onChange={onSpanClass}
            placeholder="spanのクラス名（任意）"
            aria-label="spanのクラス名（任意）"
          />
        </div>
      )}
    </div>
  )
}
