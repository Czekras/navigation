import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./PageList.css";
import { cx } from "../lib/cx";

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

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
                        <span className="page-list__handle">⠿</span>
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
