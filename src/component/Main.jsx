import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import settings from '../data/settings.json';
import { useNavigation } from '../hooks/useNavigation';
import Icon from './Icon';
import Output from './Output';
import Options from './Options';

export default function Main() {
  const {
    slug, setSlug,
    name, setName,
    userList,
    userSetting,
    userOptions,
    handleSubmit,
    generateInitList,
    handleDeleteItem,
    handleOnDragEnd,
    handleSettings,
    handleResetName,
    handleOptions,
    handleOptionButton,
    handleInputOptions,
    handleResetOptions,
  } = useNavigation();

  const hasItems = userList.length > 1;
  const outputProps = { handleSettings, handleResetName, userList, userSetting, userOptions };

  return (
    <main className="main cmn-px">
      <div className="main__main-l">
        <div className="input cmn-py">
          <div className="input__wrapper">
            <form className="input__form" onSubmit={handleSubmit} autoComplete="off">
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
        </div>

        <Options
          userOptions={userOptions}
          defaultOptions={settings.initialOption}
          handleOptions={handleOptions}
          handleOptionButton={handleOptionButton}
          handleInputOptions={handleInputOptions}
          handleResetOptions={handleResetOptions}
        />

        <div className="display cmn-py">
          <div className="display__wrapper">
            <p className="side-note">
              <small>並び替える・削除する</small>
            </p>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <ul
                    className="display__list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {hasItems
                      ? userList.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <li
                                className={`display__item${item.skip ? ' display__item-none' : ''}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ userSelect: 'none', ...provided.draggableProps.style }}
                              >
                                <Icon name="drag_handle" size={24} className="display__icon-drag" />
                                <p className="display__slug">{item.slug}</p>
                                <small className="display__name">{item.name}</small>
                                <button
                                  className="display__btn-trash button-icon button-icon--delete"
                                  onClick={() => handleDeleteItem(index)}
                                >
                                  <Icon name="delete" size={16} />
                                </button>
                              </li>
                            )}
                          </Draggable>
                        ))
                      : (
                        <button className="generate-button" onClick={generateInitList}>
                          初期リストを作成する
                        </button>
                      )}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>

      <div className="main__main-r">
        {['header', 'drawer', 'footer', 'sitemap'].map((section) => (
          <Output key={section} title={section} {...outputProps} generateInitList={generateInitList} />
        ))}
      </div>
    </main>
  );
}
