import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../core/config/axios"; // usa instancia con baseURL
import ChangePasswordModal from "../components/ChangePasswordModal";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import { useAuth } from "../../authentication/context/AuthContext";
import { useNotification } from "../../../core/context/NotificationContext";

function UserPreferences() {
  const [avatar, setAvatar] = useState("https://unavatar.io/substack/bankless");
  const [tempAvatar, setTempAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setNombre(userData.nombre || "");
      setCorreo(userData.email || "");
      if (userData.avatar_url) {
        setAvatar(`${import.meta.env.VITE_STATIC_URL}/${userData.avatar_url}`);
      }
    }
  }, []);

  useEffect(() => {
    setTempAvatar(avatar);
  }, [avatar]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      showNotification('Solo se permiten archivos de imagen', 'error');
      return;
    }
    
    // Validar tamaño de archivo (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showNotification('El archivo es demasiado grande. El tamaño máximo permitido es 5MB', 'error');
      return;
    }
    
    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setTempAvatar(objectUrl);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      // Actualizar nombre
      await api.put(
        "/usuarios/perfil",
        { nombre },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let avatarUrl = null;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const response = await api.post("/usuarios/avatar", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        avatarUrl = response.data.avatarUrl;
        const fullUrl = `${import.meta.env.VITE_STATIC_URL}/${avatarUrl}`;
        setAvatar(fullUrl);
      }

      const updatedUserData = { nombre };
      if (avatarUrl) {
        updatedUserData.avatar_url = avatarUrl;
      }
      updateUser(updatedUserData);

      showNotification("Los cambios fueron guardados con éxito");
      setAvatarFile(null);
      setShowConfirmModal(false);
      navigate("/account");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      let errorMessage = "Error al guardar los cambios";
      
      if (error.response) {
        // Error del servidor con respuesta
        if (error.response.status === 413) {
          errorMessage = "El archivo es demasiado grande. El tamaño máximo permitido es 5MB";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Error de red
        errorMessage = "Error de conexión. Verifica tu conexión a internet";
      }
      
      showNotification(errorMessage, 'error');
    }
  };

  const handleCancel = () => {
    if (avatarFile) {
      setTempAvatar(avatar);
      setAvatarFile(null);
    }
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
        <img className="preferences__avatar" src={tempAvatar || avatar} alt="Avatar" />
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
            className="input preferences__input-email"
            type="email"
            placeholder="Correo"
            value={correo}
            readOnly
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
