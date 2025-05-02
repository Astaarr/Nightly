import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo"><img className='header__logo_img' src="" alt="Logo" /></div>
      <nav className="header__nav">
        <a href="/" className="header__link">Inicio</a>
        <a href="/eventos" className="header__link">Eventos</a>
      </nav>
    </header>
  );
};

export default Header;