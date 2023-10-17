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
            id="sougou_handle"
            checked={data.sougouTogg}
            onChange={func.handleSougouToggle}
          />
          <label htmlFor="sougou_handle">総合トップ</label>
        </div>
        <div className="option__item">
          <input
            type="checkbox"
            id="remove_handle"
            checked={data.removeActs}
            onChange={func.handleRemoveActs}
          />
          <label htmlFor="remove_handle">サイトマップActive</label>
        </div>
        <div className="option__item">
          <input
            type="checkbox"
            id="remove_color"
            checked={data.removeColr}
            onChange={func.handleRemoveColor}
          />
          <label htmlFor="remove_handle">カラー</label>
        </div>
      </div>
    </section>
  );
}
