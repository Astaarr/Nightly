import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../core/config/axios";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../../../core/context/NotificationContext";

function AuthForm({ type = "login" }) {
  const isLogin = type === "login"; // Definir isLogin aquí al inicio del componente
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto
  const { showNotification } = useNotification();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

      const fecha = new Date(fecha_nacimiento);
      if (isNaN(fecha.getTime())) {
        setMessage("Fecha de nacimiento no válida");
        setErrorField("fecha_nacimiento");
        return;
      }

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
        : { nombre, email, password, fecha_nacimiento };

        const response = await api.post(
          `/auth${endpoint}`,
          payload
        );        

      if (isLogin) {
        const { token, user } = response.data;
        login(token, user);
        // Mostrar notificación de bienvenida con el nombre del usuario
        showNotification(`¡Bienvenido/a ${user.nombre}! Nos alegra verte de nuevo.`);
        navigate("/places");
      } else {
        setMessage(response.data.message);
        setIsSuccess(true);
        // Mostrar notificación al registrarse
        showNotification("¡Registro exitoso! Te hemos enviado un correo de bienvenida.");
        navigate("/login");
      }
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
    <div className="auth-form" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
      <div className="input-container">
        <h2 className="auth-form__title">NightLy</h2>
        <p className="auth-form__description">
          {isLogin ? "Inicia sesión para continuar" : "Crea una cuenta nueva"}
        </p>
      </div>

      {!isLogin && (
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
      )}

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

      {!isLogin && (
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

      <button type="submit" className="auth-form__button" onClick={handleSubmit}>
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </button>

      <div className="auth-form__switch">
        {isLogin ? (
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="auth-form__link">Regístrate</Link>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="auth-form__link">Inicia sesión</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
