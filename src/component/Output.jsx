import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  githubGist,
  ascetic,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Tooltip } from 'react-tooltip';

export default function Output({ func, data }) {
  // const removeList = ['sitemap'];
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
      let itemHref = item.slug ? `/${item.slug}/` : '';
      const itemItem = userSetting.item ? ` class="${userSetting.item}"` : '';
      const itemLink = userSetting.link ? `${userSetting.link}` : '';
      const itemActs = userSetting.acts
        ? `<?php if (get_meta('slug') == '${item.slug}') echo '${userSetting.acts}'?>`
        : '';
      let itemSet =
        itemLink || itemActs
          ? ` class="${[itemLink, itemActs].filter((x) => x).join(' ')}"`
          : '';

      if (userOptions.removeSougou) {
        if (index === 0) itemHref = '/';
        if (item.slug === 'top') itemHref = `/${item.slug}/`;
      } else {
        // eslint-disable-next-line
        if (index === 0) return;
        if (item.slug === 'top') itemHref = '/';
      }

      // if (removeList.indexOf(outputTitle) > -1 && !userOptions.removeActive) {
      //   if (userSetting.link.length > 0) {
      //     itemSet = ` class="${itemLink}"`;
      //   } else {
      //     itemSet = '';
      //   }
      // }

      const itemString = `<li${itemItem}><a${itemSet} href="${itemHref}">${item.name}</a></li>`;

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
                Active<span className="sp-none">クラス名</span>
              </label>
              {/* {removeList.indexOf(outputTitle) > -1 ? (
                <input
                  type="text"
                  id={`${outputTitle}_acts`}
                  placeholder={outputSetting.acts}
                  value={outputSetting.acts}
                  disabled={userOptions.removeActive}
                  onChange={(e) => func.handleSettings(e)}
                />
              ) : (
                <input
                  type="text"
                  id={`${outputTitle}_acts`}
                  placeholder={outputSetting.acts}
                  value={outputSetting.acts}
                  onChange={(e) => func.handleSettings(e)}
                />
              )} */}
              <input
                type="text"
                id={`${outputTitle}_acts`}
                placeholder={outputSetting.acts}
                value={outputSetting.acts}
                onChange={(e) => func.handleSettings(e)}
              />
            </div>
            <div className="output__form-item sp-none">
              <button
                className="output__icon button-icon"
                disabled={false}
                // type="button"
              >
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
