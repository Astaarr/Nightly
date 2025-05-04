import { useState } from "react";
import axios from "axios";

function AuthForm({ type = "login" }) {
  const isLogin = type === "login";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setMessage("Correo no válido");
      return;
    }

    if (password.trim() === "") {
      setMessage("La contraseña no puede estar vacía");
      return;
    }

    if (!isLogin) {
      if (nombre.trim() === "") {
        setMessage("El nombre es obligatorio");
        return;
      }
      if (!fechaNacimiento) {
        setMessage("La fecha de nacimiento es obligatoria");
        return;
      }
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin
        ? { email, password }
        : { nombre, email, password, fechaNacimiento };

      const response = await axios.post(
        `http://localhost:4000/api/auth${endpoint}`,
        payload
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en la operación");
    }
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
            <input
              id="nombre"
              className="auth-form__input"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="auth-form__input-container">
        <label htmlFor="email" className="auth-form__label">
          Correo
        </label>
        <input
          id="email"
          className="auth-form__input"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-form__input-container">
        <label htmlFor="password" className="auth-form__label">
          Contraseña
        </label>
        <input
          id="password"
          className="auth-form__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {!isLogin && (
        <>
          <div className="auth-form__input-container">
            <label htmlFor="fechaNacimiento" className="auth-form__label">
              Fecha de nacimiento
            </label>
            <input
              id="fechaNacimiento"
              className="auth-form__input"
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
        </>
      )}

      <button className="auth-form__button" onClick={handleSubmit}>
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </button>

      <div className="auth-form__switch">
        {isLogin ? (
          <p>
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="auth-form__link">
              Regístrate
            </a>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="auth-form__link">
              Inicia sesión
            </a>
          </p>
        )}
      </div>

      {message && <p className="auth-form__message">{message}</p>}
    </div>
  );
}

export default AuthForm;
