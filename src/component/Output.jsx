import { useState } from 'react';

export default function Output({ func, data }) {
  const removeList = ['sitemap'];
  const [copy, setCopy] = useState(false);
  let copyItem = [];

  const copyDisable = data.mainList.length <= 1;
  const copytToClipboard = (copy) => {
    console.log(`Copy: ${data.title}`);
    navigator.clipboard.writeText(copy.join('\n'));
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

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
            >
              <span className="material-symbols-outlined">
                {copyDisable
                  ? 'content_paste_off'
                  : !copyDisable && copy
                  ? 'inventory'
                  : 'content_paste'}
              </span>
            </button>
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
        <ul className="output__list">
          {data.mainList.length > 1
            ? data.mainList.map((item, index) => {
                let itemHref = item.slug ? `/${item.slug}/` : '';
                const itemItem = data.item ? ` class="${data.item}"` : '';
                const itemLink = data.link ? `${data.link}` : '';
                const itemActs = data.acts
                  ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
                  : '';
                let itemSet =
                  itemLink || itemActs
                    ? ` class="${[itemLink, itemActs]
                        .filter((x) => x)
                        .join(' ')}"`
                    : '';

                if (data.sougou) {
                  if (index === 0) itemHref = '/';
                  if (index === 1) itemHref = `/${item.slug}/`;
                } else {
                  if (index === 0) return;
                  if (index === 1) itemHref = '/';
                }

                if (removeList.indexOf(data.title) > -1 && !data.remove) {
                  if (data.link.length > 0) {
                    itemSet = ` class="${itemLink}"`;
                  } else {
                    itemSet = '';
                  }
                }

                /* -------------------------------------------------------------------------- */
                // const htmlTag = (tag, attribute, content) => (
                //   <>
                //     &lt;<span className="clr-red">{tag}</span> {attribute}&gt;
                //     {content}
                //     &lt;/<span className="clr-red">{tag}</span>&gt;
                //   </>
                // );
                // const htmlAttribute = (attribute, value, value2) => {
                //   const set = (value2 = [value, value2].join(' '));
                //   if (!attribute) return;
                //   return !data.acts ? (
                //     <>
                //       <span className="clr-orange">{attribute}</span>=
                //       <span className="clr-green">"{value}"</span>
                //     </>
                //   ) : (
                //     <>
                //       <span className="clr-orange">{attribute}</span>=
                //       <span className="clr-green">
                //         {/* "{value} {value2}" */}"{set}"
                //       </span>
                //     </>
                //   );
                // };
                // const htmlPHP = (slug, active) => {
                //   return (
                //     <>
                //       <span className="clr-red">&lt;?php </span>
                //       <span className="clr-purple">if </span>
                //       <span className="clr-orange">(</span>
                //       <span className="clr-blue">get_meta</span>
                //       <span className="clr-purple">(</span>
                //       <span className="clr-green">'slug'</span>
                //       <span className="clr-purple">) </span>
                //       <span className="clr-blue"> == </span>
                //       <span className="clr-green">'{slug}'</span>
                //       <span className="clr-orange">) </span>
                //       <span className="clr-blue">echo </span>
                //       <span className="clr-green">'{active}'</span>
                //       <span className="clr-red">?&gt;</span>
                //     </>
                //   );
                // };

                // const phpString = data.acts ? [htmlPHP(data.acts, item.slug)] : '';

                const itemString = `<li${itemItem}><a${itemSet} href="${itemHref}">${item.name}</a></li>`;
                copyItem.push(itemString);

                return (
                  <li className="output__item" key={item.id}>
                    {/* &lt;li{itemItem}&gt;&lt;a{itemSet} href="{itemHref}"&gt;
                  {item.name}
                  &lt;/a&gt;&lt;/li&gt; */}
                    {itemString}
                    {/* {htmlTag(
                    'li',
                    htmlAttribute('class', data.item),
                    htmlTag(
                      'a',
                      htmlAttribute('class', data.link, phpString),
                      item.name
                    )
                  )} */}
                  </li>
                );
              })
            : func.generateButton}
        </ul>
      </div>
    </section>
  );
}
