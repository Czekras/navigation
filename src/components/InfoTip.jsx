import { InfoIcon } from "../lib/icons.jsx";
import "./InfoTip.css";

export default function InfoTip({ text }) {
  return (
    <span className="info-tip" tabIndex={0} onClick={(e) => e.preventDefault()}>
      <span className="info-tip__badge">
        <InfoIcon />
      </span>
      <span className="info-tip__bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}
