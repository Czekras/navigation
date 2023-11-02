import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import settings from '../data/settings.json';
import Output from './Output';
import Options from './Options';

export default function Main() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');

  const [userList, setUserList] = useState([]);
  const [userSetting, setUserSetting] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const [itemsCount, setItemsCount] = useState(Number);

  useEffect(() => {
    const localList = localStorage.getItem('navigationArrays');
    loadSetting(localList, settings);
  }, []);

  const loadSetting = (list, setting) => {
    if (!list) {
      const updatedList = setting.initialList.map((item) => {
        return {
          ...item,
          id: crypto.randomUUID(),
          initial: true,
        };
      });

      localStorage.setItem('navigationArrays', JSON.stringify(updatedList));
      localStorage.setItem(
        'navigationSettings',
        JSON.stringify(setting.initialSetting)
      );

      localStorage.setItem(
        'navigationOptions',
        JSON.stringify(setting.initialOption)
      );
    }

    const localList = JSON.parse(localStorage.getItem('navigationArrays'));
    const localSetting = JSON.parse(localStorage.getItem('navigationSettings'));
    const localOptions = JSON.parse(localStorage.getItem('navigationOptions'));

    setUserList(localList);
    setUserSetting(localSetting);
    setUserOptions(localOptions);
  };

  /* ---------------------------- Submit Classname ---------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      slug: slug,
      name: name,
      initial: false,
      skip: false,
    };

    const newList = [
      ...userList.slice(0, itemsCount + 2),
      newItem,
      ...userList.slice(itemsCount + 2),
    ];

    localStorage.setItem('navigationArrays', JSON.stringify(newList));

    setUserList(newList);
    setSlug('');
    setName('');
    setItemsCount(itemsCount + 1);
  };

  /* ---------------------------------- Reset --------------------------------- */
  const handleResetName = (e, id) => {
    e.preventDefault();

    const section = id === '' ? e.target.id.split('_')[0] : id.split('_')[0];
    // const section = e.target.id.split('_')[0];

    const newList = {
      ...userSetting,
      [section]: {
        ...settings.initialSetting[section],
        toggle: userSetting[section].toggle,
      },
    };

    localStorage.setItem('navigationSettings', JSON.stringify(newList));
    setUserSetting(newList);
  };

  /* --------------------------------- Options -------------------------------- */
  const handleOptions = (e) => {
    const { id, checked } = e.target;

    const array = {
      ...userOptions,
      [id]: checked,
    };

    localStorage.setItem('navigationOptions', JSON.stringify(array));
    setUserOptions(array);
  };

  const handleInputOptions = (e) => {
    const { id, value } = e.target;

    const array = {
      ...userOptions,
      [id]: value,
    };

    localStorage.setItem('navigationOptions', JSON.stringify(array));
    setUserOptions(array);
  };

  const handleResetOptions = (e) => {
    const initialOptions = settings.initialOption;

    localStorage.setItem('navigationOptions', JSON.stringify(initialOptions));
    setUserOptions(initialOptions);
  };

  /* -------------------------------- Settings -------------------------------- */
  const handleSettings = (e) => {
    let [section, operation] = e.target.id.split('_');
    let newList = {};

    if (operation === 'handle') {
      newList = {
        ...userSetting,
        [section]: {
          ...userSetting[section],
          toggle: e.target.checked,
        },
      };
    } else {
      newList = {
        ...userSetting,
        [section]: {
          ...userSetting[section],
          [operation]: e.target.value,
        },
      };
    }

    localStorage.setItem('navigationSettings', JSON.stringify(newList));
    setUserSetting(newList);
  };

  /* ----------------------------- Generate Button ---------------------------- */
  const generateInitList = () => {
    const updatedList = settings.initialList.map((item) => {
      return {
        id: crypto.randomUUID(),
        slug: item.slug,
        name: item.name,
        initial: true,
      };
    });

    localStorage.setItem('navigationArrays', JSON.stringify(updatedList));
    setUserList(updatedList);
  };

  const generateButton = (
    <button className="generate-button" onClick={() => generateInitList()}>
      初期リストを作成する
    </button>
  );

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
    localStorage.setItem('navigationArrays', JSON.stringify(result));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      userList,
      result.source.index,
      result.destination.index
    );

    setUserList(items);
    pushList(items);
  };

  const handleDeleteItem = (itemInitial, index) => {
    const oldList = [...userList];
    const newList = [...oldList.slice(0, index), ...oldList.slice(index + 1)];

    if (!itemInitial) setItemsCount(itemsCount - 1);

    setUserList(newList);
    pushList(newList);
  };

  /* -------------------------------------------------------------------------- */

  return (
    <main className="main cmn-px">
      <aside className="main__main-l">
        <section className="input cmn-py">
          <div className="input__wrapper">
            <form
              className="input__form"
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
              <div className="input-text">
                <label htmlFor="name">Page name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="ページ名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-text">
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
              <button className="cmn-button" disabled={!(slug || name)}>
                追加する
              </button>
            </form>
          </div>
        </section>

        <Options
          func={{
            handleOptions: handleOptions,
            handleInputOptions: handleInputOptions,
            handleResetOptions: handleResetOptions,
          }}
          data={{
            userOptions: userOptions,
            defaultOptions: settings.initialOption,
          }}
        />

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
                    {userList.length > 1
                      ? userList.map((item, index) => {
                          const isEntrance = item.skip
                            ? 'display__item-none'
                            : '';

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
                                      handleDeleteItem(item.initial, index)
                                    }
                                  >
                                    <span className="button-icon--small material-symbols-outlined">
                                      delete
                                    </span>
                                  </button>
                                </li>
                              )}
                            </Draggable>
                          );
                        })
                      : generateButton}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </section>
      </aside>

      <section className="main__main-r">
        <Output
          func={{
            handleSettings: handleSettings,
            handleResetName: handleResetName,
            generateButton: generateButton,
          }}
          data={{
            title: 'header',
            userList: userList,
            userSetting: userSetting,
            userOptions: userOptions,
          }}
        />

        <Output
          func={{
            handleSettings: handleSettings,
            handleResetName: handleResetName,
            generateButton: generateButton,
          }}
          data={{
            title: 'drawer',
            userList: userList,
            userSetting: userSetting,
            userOptions: userOptions,
          }}
        />

        <Output
          func={{
            handleSettings: handleSettings,
            handleResetName: handleResetName,
            generateButton: generateButton,
          }}
          data={{
            title: 'footer',
            userList: userList,
            userSetting: userSetting,
            userOptions: userOptions,
          }}
        />

        <Output
          func={{
            handleSettings: handleSettings,
            handleResetName: handleResetName,
            generateButton: generateButton,
          }}
          data={{
            title: 'sitemap',
            userList: userList,
            userSetting: userSetting,
            userOptions: userOptions,
          }}
        />
      </section>
    </main>
  );
}
