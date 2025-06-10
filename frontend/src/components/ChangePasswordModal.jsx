import { useState } from "react";
import api from "../api/axios";
import { useNotification } from "../context/NotificationContext";

function ChangePasswordModal({ onClose }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { showNotification } = useNotification();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirm = async () => {
    setMensaje("");
    setExito(false);

    if (!actual || !nueva) {
      setMensaje("Debes rellenar ambos campos");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        "/usuarios/cambiar-password",
        { actual, nueva },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      setMensaje(response.data.message);
      setExito(true);
      setActual("");
      setNueva("");
      
      // Mostrar notificación
      showNotification("Contraseña actualizada con éxito");
      
      // Cerrar el modal después de 1 segundo
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setMensaje(
        error.response?.data?.message || "Error al cambiar contraseña"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h1 className="modal__title">Cambiar contraseña</h1>
        </div>

        <div className="modal__field">
          <label>Contraseña actual</label>
          <div className="input__container input__container--password">
            <input
              className="input input--password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Contraseña actual"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
            />
            <span 
              className="password-toggle-icon"
              onClick={toggleCurrentPasswordVisibility}
            >
              <i className={`fa-solid ${showCurrentPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </span>
          </div>
        </div>

        <div className="modal__field">
          <label>Nueva contraseña</label>
          <div className="input__container input__container--password">
            <input
              className="input input--password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
            />
            <span 
              className="password-toggle-icon"
              onClick={toggleNewPasswordVisibility}
            >
              <i className={`fa-solid ${showNewPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </span>
          </div>
        </div>

        {mensaje && (
          <p className={`modal__message ${exito ? "modal__message--success" : "modal__message--error"}`}>
            {mensaje}
          </p>
        )}

        <div className="modal__buttons">
          <button className="modal__button modal__button--cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal__button" onClick={handleConfirm}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
