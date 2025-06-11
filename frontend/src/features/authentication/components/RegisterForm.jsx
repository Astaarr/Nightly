import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";

function RegisterForm() {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    fecha_nacimiento,
    setFechaNacimiento,
    message,
    isSuccess,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    getInputClassName,
    getMessageClassName,
  } = useAuthForm(false); // false para indicar que es register

  return (
    <div className="auth-form" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
      <div className="input-container">
        <h2 className="auth-form__title">NightLy</h2>
        <p className="auth-form__description">
          Crea una cuenta nueva
        </p>
      </div>

      <div className="auth-form__input-container">
        <label htmlFor="nombre" className="auth-form__label">Nombre</label>
        <div className="input__container input__container--user">
          <input
            id="nombre"
            className={`${getInputClassName("nombre")} input`}
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__input-container">
        <label htmlFor="email" className="auth-form__label">Correo</label>
        <div className="input__container input__container--email">
          <input
            id="email"
            className={`${getInputClassName("email")} input`}
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__input-container">
        <label htmlFor="password" className="auth-form__label">Contraseña</label>
        <div className={`input__container input__container--password ${showPassword ? 'show-password' : ''}`}>
          <input
            id="password"
            className={`${getInputClassName("password")} input input--password`}
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span 
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </span>
        </div>
      </div>

      <div className="auth-form__input-container">
        <label htmlFor="fecha_nacimiento" className="auth-form__label">
          Fecha de nacimiento
        </label>
        <div className="input__container input__container--date">
          <input
            id="fecha_nacimiento"
            className={`${getInputClassName("fecha_nacimiento")} input`}
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
      </div>

      {message && (
        <p className={getMessageClassName()}>
          <i
            className={
              isSuccess ? "fa-solid fa-check" : "fa-solid fa-circle-exclamation"
            }
          ></i>{" "}
          {message}
        </p>
      )}

      <button type="submit" className="auth-form__button" onClick={handleSubmit}>
        Registrarse
      </button>

      <div className="auth-form__switch">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="auth-form__link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm; 