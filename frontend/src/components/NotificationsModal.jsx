import { useEffect } from 'react';

function NotificationsModal({ isActive = false, children, onHide, autoHideDelay = 3000 }) {
  useEffect(() => {
    let timer;
    if (isActive && onHide) {
      timer = setTimeout(() => {
        onHide();
      }, autoHideDelay);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, onHide, autoHideDelay]);

  return (
    <div className={`notifications-modal ${isActive ? 'notifications-modal--active' : ''}`}>
      <div className="notifications-modal__content">
        <div className="notifications-modal__icon">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div className="notifications-modal__text">
          <h2>Notificación</h2>
          {children || <p>Revisa tu correo para más detalles.</p>}
        </div>
      </div>
    </div>
  );
}

export default NotificationsModal;
