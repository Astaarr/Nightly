import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // 👈 Importa el hook

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // 👈 Usar autenticación

  return (
    <header className={`header ${menuOpen ? "header--black" : ""}`}>
      <div className="header__navbar">
        <NavLink to="/" end className="header__logo">
          <img className="header__img" src="/logo/logoW.svg" alt="Logo" />
        </NavLink>

        <nav
          className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <NavLink to="/" end className="header__link">Inicio</NavLink>
          <NavLink to="/places" className="header__link">Lugares</NavLink>
          <NavLink to="/events" className="header__link">Eventos</NavLink>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <div className="header__user">
              <span className="header__auth-text">Hola, {user?.nombre}</span>
              <button onClick={logout} className="header__auth">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="header__auth-text">Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="header__auth">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="header__auth-text">Iniciar Sesión</span>
            </NavLink>
          )}

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
