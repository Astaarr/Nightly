import { createContext, useContext, useState } from 'react';
import NotificationsModal from '../components/NotificationsModal';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = (message, autoHideDelay = 3000) => {
    setNotificationMessage(message || 'Revisa tu correo para más detalles.');
    setIsNotificationActive(true);
    
    // Ocultar automáticamente después del tiempo especificado
    setTimeout(() => {
      setIsNotificationActive(false);
    }, autoHideDelay);
  };

  const hideNotification = () => {
    setIsNotificationActive(false);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        showNotification, 
        hideNotification
      }}
    >
      {children}
      <NotificationsModal 
        isActive={isNotificationActive}
        onHide={hideNotification}
      >
        {notificationMessage}
      </NotificationsModal>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return context;
} 