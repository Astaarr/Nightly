

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo"><img className='header__logo_img' src="" alt="Logo" /></div>
      <nav className="header__nav">
        <a href="/" className="header__link">Inicio</a>
        <a href="/discotecas" className="header__link">Eventos</a>
        <a href="/login" className="header__link">Iniciar sesión</a>
        <a href="/register" className="header__link">Registrarse</a>
      </nav>
    </header>
  );
};

export default Header;