import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";

function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    getInputClassName,
    getMessageClassName,
  } = useAuthForm(true); // true para indicar que es login

  return (
    <div className="auth-form" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
      <div className="input-container">
        <h2 className="auth-form__title">NightLy</h2>
        <p className="auth-form__description">
          Inicia sesión para continuar
        </p>
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

      {message && (
        <p className={getMessageClassName()}>
          <i className="fa-solid fa-circle-exclamation"></i>{" "}
          {message}
        </p>
      )}

      <button type="submit" className="auth-form__button" onClick={handleSubmit}>
        Iniciar sesión
      </button>

      <div className="auth-form__switch">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="auth-form__link">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm; 