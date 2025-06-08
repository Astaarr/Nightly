import { useState } from "react";
import api from "../api/axios";
import { useNotification } from "../context/NotificationContext";

function ChangePasswordModal({ onClose }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const { showNotification } = useNotification();

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
          <input
            type="password"
            placeholder="Contraseña actual"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
          />
        </div>

        <div className="modal__field">
          <label>Nueva contraseña</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
          />
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
