import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => {
    showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration) => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration) => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration) => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
