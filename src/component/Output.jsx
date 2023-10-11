import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Tooltip } from 'react-tooltip';

export default function Output({ func, data }) {
  const removeList = ['sitemap'];
  const [copy, setCopy] = useState(false);
  const copyItem = [];
  const mainItem = [];

  const copyDisable = data.mainList.length <= 1;
  const copytToClipboard = (copy) => {
    console.log(`Copy: ${data.title}`);
    navigator.clipboard.writeText(copy.join('\n'));
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  if (data.mainList.length > 1) {
    data.mainList.map((item, index) => {
      let itemHref = item.slug ? `/${item.slug}/` : '';
      const itemItem = data.item ? ` class="${data.item}"` : '';
      const itemLink = data.link ? `${data.link}` : '';
      const itemActs = data.acts
        ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
        : '';
      let itemSet =
        itemLink || itemActs
          ? ` class="${[itemLink, itemActs].filter((x) => x).join(' ')}"`
          : '';

      if (data.sougou) {
        if (index === 0) itemHref = '/';
        if (item.slug === 'top') itemHref = `/${item.slug}/`;
      } else {
        // eslint-disable-next-line
        if (index === 0) return;
        if (item.slug === 'top') itemHref = '/';
      }

      if (removeList.indexOf(data.title) > -1 && !data.remove) {
        if (data.link.length > 0) {
          itemSet = ` class="${itemLink}"`;
        } else {
          itemSet = '';
        }
      }

      const itemString = `<li${itemItem}><a${itemSet} href="${itemHref}">${item.name}</a></li>`;

      copyItem.push(itemString);
      mainItem.push(itemString);
    });
  }

  return (
    <section className="output cmn-py--output">
      <div className="output__wrapper">
        <input
          type="checkbox"
          name="collapse"
          id={`${data.title}_handle`}
          checked={data.toggle}
          onChange={func.handleCollapseToggle}
        />
        <header className="output__header">
          <label className="output__label" htmlFor={`${data.title}_handle`}>
            <span className="output__icon material-symbols-outlined">
              {data.toggle ? 'expand_less' : 'chevron_right'}
            </span>
            <h2 className="output__title">{data.title}</h2>
          </label>
          <div className="output__reset">
            <button
              className="button-icon pc-none"
              disabled={false}
              onClick={(event) =>
                func.handleResetName(event, `${data.title}_reset`)
              }
            >
              <span className="material-symbols-outlined">restart_alt</span>
            </button>
          </div>
          <div className="output__copy">
            <button
              className="button-icon"
              disabled={copyDisable}
              onClick={() => copytToClipboard(copyItem)}
              data-tooltip-id="copy-tooltip"
              data-tooltip-content={'コピー'}
              data-tooltip-place="left"
            >
              <span className="material-symbols-outlined">
                {copyDisable
                  ? 'content_paste_off'
                  : !copyDisable && copy
                  ? 'inventory'
                  : 'integration_instructions'}
              </span>
            </button>
            <Tooltip id="copy-tooltip" />
          </div>
        </header>
        <div className="output__config">
          <form
            className="output__form"
            id={`${data.title}_reset`}
            onSubmit={(event) => func.handleResetName(event, '')}
            autoComplete="off"
          >
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${data.title}_item`}>
                &lt;li&gt;<span className="sp-none">クラス名</span>
              </label>
              <input
                type="text"
                id={`${data.title}_item`}
                placeholder={data.item}
                value={data.item}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${data.title}_link`}>
                &lt;a&gt;<span className="sp-none">クラス名</span>
              </label>
              <input
                type="text"
                id={`${data.title}_link`}
                placeholder={data.link}
                value={data.link}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${data.title}_acts`}>
                Active<span className="sp-none">クラス名</span>
              </label>
              {removeList.indexOf(data.title) > -1 ? (
                <input
                  type="text"
                  id={`${data.title}_acts`}
                  placeholder={data.acts}
                  value={data.acts}
                  disabled={!data.remove}
                  onChange={func.handleChangeName}
                />
              ) : (
                <input
                  type="text"
                  id={`${data.title}_acts`}
                  placeholder={data.acts}
                  value={data.acts}
                  onChange={func.handleChangeName}
                />
              )}
            </div>
            <div className="output__form-item sp-none">
              <button className="output__icon button-icon" disabled={false}>
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </form>
        </div>
        {/* <ul className="output__list">{outputItems(dataLength)}</ul> */}
        <div className="output__code">
          {data.mainList.length > 1 ? (
            <SyntaxHighlighter
              language="php-template"
              style={style}
              showLineNumbers
            >
              {mainItem.join('\n')}
            </SyntaxHighlighter>
          ) : (
            <div className="output__empty">{func.generateButton}</div>
          )}
        </div>
      </div>
    </section>
  );
}
