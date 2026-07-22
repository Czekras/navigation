import './InfoTip.css'

/**
 * A small "?" badge that reveals a tooltip bubble on hover or keyboard focus.
 * Shares the notify surface (`--notify-bg` / `--notify-text`) with Toast, so
 * flipping that token pair restyles both.
 *
 * @param {Object} props
 * @param {string} props.text - Tooltip content.
 */
export default function InfoTip({ text }) {
  return (
    <span
      className="info-tip"
      tabIndex={0}
      // Callers may nest this inside a <label> (e.g. OptionsPanel); stop the
      // click from bubbling into a label-forwarded checkbox toggle.
      onClick={(e) => e.preventDefault()}
    >
      <span className="info-tip__badge">?</span>
      <span className="info-tip__bubble" role="tooltip">
        {text}
      </span>
    </span>
  )
}
