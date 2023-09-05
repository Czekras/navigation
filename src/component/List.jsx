export default function List({ data }) {
  return (
    <section className="display cmn-py">
      <div className="display__wrapper">
        <ul className="display__list">
          {Object.entries(data.masterList).map((item, index) => {
            return (
              <li className="display__item" key={item.id}>
                <span className="display__icon material-symbols-outlined">
                  drag_handle
                </span>
                  {item[1].slug}, {item[1].name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
