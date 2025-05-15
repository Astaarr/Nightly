import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AuthForm({ type = "login" }) {
  const isLogin = type === "login";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setErrorField("");
    setIsSuccess(false);

    if (!validateEmail(email)) {
      setMessage("Correo no válido");
      setErrorField("email");
      return;
    }

    if (password.trim() === "") {
      setMessage("La contraseña no puede estar vacía");
      setErrorField("password");
      return;
    }

    if (!isLogin) {
      if (nombre.trim() === "") {
        setMessage("El nombre es obligatorio");
        setErrorField("nombre");
        return;
      }
      if (!fecha_nacimiento) {
        setMessage("La fecha de nacimiento es obligatoria");
        setErrorField("fecha_nacimiento");
        return;
      }

      // Validar que la fecha es válida
      const fecha = new Date(fecha_nacimiento);
      if (isNaN(fecha.getTime())) {
        setMessage("Fecha de nacimiento no válida");
        setErrorField("fecha_nacimiento");
        return;
      }

      // Validar que el usuario tiene al menos 18 años
      const hoy = new Date();
      const edadMinima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
      );
      if (fecha > edadMinima) {
        setMessage("Debes tener al menos 18 años");
        setErrorField("fecha_nacimiento");
        return;
      }
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin
        ? { email, password }
        : {
            nombre,
            email,
            password,
            fecha_nacimiento,
          };

      const response = await axios.post(
        `http://localhost:4000/api/auth${endpoint}`,
        payload
      );
      setMessage(response.data.message);
      setErrorField("");
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en la operación");
      setIsSuccess(false);
    }
  };

  const getInputClassName = (fieldName) => {
    return `auth-form__input ${
      errorField === fieldName ? "auth-form__input--error" : ""
    }`;
  };

  const getMessageClassName = () => {
    return `auth-form__message ${
      isSuccess ? "auth-form__message--success" : ""
    }`;
  };

  return (
    <div className="auth-form">
      <div className="input-container">
        <h2 className="auth-form__title">NightLy</h2>
        <p className="auth-form__description">
          {isLogin ? "Inicia sesión para continuar" : "Crea una cuenta nueva"}
        </p>
      </div>

      {!isLogin && (
        <>
          <div className="auth-form__input-container">
            <label htmlFor="nombre" className="auth-form__label">
              Nombre
            </label>
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
        </>
      )}

      <div className="auth-form__input-container">
        <label htmlFor="email" className="auth-form__label">
          Correo
        </label>
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
        <label htmlFor="password" className="auth-form__label">
          Contraseña
        </label>
        <div className="input__container input__container--password">
          <input
            id="password"
            className={`${getInputClassName("password")} input`}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {!isLogin && (
        <>
          <div className="auth-form__input-container">
            <label htmlFor="fecha_nacimiento" className="auth-form__label">
              Fecha de nacimiento
            </label>
            <div className="input__container input__container--date">
              <input
                id="fecha_nacimiento"
                className={`${getInputClassName("password")} input`}
                type="date"
                value={fecha_nacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

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

      <button className="auth-form__button" onClick={handleSubmit}>
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </button>

      <div className="auth-form__switch">
        {isLogin ? (
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="auth-form__link">
              Regístrate
            </Link>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="auth-form__link">
              Inicia sesión
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
