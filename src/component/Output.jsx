import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import phpTemplate from 'react-syntax-highlighter/dist/esm/languages/hljs/php-template';
import { githubGist, ascetic } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Icon from './Icon';

SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('php-template', phpTemplate);

export default function Output({
  title,
  userList,
  userSetting,
  userOptions,
  handleSettings,
  handleResetName,
  generateInitList,
}) {
  const [copied, setCopied] = useState(false);

  const setting = userSetting[title] ?? { item: '', link: '', acts: '', toggle: false };
  const hasItems = userList.length > 1;
  const colorTheme = userOptions.removeColors ? githubGist : ascetic;

  const copyToClipboard = (lines) => {
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const buildLines = () => {
    const lines = [];

    userList.forEach((item, index) => {
      const slug = index === 0 ? userOptions.sougouSlug : item.slug;
      const name = index === 0 ? userOptions.sougouName : item.name;

      let href = slug ? `/${slug}/` : '';

      if (userOptions.removeSougou) {
        if (index === 0) href = '/';
        if (slug === 'top') href = `/${slug}/`;
      } else {
        if (index === 0) return;
        if (slug === 'top') href = '/';
      }

      const activePhp = setting.acts
        ? `<?php if (get_meta('slug') == '${slug}') echo '${setting.acts}'?>`
        : '';

      let liClass = '';
      let aClass = '';

      if (userOptions.activeInItem) {
        aClass = setting.link ? ` class="${setting.link}"` : '';
        liClass = setting.item || activePhp
          ? ` class="${[setting.item, activePhp].filter(Boolean).join(' ')}"`
          : '';
      } else {
        liClass = setting.item ? ` class="${setting.item}"` : '';
        aClass = setting.link || activePhp
          ? ` class="${[setting.link, activePhp].filter(Boolean).join(' ')}"`
          : '';
      }

      const spanClass = userOptions.spanName ? ` class="${userOptions.spanName}"` : '';
      const linkText = userOptions.spanAddition ? `<span${spanClass}>${name}</span>` : name;

      let line;
      if (!userOptions.formatCoding) {
        line = `<li${liClass}><a${aClass} href="${href}">${linkText}</a></li>`;
      } else if (!userOptions.spanAddition) {
        line = `<li${liClass}>\n  <a${aClass} href="${href}">${linkText}</a>\n</li>`;
      } else {
        line = `<li${liClass}>\n  <a${aClass} href="${href}">\n    ${linkText}\n  </a>\n</li>`;
      }

      lines.push(line);
    });

    return lines;
  };

  const lines = hasItems ? buildLines() : [];

  return (
    <section className="output cmn-py--output">
      <div className="output__wrapper">
        <input
          type="checkbox"
          name="collapse"
          id={`${title}_handle`}
          checked={setting.toggle}
          onChange={handleSettings}
        />
        <header className="output__header">
          <label className="output__label" htmlFor={`${title}_handle`}>
            <Icon
              name={setting.toggle ? 'expand_less' : 'chevron_right'}
              className="output__icon"
            />
            <h2 className="output__title">{title}</h2>
          </label>
          <div className="output__reset">
            <button
              className="button-icon pc-none"
              onClick={(e) => handleResetName(e, `${title}_reset`)}
            >
              <Icon name="restart_alt" />
            </button>
          </div>
          <div className="output__copy">
            <button
              className="button-icon"
              disabled={!hasItems}
              onClick={() => copyToClipboard(lines)}
            >
              <Icon
                name={!hasItems ? '' : copied ? 'done' : 'content_copy'}
                className="output__icon"
              />
            </button>
          </div>
        </header>
        <div className="output__config">
          <form
            className="output__form"
            id={`${title}_reset`}
            onSubmit={(e) => handleResetName(e, '')}
            autoComplete="off"
          >
            {['item', 'link', 'acts'].map((field) => (
              <div key={field} className="output__form-item input-text input-text--full">
                <label htmlFor={`${title}_${field}`}>
                  {field === 'item' ? '<li>' : field === 'link' ? '<a>' : 'Active'}
                  <span className="sp-none">クラス名</span>
                </label>
                <input
                  type="text"
                  id={`${title}_${field}`}
                  placeholder={setting[field]}
                  value={setting[field]}
                  onChange={handleSettings}
                />
              </div>
            ))}
            <div className="output__form-item sp-none">
              <button className="output__icon button-icon">
                <Icon name="restart_alt" />
              </button>
            </div>
          </form>
        </div>
        <div className="output__code">
          {hasItems ? (
            <SyntaxHighlighter language="php-template" style={colorTheme} showLineNumbers>
              {lines.join('\n')}
            </SyntaxHighlighter>
          ) : (
            <div className="output__empty">
              <button className="generate-button" onClick={generateInitList}>
                初期リストを作成する
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
