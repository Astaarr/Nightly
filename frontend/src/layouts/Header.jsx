import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // Ahora usa el contexto
  
  // Referencias para detectar clics fuera de los modales
  const authModalRef = useRef(null);
  const navModalRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthToggle = () => {
    setAuthOpen(!authOpen);
  };

  // Effect para manejar clics fuera de los modales
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar modal de autenticación si se hace clic fuera
      if (authModalRef.current && !authModalRef.current.contains(event.target) && authOpen) {
        setAuthOpen(false);
      }
      
      // Cerrar modal de navegación si se hace clic fuera
      if (navModalRef.current && !navModalRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    // Agregar event listener cuando algún modal esté abierto
    if (authOpen || menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup del event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authOpen, menuOpen]);

  return (
    <header className={`header ${menuOpen || authOpen ? "header--black" : ""}`}>
      <div className="header__navbar">
        <NavLink to="/" end className="header__logo">
          <img className="header__img" src="/logo/logoW.svg" alt="Logo" />
        </NavLink>

        <nav
          ref={navModalRef}
          className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
          onClick={handleMenuToggle}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/place-finder"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Para ti
          </NavLink>
          <NavLink
            to="/places"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Lugares
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Eventos
          </NavLink>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <div className="header__auth" ref={authModalRef}>
              <button
                className="header__auth-logged"
                onClick={handleAuthToggle}
              >
                <img
                  className="header__auth-avatar"
                  src={
                    user.avatar_url
                      ? `${import.meta.env.VITE_STATIC_URL}/${user.avatar_url}`
                      : "https://unavatar.io/substack/bankless"
                  }
                  alt="Avatar usuario"
                />


                <span className="header__auth-text"> {user.nombre}</span>
              </button>

              <div
                className={`header__auth-info ${authOpen ? "header__auth-info--visible" : ""
                  }`}
                onClick={handleAuthToggle}
              >
                <div className="header__auth-details">
                  <span className="header__auth-username">
                    <strong> {user.nombre}</strong>
                  </span>

                  {/* <span className="header__auth-email">{user.email}</span> */}
                </div>

                <NavLink to="/account" className="header__link">
                  <i className="fa-regular fa-circle-user"></i> Mi cuenta
                </NavLink>
                <button onClick={logout} className="header__auth-logout">
                  <i className="fa-solid fa-right-to-bracket"></i> Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="header__auth">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="header__auth-text"> Iniciar Sesión</span>
            </NavLink>
          )}

          <button
            className={`header__action ${menuOpen ? "header__action--visible" : "header__action--hidden"
              }`}
            onClick={handleMenuToggle}
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className={`header__action ${menuOpen ? "header__action--hidden" : "header__action--visible"
              }`}
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
