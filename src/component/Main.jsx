import { useEffect, useState } from 'react';
import dataSetting from '../data/settings.json';
import Output from './Output';
import List from './List';

export default function Main() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');

  const [nameTimer, setNameTimer] = useState(null);
  const [toggTimer, setToggTimer] = useState(null);

  const [sougouTogg, setSougouTogg] = useState(Boolean);
  const [removeActs, setRemoveActs] = useState(Boolean)
  const [nameChange, setNameChange] = useState(false);

  const [itemsCount, setItemsCount] = useState(Number);
  const [masterList, setMasterList] = useState([]);
  const [masterIdList, setMasterIdList] = useState([]);

  const [headerItem, setHeaderItem] = useState('');
  const [headerLink, setHeaderLink] = useState('');
  const [headerActs, setHeaderActs] = useState('');
  const [headerTogg, setHeaderTogg] = useState(Boolean);

  const [drawerItem, setDrawerItem] = useState('');
  const [drawerLink, setDrawerLink] = useState('');
  const [drawerActs, setDrawerActs] = useState('');
  const [drawerTogg, setDrawerTogg] = useState(Boolean);

  const [footerItem, setFooterItem] = useState('');
  const [footerLink, setFooterLink] = useState('');
  const [footerActs, setFooterActs] = useState('');
  const [footerTogg, setFooterTogg] = useState(Boolean);

  const [sitemapItem, setSitemapItem] = useState('');
  const [sitemapLink, setSitemapLink] = useState('');
  const [sitemapActs, setSitemapActs] = useState('');
  const [sitemapTogg, setSitemapTogg] = useState(Boolean);

  const [mainList, setMainList] = useState([]);

  useEffect(() => {
    const version = localStorage.getItem('version');
    const mainList = localStorage.getItem('mainList');
    loadSetting(mainList, dataSetting);
  }, []);

  /* ----------------------------- Initial Loding ----------------------------- */
  const loadSetting = (mainList, setting) => {
    if (!mainList) {
      console.log('Initialize: Settings');
      // localStorage.setItem('mainList', setting.mainList);
      Object.entries(setting.initialData).map((section) => {
        Object.entries(section[1]).map((name) => {
          const keyName = `${section[0]}_${name[0]}`;
          localStorage.setItem(keyName, [name[1]]);
        });
      });

      console.log('Initialize: List');
      // const list = Object.entries(setting.initialList).map((key) => {
      //   return { id: crypto.randomUUID(), data: key[1] };
      // });

      // let initialList = [];
      // list.map((item) => {
      //   initialList.push(item.id);
      //   localStorage.setItem(item.id, JSON.stringify(item.data));
      //   setMasterIdList((prevArray) => [...prevArray, item.id]);
      // });

      // localStorage.setItem("masterIdList", JSON.stringify(initialList));

      const list = Object.entries(setting.initialList).map((key) => {
        return {
          id: crypto.randomUUID(),
          slug: key[1].slug,
          name: key[1].name,
        };
      });
      localStorage.setItem('mainList', JSON.stringify(list));

      console.log('Initialize: Toggle');
      Object.entries(setting.initialToggle).map((section) => {
        const keyName = `${section[0]}_toggle`;
        localStorage.setItem(keyName, section[1]);
      });

      console.log('Initialize: Option');
      const initSougou = setting.sougouToggle;
      const initSitemap = setting.removeActs;

      localStorage.setItem('sougou_option', initSougou);
      localStorage.setItem('remove_option', initSitemap);
    }

    console.log('Load: Setting');
    setHeaderItem(localStorage.getItem('header_item'));
    setHeaderLink(localStorage.getItem('header_link'));
    setHeaderActs(localStorage.getItem('header_acts'));

    setDrawerItem(localStorage.getItem('drawer_item'));
    setDrawerLink(localStorage.getItem('drawer_link'));
    setDrawerActs(localStorage.getItem('drawer_acts'));

    setFooterItem(localStorage.getItem('footer_item'));
    setFooterLink(localStorage.getItem('footer_link'));
    setFooterActs(localStorage.getItem('footer_acts'));

    setSitemapItem(localStorage.getItem('sitemap_item'));
    setSitemapLink(localStorage.getItem('sitemap_link'));
    setSitemapActs(localStorage.getItem('sitemap_acts'));

    console.log('Load: Toggle');
    setHeaderTogg(JSON.parse(localStorage.getItem('header_toggle')));
    setDrawerTogg(JSON.parse(localStorage.getItem('drawer_toggle')));
    setFooterTogg(JSON.parse(localStorage.getItem('footer_toggle')));
    setSitemapTogg(JSON.parse(localStorage.getItem('sitemap_toggle')));

    console.log('Load: Option');
    setSougouTogg(JSON.parse(localStorage.getItem('sougou_option')));
    setRemoveActs(JSON.parse(localStorage.getItem('remove_option')));

    // console.log('Load: List');
    const itemCount = pullList();
    // const initialList = JSON.parse(localStorage.getItem('masterIdList'));
    // Object.entries(initialList).map((id) => {
    //   setMasterIdList((prevArray) => [...prevArray, id[1]]);
    //   const item = JSON.parse(localStorage.getItem(id[1]));
    //   setMasterList((prevArray) => [
    //     ...prevArray,
    //     {
    //       slug: item.slug,
    //       name: item.name,
    //     },
    //   ]);
    // });
    // const initialList = JSON.parse(localStorage.getItem('mainList'));
    // Object.entries(initialList).map((listItem) => {
    //   console.log(listItem)
    // })
    // initialList.map((item) => {
    //   setMainList((prevArray) => [
    //     ...prevArray,
    //     {
    //       id: item.id,
    //       slug: item.slug,
    //       name: item.name,
    //     },
    //   ]);
    // });

    setItemsCount(Math.abs(itemCount - setting.initialList.length));
  };

  /* ------------------------------ Local Storage ----------------------------- */
  const pushList = (list, index, newItem) => {
    console.log('Update: List');
    const newList = [
      ...list.slice(0, index + 2),
      newItem,
      ...list.slice(index + 2),
    ];
    localStorage.setItem('mainList', JSON.stringify(newList));
  };

  const pullList = () => {
    console.log('Load: List');
    const list = JSON.parse(localStorage.getItem('mainList'));
    setMainList(list);
    return list.length;
  };

  /* ---------------------------- Submit Classname ---------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      slug: slug,
      name: name,
    };

    pushList(mainList, itemsCount, newItem);
    setMainList((currentItems) => {
      return [
        ...currentItems.slice(0, itemsCount + 2),
        newItem,
        ...currentItems.slice(itemsCount + 2),
      ];
    });

    setSlug('');
    setName('');
    setItemsCount(itemsCount + 1);
  };

  /* ---------------------------- Change Classname ---------------------------- */
  const handleChangeName = (e) => {
    const [section, name] = e.target.id.split('_');
    const value = e.target.value;

    if (section == 'header') {
      if (name == 'item') setHeaderItem(value);
      if (name == 'link') setHeaderLink(value);
      if (name == 'acts') setHeaderActs(value);
    }

    if (section == 'drawer') {
      if (name == 'item') setDrawerItem(value);
      if (name == 'link') setDrawerLink(value);
      if (name == 'acts') setDrawerActs(value);
    }

    if (section == 'footer') {
      if (name == 'item') setFooterItem(value);
      if (name == 'link') setFooterLink(value);
      if (name == 'acts') setFooterActs(value);
    }

    if (section == 'sitemap') {
      if (name == 'item') setSitemapItem(value);
      if (name == 'link') setSitemapLink(value);
      if (name == 'acts') setSitemapActs(value);
    }

    clearTimeout(nameTimer);
    const inputDelay = () =>
      setTimeout(() => {
        setNameChange(true);
        localStorage.setItem(e.target.id, e.target.value);
        console.log(`Update: ${e.target.id}`);
      }, 500);
    setNameTimer(inputDelay);
  };

  /* ----------------------------- Reset Classname ---------------------------- */
  const handleResetName = (e) => {
    e.preventDefault();
    setNameChange(false);

    let db = '';
    const sectionName = e.target.id.split('_')[0];
    if (sectionName == 'header') db = dataSetting.initialData.header;
    if (sectionName == 'drawer') db = dataSetting.initialData.drawer;
    if (sectionName == 'footer') db = dataSetting.initialData.footer;
    if (sectionName == 'sitemap') db = dataSetting.initialData.sitemap;

    Object.entries(db).map((section) => {
      const storageName = `${sectionName}_${section[0]}`;
      localStorage.setItem(storageName, section[1]);

      if (section[0] == 'item') {
        if (sectionName == 'header') setHeaderItem(section[1]);
        if (sectionName == 'drawer') setDrawerItem(section[1]);
        if (sectionName == 'footer') setFooterItem(section[1]);
        if (sectionName == 'sitemap') setSitemapItem(section[1]);
      }

      if (section[0] == 'link') {
        if (sectionName == 'header') setHeaderLink(section[1]);
        if (sectionName == 'drawer') setDrawerLink(section[1]);
        if (sectionName == 'footer') setFooterLink(section[1]);
        if (sectionName == 'sitemap') setSitemapLink(section[1]);
      }

      if (section[0] == 'acts') {
        if (sectionName == 'header') setHeaderActs(section[1]);
        if (sectionName == 'drawer') setDrawerActs(section[1]);
        if (sectionName == 'footer') setFooterActs(section[1]);
        if (sectionName == 'sitemap') setSitemapActs(section[1]);
      }
    });
  };

  /* ----------------------------- Toggle Setting ----------------------------- */
  const handleCollapseToggle = (e) => {
    const section = e.target.id.split('_')[0];
    if (section == 'header') setHeaderTogg(!headerTogg);
    if (section == 'drawer') setDrawerTogg(!drawerTogg);
    if (section == 'footer') setFooterTogg(!footerTogg);
    if (section == 'sitemap') setSitemapTogg(!sitemapTogg);

    clearTimeout(toggTimer);
    const inputDelay = () =>
      setTimeout(() => {
        const keyName = `${section}_toggle`;
        if (section == 'header') localStorage.setItem(keyName, !headerTogg);
        if (section == 'drawer') localStorage.setItem(keyName, !drawerTogg);
        if (section == 'footer') localStorage.setItem(keyName, !footerTogg);
        if (section == 'sitemap') localStorage.setItem(keyName, !sitemapTogg);
        console.log(`Update: ${keyName}`);
      }, 500);
    setToggTimer(inputDelay);
  };

  /* ----------------------------- Toggle (Sougou) ---------------------------- */
  const handleSougouToggle = (e) => {
    // e.preventDefault();
    setSougouTogg(!sougouTogg);
    localStorage.setItem('sougou_option', !sougouTogg);
    console.log('Update: souguo_option');
  };

  /* -------------------------- Toggle (Remove Acts) -------------------------- */
  const handleRemoveActs = (e) => {
    setRemoveActs(!removeActs);
    localStorage.setItem('active_option', !removeActs);
    console.log('Update: active_option');
  };

  /* -------------------------------- MAIN DATA ------------------------------- */
  const mainFunction = {
    handleCollapseToggle: handleCollapseToggle,
    handleResetName: handleResetName,
    handleChangeName: handleChangeName,
  };
  /* -------------------------------------------------------------------------- */

  return (
    <main className="main">
      <aside className="main__main-l">
        <section className="input cmn-py">
          <div className="input__wrapper">
            <form
              className="input__form input__form--side"
              onSubmit={handleSubmit}
            >
              <div className="input__form-item">
                <label htmlFor="slug">Slug name</label>
                <input
                  type="text"
                  id="slug"
                  // placeholder="news"
                  placeholder="スラッグ名"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="input__form-item">
                <label htmlFor="name">Page name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="ページ名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button className="input__button" disabled={!(slug && name)}>
                追加する
              </button>
            </form>
          </div>
        </section>

        {/* <section className="display">
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

        <section className="option cmn-py">
          <div className="option__wrapper">
            <div className="option__item">
              <input
                type="checkbox"
                id="sougou_handle"
                checked={sougouTogg}
                onChange={handleSougouToggle}
              />
              <label htmlFor="sougou_handle">総合トップ</label>
            </div>
            <div className="option__item">
              <input
                type="checkbox"
                id="remove_handle"
                checked={removeActs}
                onChange={handleRemoveActs}
              />
              <label htmlFor="remove_handle">サイトマップActive</label>
            </div>
          </div>
        </section>
      </aside>

      <section className="main__main-r">
        {/* <List data={{ masterIdList, masterList }} /> */}

        <Output
          func={mainFunction}
          data={{
            title: 'header',
            item: headerItem,
            link: headerLink,
            acts: headerActs,
            toggle: headerTogg,
            sougou: sougouTogg,
            active: false,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />

        {/* <Output
          func={mainFunction}
          data={{
            title: "drawer",
            item: drawerItem,
            link: drawerLink,
            acts: drawerActs,
            toggle: drawerTogg,
            sougou: sougouTogg,
            active: false,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />

        <Output
          func={mainFunction}
          data={{
            title: "footer",
            item: footerItem,
            link: footerLink,
            acts: footerActs,
            toggle: footerTogg,
            sougou: sougouTogg,
            active: false,
            mainList: mainList,
            nameChange: nameChange,
          }}
        /> */}

        <Output
          func={mainFunction}
          data={{
            title: 'sitemap',
            item: sitemapItem,
            link: sitemapLink,
            acts: sitemapActs,
            toggle: sitemapTogg,
            sougou: sougouTogg,
            active: removeActs,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />
      </section>
    </main>
  );
}
