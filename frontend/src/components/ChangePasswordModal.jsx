import React from "react";

function ChangePasswordModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1 className="modal__title">Cambiar contraseña</h1>
        <div className="modal__field">
          <label>Contraseña actual</label>
          <input type="password" placeholder="Contraseña actual" />
        </div>
        <div className="modal__field">
          <label>Nueva contraseña</label>
          <input type="password" placeholder="Nueva contraseña" />
        </div>
        <div className="modal__buttons">
          <button className="modal__button modal__button--cancel" onClick={onClose}>Cancelar</button>
          <button className="modal__button" onClick={onClose}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
