import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ConfirmModal from "../components/ConfirmModal";

function UserPreferences() {
  const [avatar, setAvatar] = useState("https://unavatar.io/substack/bankless");
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setNombre(userData.nombre || "");
      setCorreo(userData.email || "");

      if (userData.avatar_url) {
        setAvatar(`http://localhost:4000/${userData.avatar_url}`);
      }
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post("http://localhost:4000/api/usuarios/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { avatarUrl } = response.data;
      const fullUrl = `http://localhost:4000/${avatarUrl}`;
      setAvatar(fullUrl);

      // Actualizar localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, avatar_url: avatarUrl }));
    } catch (error) {
      console.error("Error al subir avatar:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:4000/api/usuarios/perfil",
        { nombre, email: correo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, nombre, email: correo }));

      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setShowChangePasswordModal(false);
  };

  return (
    <div className="preferences">
      {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title="Atención"
          message="¿Estás seguro que deseas guardar los cambios?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <header className="preferences__header">
        <h1>Preferencias</h1>
        <Link to="/account">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </header>

      <div className="preferences__avatar-container" onClick={handleAvatarClick}>
        <img className="preferences__avatar" src={avatar} alt="Avatar" />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleAvatarChange}
      />

      <div className="preferences__input-container">
        <label htmlFor="nombre" className="preferences__label">Nombre</label>
        <div className="input__container input__container--user">
          <input
            id="nombre"
            className="input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      </div>

      <div className="preferences__input-container">
        <label htmlFor="correo" className="preferences__label">Correo</label>
        <div className="input__container input__container--email">
          <input
            id="correo"
            className="input"
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
      </div>

      <div className="preferences__input-container">
        <span className="preferences__message">
          ¿Deseas modificar la contraseña?
        </span>
        <button
          className="preferences__change-password"
          onClick={() => setShowChangePasswordModal(true)}
        >
          Modificar contraseña
        </button>
      </div>

      <div className="preferences__input-container">
        <button
          className="preferences__save-button"
          onClick={() => setShowConfirmModal(true)}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default UserPreferences;
