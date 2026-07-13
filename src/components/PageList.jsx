import { GripIcon, TrashIcon } from "../lib/icons.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./PageList.css";
import { cx } from "../lib/cx";

export default function PageList({ pages, onReorder, onRemove, onRestoreDefaults }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div className="page-list">
      <div className="page-list__head">
        <span className="page-list__label">Pages</span>
        <span className="page-list__meta">{pages.length} 件 · ドラッグで並べ替え</span>
      </div>

      {pages.length === 0 ? (
        <div className="page-list__empty">
          <span className="page-list__empty-text">ページがありません</span>
          <button className="page-list__restore" type="button" onClick={onRestoreDefaults}>
            デフォルトのページを生成
          </button>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pages">
            {(droppableProvided) => (
              <div className="page-list__items" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                {pages.map((p, i) => (
                  <Draggable key={p.slug} draggableId={p.slug} index={i}>
                    {(draggableProvided, snapshot) => (
                      <div
                        className={cx("page-list__row", snapshot.isDragging && "page-list__row--dragging")}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <GripIcon color="var(--faint)" className="page-list__handle" />
                        <span className="page-list__name">{p.name}</span>
                        <span className="page-list__href">{p.href}</span>
                        <button
                          type="button"
                          className="page-list__remove"
                          onClick={() => onRemove(i)}
                          aria-label={`${p.name}を削除`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
