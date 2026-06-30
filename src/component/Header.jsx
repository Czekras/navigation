import pkg from '../../package.json';

export default function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <a className="header__logo" href={import.meta.env.BASE_URL}>
          <h1 className="header__title">navigation</h1>
          <span className="header__version">v{pkg.version}</span>
        </a>
      </div>
    </header>
  );
}
