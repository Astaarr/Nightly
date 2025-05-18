

function ChangePasswordModal({ onClose }) {

  const handleConfirm = () => {
    alert("Acción confirmada ✅"); //Cambiar alert por envío de datos a BBDD
    setShowConfirmModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
            <h1 className="modal__title">Cambiar contraseña</h1>
        </div>
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
          <button className="modal__button" onClick={handleConfirm}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
