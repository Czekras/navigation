export default function Options({ func, data }) {
  return (
    <div className="option">
      <div className="option__wrapper">
        <p className="side-note side-note--btn">
          <small>オプション</small>
          <button
            className="option__reset-btn"
            onClick={func.handleResetOptions}
          >
            <small>RESET</small>
          </button>
        </p>

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="removeSougou"
            checked={data.userOptions.removeSougou || false}
            onChange={func.handleOptions}
          />
          <label htmlFor="removeSougou">総合トップ</label>
          <button
            className="option__expand"
            onClick={(e) => func.handleOptionButton(e, 'sougouToggle')}
          >
            <span className="material-symbols-outlined">
              {data.userOptions.sougouToggle ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
        {data.userOptions.sougouToggle ? (
          <>
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
            <div className="input-text input-text--option mb-4">
              <input
                type="text"
                id="sougouSlug"
                placeholder={data.defaultOptions.sougouSlug}
                disabled={!data.userOptions.removeSougou}
                value={data.userOptions.sougouSlug || ''}
                onChange={func.handleInputOptions}
              />
            </div>
          </>
        ) : (
          ''
        )}

        <div className="option__item option__item-info">
          <input
            className="option__item-cb"
            type="checkbox"
            id="activeInItem"
            checked={data.userOptions.activeInItem || false}
            onChange={func.handleOptions}
          />
          {/* <label htmlFor="activeInItem">Current in &lt;li&gt;</label> */}
          <label htmlFor="activeInItem">Current クラス</label>
        </div>

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="spanAddition"
            checked={data.userOptions.spanAddition || false}
            onChange={func.handleOptions}
          />
          {/* <label htmlFor="spanAddition">Insert &lt;span&gt;</label> */}
          <label htmlFor="spanAddition">&lt;span&gt; タグ</label>
          <button
            className="option__expand"
            onClick={(e) => func.handleOptionButton(e, 'spanToggle')}
          >
            <span className="material-symbols-outlined">
              {data.userOptions.spanToggle ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
        {data.userOptions.spanToggle ? (
          <div className="input-text input-text--option mb-4">
            <input
              className="mb-5"
              type="text"
              id="spanName"
              placeholder="クラス名"
              // placeholder={data.defaultOptions.spanName}
              disabled={!data.userOptions.spanAddition}
              value={data.userOptions.spanName || ''}
              onChange={func.handleInputOptions}
            />
          </div>
        ) : (
          ''
        )}

        <div className="option__item">
          <input
            className="option__item-cb"
            type="checkbox"
            id="removeColors"
            checked={data.userOptions.removeColors || false}
            onChange={func.handleOptions}
          />
          <label htmlFor="removeColors">Syntax Highlight</label>
          {/* <label htmlFor="removeColors">ハイライト</label> */}
        </div>

        <div className="option__item option__item-info">
          <input
            className="option__item-cb"
            type="checkbox"
            id="formatCoding"
            checked={data.userOptions.formatCoding || false}
            onChange={func.handleOptions}
          />
          <label htmlFor="formatCoding">Code Format</label>
          {/* <label htmlFor="formatCoding">フォーマット</label> */}
        </div>
      </div>
    </div>
  );
}
