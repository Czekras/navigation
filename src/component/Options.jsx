export default function Options({ func, data }) {
  return (
    <section className="option">
      <div className="option__wrapper">
        <p className="side-note side-note--btn">
          <small>オプション</small>
          <button className="option__reset-btn" onClick={func.handleResetOptions}>
            <small>reset</small>
          </button>
        </p>
        <div className="option__item">
          <input
            type="checkbox"
            id="removeColors"
            checked={data.userOptions.removeColors || false}
            onChange={func.handleOptions}
          />
          <label htmlFor="removeColors">シンタックスHL</label>
        </div>
        <div className="option__item">
          <input
            type="checkbox"
            id="removeSougou"
            checked={data.userOptions.removeSougou || false}
            onChange={func.handleOptions}
          />
          <label htmlFor="removeSougou">総合トップ</label>
        </div>
        <div className="input-text input-text--option">
          <input
            type="text"
            id="sougouName"
            placeholder={data.defaultOptions.sougouName}
            disabled={!data.userOptions.removeSougou}
            value={data.userOptions.sougouName || ''}
            onChange={func.handleInputOptions}
          />
        </div>
        <div className="input-text input-text--option">
          <input
            type="text"
            id="sougouSlug"
            placeholder={data.defaultOptions.sougouSlug}
            disabled={!data.userOptions.removeSougou}
            value={data.userOptions.sougouSlug || ''}
            onChange={func.handleInputOptions}
          />
        </div>
      </div>
    </section>
  );
}
