import { useState } from "react";

export default function Main() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [defaultItems, setDefaultItems] = useState([
    { slug: "contact", name: "お問い合わせ" },
    { slug: "privacy", name: "プライバシーポリシー" },
    { slug: "site", name: "サイトマップ" },
  ]);

  const [headerItem, setHeaderItem] = useState("header__item");
  const [headerLink, setHeaderLink] = useState("header__item-link");
  const [headerAnchor, setHeaderAnchor] = useState("--active");

  const generatedList = [defaultItems.map((items) => {
    
  })];

  console.log(generatedList.length);

  function handleSubmit(e) {
    e.preventDefault();
    setDefaultItems((currentItems) => {
      return [
        ...currentItems.slice(itemsCount, itemsCount + 1),
        {
          slug: slug,
          name: name,
        },
        ...currentItems.slice(itemsCount + 2),
      ];
    });

    setSlug("");
    setName("");
    setItemsCount(itemsCount + 1);
    console.log(itemsCount);
  }

  return (
    <>
      <section className="input cmn-py">
        <div className="input__wrapper">
          <form className="input__form" onSubmit={handleSubmit}>
            <div className="input__form-item">
              <label htmlFor="slug-item">slug</label>
              <input
                type="text"
                id="slug-item"
                placeholder="news"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="name-item">name</label>
              <input
                type="text"
                id="name-item"
                placeholder="お知らせ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </section>

      {/* <section className="output cmn-py">
        <div className="output__wrapper">
          <p className="output__title">Header</p>
          <ul className="output__list">
            {defaultItems.map((item) => {
              const uniqueID = crypto.randomUUID
              return (
                <li className="output__item" id={uniqueID} key={uniqueID}>
                  {item.slug}, {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </section> */}
    </>
  );
}
