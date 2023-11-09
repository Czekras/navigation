import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  githubGist,
  ascetic,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Output({ func, data }) {
  const [copy, setCopy] = useState(false);
  const copyItem = [];
  const mainItem = [];

  const outputTitle = data.title;
  const userList = data.userList;
  const userSetting = data.userSetting[data.title];
  const userOptions = data.userOptions;

  const copyDisable = userList.length <= 1;
  const copytToClipboard = (copy) => {
    navigator.clipboard.writeText(copy.join('\n'));
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  const colorTheme = !userOptions.removeColors ? ascetic : githubGist;

  if (userList.length > 1) {
    userList.map((item, index) => {
      if (index === 0) {
        item.name = userOptions.sougouName;
        item.slug = userOptions.sougouSlug;
      }

      let itemItemSet = '';
      let itemLinkSet = '';

      let itemHref = item.slug ? `/${item.slug}/` : '';
      // let itemItem = userSetting.item ? `${userSetting.item}` : '';
      // let itemLink = userSetting.link ? `${userSetting.link}` : '';
      let itemItem = userSetting.item;
      let itemLink = userSetting.link;
      const itemActs = userSetting.acts
        ? `<?php if (get_meta('slug') == '${item.slug}') echo '${userSetting.acts}'?>`
        : '';

      if (userOptions.removeSougou) {
        if (index === 0) itemHref = '/';
        if (item.slug === 'top') itemHref = `/${item.slug}/`;
      } else {
        if (index === 0) return;
        if (item.slug === 'top') itemHref = '/';
      }

      if (userOptions.activeInItem) {
        itemLinkSet = itemLink ? ` class="${itemLink}"` : '';
        itemItemSet =
          itemItem || itemActs
            ? ` class="${[itemItem, itemActs].filter((x) => x).join(' ')}"`
            : '';
      } else {
        itemItemSet = itemItem ? ` class="${itemItem}"` : '';
        itemLinkSet =
          itemLink || itemActs
            ? ` class="${[itemLink, itemActs].filter((x) => x).join(' ')}"`
            : '';
      }

      const itemSpan = userOptions.spanName
        ? ` class="${userOptions.spanName}"`
        : '';

      const itemName = userOptions.spanAddition
        ? `<span${itemSpan}>${item.name}</span>`
        : item.name;

      let itemString = `<li${itemItemSet}><a${itemLinkSet} href="${itemHref}">${itemName}</a></li>`;

      if (userOptions.formatCoding) {
        itemString = `<li${itemItemSet}>\n  <a${itemLinkSet} href="${itemHref}">\n    ${itemName}\n  </a>\n</li>`;
      }

      copyItem.push(itemString);
      mainItem.push(itemString);
    });
  }

  const outputSetting = userSetting || {
    item: '',
    link: '',
    acts: '',
    toggle: false,
  };

  return (
    <section className="output cmn-py--output">
      <div className="output__wrapper">
        <input
          type="checkbox"
          name="collapse"
          id={`${outputTitle}_handle`}
          checked={outputSetting.toggle}
          onChange={(e) => func.handleSettings(e)}
        />
        <header className="output__header">
          <label className="output__label" htmlFor={`${outputTitle}_handle`}>
            <span className="output__icon material-symbols-outlined">
              {outputSetting.toggle ? 'expand_less' : 'chevron_right'}
            </span>
            <h2 className="output__title">{outputTitle}</h2>
          </label>
          <div className="output__reset">
            <button
              className="button-icon pc-none"
              disabled={false}
              onClick={(event) =>
                func.handleResetName(event, `${outputTitle}_reset`)
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
            >
              <span className="output__icon material-symbols-outlined">
                {copyDisable
                  ? ''
                  : !copyDisable && copy
                  ? 'done'
                  : 'content_copy'}
              </span>
            </button>
          </div>
        </header>
        <div className="output__config">
          <form
            className="output__form"
            id={`${outputTitle}_reset`}
            onSubmit={(event) => func.handleResetName(event, '')}
            autoComplete="off"
          >
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${outputTitle}_item`}>
                &lt;li&gt;<span className="sp-none">クラス名</span>
              </label>
              <input
                type="text"
                id={`${outputTitle}_item`}
                placeholder={outputSetting.item}
                value={outputSetting.item}
                onChange={(e) => func.handleSettings(e)}
              />
            </div>
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${outputTitle}_link`}>
                &lt;a&gt;<span className="sp-none">クラス名</span>
              </label>
              <input
                type="text"
                id={`${outputTitle}_link`}
                placeholder={outputSetting.link}
                value={outputSetting.link}
                onChange={(e) => func.handleSettings(e)}
              />
            </div>
            <div className="output__form-item input-text input-text--full">
              <label htmlFor={`${outputTitle}_acts`}>
                current<span className="sp-none">クラス名</span>
              </label>
              <input
                type="text"
                id={`${outputTitle}_acts`}
                placeholder={outputSetting.acts}
                value={outputSetting.acts}
                onChange={(e) => func.handleSettings(e)}
              />
            </div>
            <div className="output__form-item sp-none">
              <button className="output__icon button-icon" disabled={false}>
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </form>
        </div>

        <div className="output__code">
          {userList.length > 1 ? (
            <SyntaxHighlighter
              language="php-template"
              style={colorTheme}
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
