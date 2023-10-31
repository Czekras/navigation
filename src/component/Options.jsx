export default function Options({ func, data }) {
  return (
    <section className="option">
      <div className="option__wrapper">
        <p className="side-note">
          <small>オプション</small>
        </p>
        <div className="option__item">
          <input
            type="checkbox"
            id="removeSougou"
            defaultChecked={data.userOptions.removeSougou}
            onChange={(e) => func.handleOptions(e)}
          />
          <label htmlFor="removeSougou">総合トップ</label>
        </div>
        {/* <div className="option__item">
          <input
            type="checkbox"
            id="removeActive"
            defaultChecked={data.userOptions.removeActive}
            onChange={(e) => func.handleOptions(e)}
          />
          <label htmlFor="removeActive">サイトマップActive</label>
        </div> */}
        <div className="option__item">
          <input
            type="checkbox"
            id="removeColors"
            defaultChecked={data.userOptions.removeColors}
            onChange={(e) => func.handleOptions(e)}
          />
          <label htmlFor="removeColors">コードカラー</label>
        </div>
      </div>
    </section>
  );
}
