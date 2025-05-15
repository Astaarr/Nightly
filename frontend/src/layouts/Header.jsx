import { NavLink } from 'react-router-dom';
import { useState } from "react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`header ${menuOpen ? "header--black" : ""}`}>
      <div className="header__navbar">
        <NavLink to="/" end className="header__logo">
          <img className='header__img' src="/logo/logoW.svg" alt="Logo" />
        </NavLink>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`} onClick={() => setMenuOpen(false)}>
          <NavLink to="/" end className="header__link">Inicio</NavLink>
          <NavLink to="/places" className="header__link">Lugares</NavLink>
          <NavLink to="/events" className="header__link">Eventos</NavLink>
        </nav>

        <div className="header__actions">
          <NavLink to="/login" className="header__auth"><i className="fa-solid fa-right-to-bracket"></i> <span className='header__auth-text'>Iniciar Sesión</span></NavLink>

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
