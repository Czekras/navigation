export default function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <a className="header__logo" href="/">
          <h1 className="header__title">NAVIZEN</h1>
        </a>
        {/* <ul className="header__list">
          <li className="heade__item">
            <a className="header__link" href="">
              <span class="material-symbols-outlined">code</span>
            </a>
          </li>
          <li className="heade__item">
            <a className="header__link" href="">
              <span class="material-symbols-outlined">dark_mode</span>
            </a>
          </li>
        </ul> */}
      </div>
    </header>
  );
}
