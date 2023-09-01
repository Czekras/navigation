import { useEffect, useState } from "react";
import dataSetting from "../data/settings.json";

export default function Main() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [timer, setTimer] = useState(null);
  const [nameChange, setNameChange] = useState(false);

  const [itemsCount, setItemsCount] = useState(1);
  const [masterList, setMasterList] = useState([]);
  const [masterIdList, setMasterIdList] = useState([]);

  const [headerItem, setHeaderItem] = useState("");
  const [headerLink, setHeaderLink] = useState("");
  const [headerActs, setHeaderActs] = useState("");

  const [drawerItem, setDrawerItem] = useState("");
  const [drawerLink, setDrawerLink] = useState("");
  const [drawerActs, setDrawerActs] = useState("");

  const [footerItem, setFooterItem] = useState("");
  const [footerLink, setFooterLink] = useState("");
  const [footerActs, setFooterActs] = useState("");

  const [sitemapItem, setSitemapItem] = useState("");
  const [sitemapLink, setSitemapLink] = useState("");
  const [sitemapActs, setSitemapActs] = useState("");

  useEffect(() => {
    const version = localStorage.getItem("version");
    loadSetting(version, dataSetting);
  }, []);

  const loadSetting = (version, setting) => {
    if (!version) {
      console.log("Initializing: Settings");
      localStorage.setItem("version", setting.version);
      Object.entries(setting.initialData).map((section) => {
        Object.entries(section[1]).map((name) => {
          const keyName = `${section[0]}_${name[0]}`;
          localStorage.setItem(keyName, [name[1]]);
        });
      });

      console.log("Initializing: List");
      const list = Object.entries(setting.initialList).map((key) => {
        return { id: crypto.randomUUID(), data: key[1] };
      });

      let initialList = [];
      list.map((item) => {
        initialList.push(item.id);
        localStorage.setItem(item.id, JSON.stringify(item.data));
        setMasterIdList((prevArray) => [...prevArray, item.id]);
      });

      localStorage.setItem("masterIdList", JSON.stringify(initialList));
    }

    console.log("Loading: Setting");
    setHeaderItem(localStorage.getItem("header_item"));
    setHeaderLink(localStorage.getItem("header_link"));
    setHeaderActs(localStorage.getItem("header_acts"));

    setDrawerItem(localStorage.getItem("drawer_item"));
    setDrawerLink(localStorage.getItem("drawer_link"));
    setDrawerActs(localStorage.getItem("drawer_acts"));

    setFooterItem(localStorage.getItem("footer_item"));
    setFooterLink(localStorage.getItem("footer_link"));
    setFooterActs(localStorage.getItem("footer_acts"));

    setSitemapItem(localStorage.getItem("sitemap_item"));
    setSitemapLink(localStorage.getItem("sitemap_link"));
    setSitemapActs(localStorage.getItem("sitemap_acts"));

    console.log("Loading: List");
    const initialList = JSON.parse(localStorage.getItem("masterIdList"));
    Object.entries(initialList).map((id) => {
      setMasterIdList((prevArray) => [...prevArray, id[1]]);
      const item = JSON.parse(localStorage.getItem(id[1]));
      setMasterList((prevArray) => [
        ...prevArray,
        {
          id: id[1],
          slug: item.slug,
          name: item.name,
        },
      ]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMasterList((currentItems) => {
      const id = crypto.randomUUID();
      setMasterIdList((prevArray) => [...prevArray, id]);

      return [
        ...currentItems.slice(0, itemsCount),
        {
          id: id,
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

  const handleChangeName = (e) => {
    const [section, name] = e.target.id.split("_");
    const value = e.target.value;

    if (section == "header") {
      if (name == "item") setHeaderItem(value);
      if (name == "link") setHeaderLink(value);
      if (name == "acts") setHeaderActs(value);
    }

    if (section == "drawer") {
      if (name == "item") setDrawerItem(value);
      if (name == "link") setDrawerLink(value);
      if (name == "acts") setDrawerActs(value);
    }

    if (section == "footer") {
      if (name == "item") setFooterItem(value);
      if (name == "link") setFooterLink(value);
      if (name == "acts") setFooterActs(value);
    }

    if (section == "sitemap") {
      if (name == "item") setSitemapItem(value);
      if (name == "link") setSitemapLink(value);
      if (name == "acts") setSitemapActs(value);
    }

    clearTimeout(timer);
    const inputDelay = () =>
      setTimeout(() => {
        setNameChange(true);
        localStorage.setItem(e.target.id, e.target.value);
        console.log(`Updated: ${e.target.id}`);
      }, 500);
    setTimer(inputDelay);
  };

  const handleResetName = (e) => {
    e.preventDefault();
    setNameChange(false);
    Object.entries(dataSetting.initialData).map((section) => {
      Object.entries(section[1]).map((name) => {
        const keyName = `${section[0]}_${name[0]}`;
        localStorage.setItem(keyName, [name[1]]);

        if (section[0] == "header") {
          if (name[0] == "item") setHeaderItem(name[1]);
          if (name[0] == "link") setHeaderLink(name[1]);
          if (name[0] == "acts") setHeaderActs(name[1]);
        }

        if (section[0] == "drawer") {
          if (name[0] == "item") setDrawerItem(name[1]);
          if (name[0] == "link") setDrawerLink(name[1]);
          if (name[0] == "acts") setDrawerActs(name[1]);
        }

        if (section[0] == "footer") {
          if (name[0] == "item") setFooterItem(name[1]);
          if (name[0] == "link") setFooterLink(name[1]);
          if (name[0] == "acts") setFooterActs(name[1]);
        }

        if (section[0] == "sitemap") {
          if (name[0] == "item") setSitemapItem(name[1]);
          if (name[0] == "link") setSitemapLink(name[1]);
          if (name[0] == "acts") setSitemapActs(name[1]);
        }
      });
    });

    console.log("Reset: Classnames");
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
      {/* 
      <section className="display">
        <div className="display__wrapper">
          <ul className="display__list">
            {masterList.map((item) => {
              return (
                <li className="display__item" key={item.slug}>
                  <label htmlFor={item.slug}>
                    <input type="checkbox" />
                    {item.slug}, {item.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </section> */}

      <section className="output cmn-py">
        <div className="output__wrapper">
          <p className="output__title">Header</p>
          <form
            className="input__form input__form--setting"
            onSubmit={handleResetName}
          >
            <div className="input__form-item">
              <label htmlFor="headerItem">&lt;li&gt; classname</label>
              <input
                type="text"
                id="header_item"
                placeholder={headerItem}
                value={headerItem}
                // onChange={(e) => setHeaderItem(e.target.value)}
                onChange={handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="headerLink">&lt;a&gt; classname</label>
              <input
                type="text"
                id="header_link"
                placeholder={headerLink}
                value={headerLink}
                // onChange={(e) => setHeaderLink(e.target.value)}
                onChange={handleChangeName}
              />
            </div>
            <div className="input__form-item">
              <label htmlFor="headerActs">current classname</label>
              <input
                type="text"
                id="header_acts"
                placeholder={headerActs}
                value={headerActs}
                // onChange={(e) => setHeaderActs(e.target.value)}
                onChange={handleChangeName}
              />
            </div>
            <div className="input__form-item">
              {/* <button className="input__button" disabled={!nameChange}>
                Reset
              </button> */}
            </div>
          </form>
          <ul className="output__list">
            {masterList.map((item) => {
              return (
                <li className="output__item" key={item.id}>
                  {/* &lt;li class="{headerItem}"&gt;&lt;a class="
                  {headerLink}" href="/{item.slug}/"&gt;
                  {item.name}&lt;/a&gt;&lt;/li&gt; */}
                  &lt;li class="{headerItem}"&gt;&lt;a class="{headerLink}{" "}
                  &lt;?php if (get_meta('slug') == '{item.slug}') echo '
                  {headerActs}' ?&gt;" href="/{item.slug}/"&gt;{item.name}
                  &lt;/a&gt;&lt;/li&gt;
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="option cmn-py">
        <div className="option__wrapper">
          <button
            className="input__button"
            onClick={handleResetName}
            disabled={!nameChange}
          >
            Reset All Classname
          </button>
        </div>
      </section>
    </>
  );
}
