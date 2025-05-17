import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // Ahora usa el contexto

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  const handleAuthToggle = () => {
    setAuthOpen(!authOpen);
  }
  
  return (
    <header className={`header ${menuOpen ? "header--black" : ""}`}>
      <div className="header__navbar">
        <NavLink to="/" end className="header__logo">
          <img className="header__img" src="/logo/logoW.svg" alt="Logo" />
        </NavLink>

        <nav
          className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
          onClick={handleMenuToggle}
        >
          <NavLink to="/" end className="header__link">Inicio</NavLink>
          <NavLink to="/places" className="header__link">Lugares</NavLink>
          <NavLink to="/events" className="header__link">Eventos</NavLink>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? 
          (
            <div className="header__auth">
              <button className='header__auth-logged' onClick={handleAuthToggle}>
                <i className="fa-solid fa-user"></i>
                <span className="header__auth-text"> {user.nombre}</span>
              </button>

              <div className={`header__auth-info ${authOpen? "header__auth-info--visible" : ""}`}>
                  <span className='header__auth-email'>{user.email}</span>
                  <NavLink to="/places" className="header__link"><i class="fa-solid fa-gear"></i> Preferencias</NavLink>
                  <button onClick={logout} className="header__auth-logout">
                    <i className="fa-solid fa-right-to-bracket"></i> Cerrar Sesión 
                  </button>
              </div>
            </div>
          ) 
          : 
          (
            <NavLink to="/login" className="header__auth">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="header__auth-text"> Iniciar Sesión</span>
            </NavLink>
          )}

          <button
            className={`header__action ${menuOpen ? "header__action--visible" : "header__action--hidden"}`}
            onClick={handleMenuToggle}
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className={`header__action ${menuOpen ? "header__action--hidden" : "header__action--visible"}`}
            onClick={handleMenuToggle}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
