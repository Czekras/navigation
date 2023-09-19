export default function Header() {
  const currentPage = window.location.href;

  return (
    <header className="header">
      <div className="header__wrapper">
        <a className="header__logo" href={currentPage}>
          <h1 className="header__title">NAVIZEN</h1>
        </a>
        {/* <ul className="header__list">
          <li className="heade__item">
            <a className="header__link" href="">
              <span className="material-symbols-outlined">code</span>
            </a>
          </li>
          <li className="heade__item">
            <a className="header__link" href="">
              <span className="material-symbols-outlined">dark_mode</span>
            </a>
          </li>
        </ul> */}
      </div>
    </header>
  );
}
