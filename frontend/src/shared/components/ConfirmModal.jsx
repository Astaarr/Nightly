function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, showCancel = true }) {

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h1 className="modal__title">{title}</h1>
          <p className="modal__description">{message}</p>
        </div>

        <div className="modal__buttons">
          {showCancel && (
            <button
              className="modal__button modal__button--cancel"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
          <button className="modal__button" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
