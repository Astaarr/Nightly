import React from "react";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ConfirmModal from "../components/ConfirmModal";

function UserPreferences() {
  const [avatar, setAvatar] = React.useState(
    "https://unavatar.io/substack/bankless"
  );
  const fileInputRef = React.useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Estados separados para cada modal
  const [showChangePasswordModal, setShowChangePasswordModal] =
    React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleConfirm = () => {
    alert("Acción confirmada ✅"); //Cambiar alert por envío de datos a BBDD
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setShowChangePasswordModal(false);
  };

  return (
    <div className="preferences">
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title={"Atención"}
          message={"¿Estás seguro que desea guardar los cambios?"}
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

      <div
        className="preferences__avatar-container"
        onClick={handleAvatarClick}
      >
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
        <label htmlFor="nombre" className="preferences__label">
          Nombre
        </label>
        <div className="input__container input__container--user">
          <input
            id="nombre"
            className="input"
            type="text"
            placeholder="Nombre"
          />
        </div>
      </div>

      <div className="preferences__input-container">
        <label htmlFor="correo" className="preferences__label">
          Correo
        </label>
        <div className="input__container input__container--email">
          <input
            id="correo"
            className="input"
            type="email"
            placeholder="Correo"
          />
        </div>
      </div>

      <div className="preferences__input-container">
        <span className="preferences__message">
          ¿Desea modificar la contraseña?{" "}
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
