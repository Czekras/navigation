import Icon from './Icon';

export default function Options({ userOptions, defaultOptions, handleOptions, handleOptionButton, handleInputOptions, handleResetOptions }) {
  return (
    <div className="option">
      <div className="option__wrapper">
        <p className="side-note side-note--btn">
          <small>オプション</small>
          <button className="option__reset-btn" onClick={handleResetOptions}>
            <small>RESET</small>
          </button>
        </p>

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="removeSougou"
            checked={userOptions.removeSougou}
            onChange={handleOptions}
          />
          <label htmlFor="removeSougou">総合トップ</label>
          <button
            className="option__expand"
            onClick={() => handleOptionButton('sougouToggle')}
          >
            <Icon name={userOptions.sougouToggle ? 'expand_less' : 'expand_more'} size={21} />
          </button>
        </div>
        {userOptions.sougouToggle && (
          <>
            <div className="input-text input-text--option">
              <input
                type="text"
                id="sougouName"
                placeholder={defaultOptions.sougouName}
                disabled={!userOptions.removeSougou}
                value={userOptions.sougouName}
                onChange={handleInputOptions}
              />
            </div>
            <div className="input-text input-text--option mb-4">
              <input
                type="text"
                id="sougouSlug"
                placeholder={defaultOptions.sougouSlug}
                disabled={!userOptions.removeSougou}
                value={userOptions.sougouSlug}
                onChange={handleInputOptions}
              />
            </div>
          </>
        )}

        <div className="option__item option__item-info">
          <input
            className="option__item-cb"
            type="checkbox"
            id="activeInItem"
            checked={userOptions.activeInItem}
            onChange={handleOptions}
          />
          <label htmlFor="activeInItem">Active クラス</label>
        </div>

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="spanAddition"
            checked={userOptions.spanAddition}
            onChange={handleOptions}
          />
          <label htmlFor="spanAddition">&lt;span&gt; タグ</label>
          <button
            className="option__expand"
            onClick={() => handleOptionButton('spanToggle')}
          >
            <Icon name={userOptions.spanToggle ? 'expand_less' : 'expand_more'} size={21} />
          </button>
        </div>
        {userOptions.spanToggle && (
          <div className="input-text input-text--option mb-4">
            <input
              type="text"
              id="spanName"
              placeholder="クラス名"
              disabled={!userOptions.spanAddition}
              value={userOptions.spanName}
              onChange={handleInputOptions}
            />
          </div>
        )}

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="removeColors"
            checked={userOptions.removeColors}
            onChange={handleOptions}
          />
          <label htmlFor="removeColors">Syntax Highlight</label>
        </div>

        <div className="option__item option__item-info">
          <input
            className="option__item-cb"
            type="checkbox"
            id="formatCoding"
            checked={userOptions.formatCoding}
            onChange={handleOptions}
          />
          <label htmlFor="formatCoding">Code Format</label>
        </div>
      </div>
    </div>
  );
}
