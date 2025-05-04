import { useState } from "react";
import "../../public/logo/logoW.svg"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`header ${menuOpen ? "header--black" : ""}`}>
      <div className="header__navbar">
        <a href="/" title="Home" className="header__logo">
          <img className='header__img' src="../../public/logo/logoW.svg" alt="Logo" />
        </a>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <a href="/" className="header__link">Inicio</a>
          <a href="/discotecas" className="header__link">Eventos</a>
          <a href="/login" className="header__link"><i class="fa-solid fa-right-to-bracket"></i> Iniciar sesión</a>
        </nav>

        <div className="header__actions">
          <button
            className={`header__action ${menuOpen ? "header__action--visible" : "header__action--hidden"}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className={`header__action ${menuOpen ? "header__action--hidden" : "header__action--visible"}`}
            onClick={() => setMenuOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
