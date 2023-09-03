export default function Output({ func, data }) {
  let outputList = [];

  // data.masterList.map((item, index) => {
  //   let itemHref = item.slug ? `/${item.slug}/` : "";
  //   const itemItem = data.item ? ` class="${data.item}` : "";
  //   const itemLink = data.link ? `${data.link}` : "";
  //   const itemActs = data.acts
  //     ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
  //     : "";
  //   const itemSet =
  //     itemLink || itemActs
  //       ? ` class="${[itemLink, itemActs].filter((x) => x).join(" ")}"`
  //       : "";

  //   if (data.sougou) {
  //     if (index == 0) itemHref = "/";
  //     if (index == 1) itemHref = `/${item.slug}/`;
  //   } else {
  //     if (index == 0) return;
  //     if (index == 1) itemHref = "/";
  //   }
  // });

  // console.log(data.masterList);

  // const newRoute = item.slug == "top" ? "/" : `/${item.slug}/`;
  // const newItem = data.item ? ` class="${data.item}"` : "";
  // const newLink = data.link ? `${data.link}` : "";
  // const newActs = data.acts
  //   ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
  //   : "";
  // const newSet =
  //   newLink || newActs
  //     ? ` class="${[newLink, newActs].filter((x) => x).join(" ")}"`
  //     : "";

  // if (!data.sougou) {
  //   if (index == 0) {
  //     return <li>SOUGOU!</li>;
  //   }
  // }

  // return (
  //   <li className="output__item" key={item.id}>
  //     &lt;li{newItem}&gt;&lt;a{newSet} href="{newRoute}"&gt;
  //     {item.name}
  //     &lt;/a&gt;&lt;/li&gt;
  //   </li>
  // );

  return (
    <section className="output cmn-py">
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
            <h2 className="output__title">{data.title}</h2>
            <span className="output__icon material-symbols-outlined">
              {data.toggle ? "expand_less" : "expand_more"}
            </span>
          </label>
        </header>
        <div className="output__setting">
          <form
            className="input__form input__form--setting"
            id={`${data.title}_reset`}
            onSubmit={func.handleResetName}
          >
            <div className="input__form-item">
              <label htmlFor={`${data.title}Item`}>&lt;li&gt; classname</label>
              <input
                type="text"
                id={`${data.title}_item`}
                placeholder={data.item}
                value={data.item}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor={`${data.title}Link`}>&lt;a&gt; classname</label>
              <input
                type="text"
                id={`${data.title}_link`}
                placeholder={data.link}
                value={data.link}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor={`${data.title}Acts`}>current classname</label>
              <input
                type="text"
                id={`${data.title}_acts`}
                placeholder={data.acts}
                value={data.acts}
                onChange={func.handleChangeName}
              />
            </div>
            <div className="input__form-item">
              {/* <button className="input__icon" disabled={!data.nameChange}> */}
              <button className="input__icon" disabled={false}>
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </form>
        </div>
        <ul className="output__list">
          {data.masterList.map((item, index) => {
            let itemHref = item.slug ? `/${item.slug}/` : "";
            const itemItem = data.item ? ` class="${data.item}` : "";
            const itemLink = data.link ? `${data.link}` : "";
            const itemActs = data.acts
              ? `<?php if (get_meta('slug') == '${item.slug}') echo '${data.acts}'?>`
              : "";
            const itemSet =
              itemLink || itemActs
                ? ` class="${[itemLink, itemActs].filter((x) => x).join(" ")}"`
                : "";

            if (data.sougou) {
              if (index == 0) itemHref = "/";
              if (index == 1) itemHref = `/${item.slug}/`;
            } else {
              if (index == 0) return;
              if (index == 1) itemHref = "/";
            }

            return (
              <li className="output__item" key={item.id}>
                &lt;li{itemItem}&gt;&lt;a{itemSet} href="{itemHref}"&gt;
                {item.name}
                &lt;/a&gt;&lt;/li&gt;
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
