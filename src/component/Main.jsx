import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import dataSetting from '../data/settings.json';
import Output from './Output';

export default function Main() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');

  const [nameTimer, setNameTimer] = useState(null);
  const [toggTimer, setToggTimer] = useState(null);

  const [sougouTogg, setSougouTogg] = useState(Boolean);
  const [removeActs, setRemoveActs] = useState(Boolean);
  const [nameChange, setNameChange] = useState(false);

  const [itemsCount, setItemsCount] = useState(Number);
  // const [masterList, setMasterList] = useState([]);
  // const [masterIdList, setMasterIdList] = useState([]);

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

  /* -------------------------------------------------------------------------- */
  /*                                    Main                                    */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const mainList = localStorage.getItem('mainList');
    loadSetting(mainList, dataSetting);
  }, []);

  /* ----------------------------- Initial Loding ----------------------------- */
  const loadSetting = (mainList, setting) => {
    if (!mainList) {
      console.log('Initialize: Settings');
      Object.entries(setting.initialData).map((section) => {
        Object.entries(section[1]).map((name) => {
          // setting.initialData.forEach((section) => {
          //   section[1].forEach((name) => {
          const keyName = `${section[0]}_${name[0]}`;
          localStorage.setItem(keyName, [name[1]]);
        });
      });

      console.log('Initialize: List');
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
        // setting.initialToggle.forEach((section) => {
        const keyName = `${section[0]}_toggle`;
        localStorage.setItem(keyName, section[1]);
      });

      console.log('Initialize: Option');
      const initSougou = setting.sougouToggle;
      const initRemove = setting.removeActs;

      localStorage.setItem('sougou_option', initSougou);
      localStorage.setItem('remove_option', initRemove);
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

    const itemCount = pullList();
    setItemsCount(Math.abs(itemCount - setting.initialList.length));
  };

  /* ------------------------------ Local Storage ----------------------------- */
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

    console.log('Update: List');
    const newList = [
      ...mainList.slice(0, itemsCount + 2),
      newItem,
      ...mainList.slice(itemsCount + 2),
    ];
    localStorage.setItem('mainList', JSON.stringify(newList));

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

    if (section === 'header') {
      if (name === 'item') setHeaderItem(value);
      if (name === 'link') setHeaderLink(value);
      if (name === 'acts') setHeaderActs(value);
    }

    if (section === 'drawer') {
      if (name === 'item') setDrawerItem(value);
      if (name === 'link') setDrawerLink(value);
      if (name === 'acts') setDrawerActs(value);
    }

    if (section === 'footer') {
      if (name === 'item') setFooterItem(value);
      if (name === 'link') setFooterLink(value);
      if (name === 'acts') setFooterActs(value);
    }

    if (section === 'sitemap') {
      if (name === 'item') setSitemapItem(value);
      if (name === 'link') setSitemapLink(value);
      if (name === 'acts') setSitemapActs(value);
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
    if (sectionName === 'header') db = dataSetting.initialData.header;
    if (sectionName === 'drawer') db = dataSetting.initialData.drawer;
    if (sectionName === 'footer') db = dataSetting.initialData.footer;
    if (sectionName === 'sitemap') db = dataSetting.initialData.sitemap;

    Object.entries(db).map((section) => {
      // db.forEach((section) => {
      const storageName = `${sectionName}_${section[0]}`;
      localStorage.setItem(storageName, section[1]);

      if (section[0] === 'item') {
        if (sectionName === 'header') setHeaderItem(section[1]);
        if (sectionName === 'drawer') setDrawerItem(section[1]);
        if (sectionName === 'footer') setFooterItem(section[1]);
        if (sectionName === 'sitemap') setSitemapItem(section[1]);
      }

      if (section[0] === 'link') {
        if (sectionName === 'header') setHeaderLink(section[1]);
        if (sectionName === 'drawer') setDrawerLink(section[1]);
        if (sectionName === 'footer') setFooterLink(section[1]);
        if (sectionName === 'sitemap') setSitemapLink(section[1]);
      }

      if (section[0] === 'acts') {
        if (sectionName === 'header') setHeaderActs(section[1]);
        if (sectionName === 'drawer') setDrawerActs(section[1]);
        if (sectionName === 'footer') setFooterActs(section[1]);
        if (sectionName === 'sitemap') setSitemapActs(section[1]);
      }
    });
  };

  /* ----------------------------- Toggle Setting ----------------------------- */
  const handleCollapseToggle = (e) => {
    const section = e.target.id.split('_')[0];
    if (section === 'header') setHeaderTogg(!headerTogg);
    if (section === 'drawer') setDrawerTogg(!drawerTogg);
    if (section === 'footer') setFooterTogg(!footerTogg);
    if (section === 'sitemap') setSitemapTogg(!sitemapTogg);

    clearTimeout(toggTimer);
    const inputDelay = () =>
      setTimeout(() => {
        const keyName = `${section}_toggle`;
        if (section === 'header') localStorage.setItem(keyName, !headerTogg);
        if (section === 'drawer') localStorage.setItem(keyName, !drawerTogg);
        if (section === 'footer') localStorage.setItem(keyName, !footerTogg);
        if (section === 'sitemap') localStorage.setItem(keyName, !sitemapTogg);
        console.log(`Update: ${keyName}`);
      }, 500);
    setToggTimer(inputDelay);
  };

  /* ----------------------------- Toggle (Sougou) ---------------------------- */
  const handleSougouToggle = () => {
    setSougouTogg(!sougouTogg);
    localStorage.setItem('sougou_option', !sougouTogg);
    console.log('Update: souguo_option');
  };

  /* -------------------------- Toggle (Remove Acts) -------------------------- */
  const handleRemoveActs = (e) => {
    setRemoveActs(!removeActs);
    localStorage.setItem('remove_option', !removeActs);
    console.log('Update: remove_option');
  };

  /* -------------------------- Generate Initial List ------------------------- */
  const generateInitList = () => {
    console.log('Initialize: List');
    const list = Object.entries(dataSetting.initialList).map((key) => {
      return {
        id: crypto.randomUUID(),
        slug: key[1].slug,
        name: key[1].name,
      };
    });
    localStorage.setItem('mainList', JSON.stringify(list));
    setMainList(list);
  };

  /* -------------------------------------------------------------------------- */
  /*                             Draggable Functions                            */
  /* -------------------------------------------------------------------------- */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // background: isDragging ? '#3a3a3a33' : '',
    ...draggableStyle,
  });

  const pushList = (result) => {
    console.log('Update: List');
    localStorage.setItem('mainList', JSON.stringify(result));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      mainList,
      result.source.index,
      result.destination.index
    );

    setMainList(items);
    pushList(items);
  };

  const handleDeleteItem = (id, index) => {
    const oldList = [...mainList];
    const newList = [...oldList.slice(0, index), ...oldList.slice(index + 1)];
    setMainList(newList);
    pushList(newList);
  };

  /* -------------------------------------------------------------------------- */
  /*                        Functions to pass to children                       */
  /* -------------------------------------------------------------------------- */
  const mainFunction = {
    handleCollapseToggle: handleCollapseToggle,
    handleResetName: handleResetName,
    handleChangeName: handleChangeName,
    generateInitList: generateInitList,
  };

  /* -------------------------------------------------------------------------- */

  return (
    <main className="main">
      <aside className="main__main-l">
        <section className="input cmn-py">
          <div className="input__wrapper">
            <form
              className="input__form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="input__form-item input-text">
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
              <div className="input__form-item input-text">
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

        <section className="option">
          <div className="option__wrapper">
            <p className="side-note">
              <small>オプション</small>
            </p>
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

        <section className="display cmn-py">
          <div className="display__wrapper">
            <p className="side-note">
              <small>並び替える・削除する</small>
            </p>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <ul
                    className="display__list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {' '}
                    {mainList.length > 1 ? (
                      mainList.map((item, index) => {
                        const isEntrance =
                          item.slug === 'entrance' ? 'display__item-none' : '';

                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className={`display__item ${isEntrance}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <span className="display__icon-drag material-symbols-outlined">
                                  drag_handle
                                </span>
                                <p className="display__slug">{item.slug}</p>
                                <small className="display__name">
                                  {item.name}
                                </small>
                                <button
                                  className="display__btn-trash button-icon button-icon--delete"
                                  onClick={() =>
                                    handleDeleteItem(item.id, index)
                                  }
                                >
                                  <span className="display__icon-trash material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    ) : (
                      <button
                        className="generate-button"
                        onClick={() => generateInitList()}
                      >
                        <small>初期リストを生成する</small>
                      </button>
                    )}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </section>

        <section className="setting">
          <div className="setting__wrapper">
            <ul className="setting__list">
              <li className="setting__item">
                <a className="setting__link" href="">
                  <span class="material-symbols-outlined">info</span>
                </a>
              </li>
              <li className="setting__item">
                <a className="setting__link" href="">
                  <span class="material-symbols-outlined">dark_mode</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </aside>

      <section className="main__main-r">
        <Output
          func={mainFunction}
          data={{
            title: 'header',
            item: headerItem,
            link: headerLink,
            acts: headerActs,
            toggle: headerTogg,
            sougou: sougouTogg,
            remove: removeActs,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />

        <Output
          func={mainFunction}
          data={{
            title: 'drawer',
            item: drawerItem,
            link: drawerLink,
            acts: drawerActs,
            toggle: drawerTogg,
            sougou: sougouTogg,
            remove: removeActs,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />

        <Output
          func={mainFunction}
          data={{
            title: 'footer',
            item: footerItem,
            link: footerLink,
            acts: footerActs,
            toggle: footerTogg,
            sougou: sougouTogg,
            remove: removeActs,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />

        <Output
          func={mainFunction}
          data={{
            title: 'sitemap',
            item: sitemapItem,
            link: sitemapLink,
            acts: sitemapActs,
            toggle: sitemapTogg,
            sougou: sougouTogg,
            remove: removeActs,
            mainList: mainList,
            nameChange: nameChange,
          }}
        />
      </section>
    </main>
  );
}
