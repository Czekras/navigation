import { useEffect, useState } from "react";
import dataSetting from "../data/settings.json";

export default function Main() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(1);
  const [defaultItems, setDefaultItems] = useState([
    { slug: "news", name: "お知らせ" },
    { slug: "contact", name: "お問い合わせ" },
    { slug: "privacy", name: "プライバシーポリシー" },
    { slug: "site", name: "サイトマップ" },
  ]);

  // const [headerItem, setHeaderItem] = useState("header__item");
  // const [headerLink, setHeaderLink] = useState("header__item-link");
  // const [headerActive, setHeaderActive] = useState("header__item--active");

  const [headerItem, setHeaderItem] = useState();
  const [headerLink, setHeaderLink] = useState();
  const [headerActs, setHeaderActs] = useState();

  useEffect(() => {
    loadSetting(dataSetting);
  }, []);

  const loadSetting = (data) => {
    setHeaderItem(data.header.itemName)
    setHeaderLink(data.header.linkName)
    setHeaderActs(data.header.actsName)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDefaultItems((currentItems) => {
      return [
        ...currentItems.slice(0, itemsCount),
        {
          slug: slug,
          name: name,
        },
        ...currentItems.slice(itemsCount),
      ];
    });

    setSlug("");
    setName("");
    setItemsCount(itemsCount + 1);
  };

  return (
    <>
      <section className="input cmn-py">
        <div className="input__wrapper">
          <form className="input__form" onSubmit={handleSubmit}>
            <div className="input__form-item">
              <label htmlFor="slug">slug</label>
              <input
                type="text"
                id="slug"
                placeholder="news"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="name">name</label>
              <input
                type="text"
                id="name"
                placeholder="お知らせ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="input__button" disabled={!(slug && name)}>
              Generate Link
            </button>
          </form>
        </div>
      </section>

      <section className="output cmn-py">
        <div className="output__wrapper">
          <p className="output__title">Header</p>
          <form className="input__form input__form--setting">
            <div className="input__form-item">
              <label htmlFor="headerItem">&lt;li&gt; classname</label>
              <input
                type="text"
                id="headerItem"
                placeholder={headerItem}
                // value={headerItem}
                onChange={(e) => setHeaderItem(e.target.value)}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="headerLink">&lt;a&gt; classname</label>
              <input
                type="text"
                id="headerLink"
                placeholder={headerLink}
                // value={headerLink}
                onChange={(e) => setHeaderLink(e.target.value)}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="headerActs">current classname</label>
              <input
                type="text"
                id="headerActs"
                placeholder={headerActs}
                // value={headerActs}
                onChange={(e) => setHeaderActs(e.target.value)}
              />
            </div>
          </form>
          <ul className="output__list">
            {defaultItems.map((item, index) => {
              const newID = crypto.randomUUID();
              return (
                <li className="output__item" key={newID}>
                  &lt;li class="{headerItem} &lt;?php get_meta('slug') === '
                  {item.slug}' ? '{headerActs}' : ''?&gt;"&gt;&lt;a class="
                  {headerLink}" href="/{item.slug}/"&gt;
                  {item.name}&lt;/a&gt;&lt;/li&gt;
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
