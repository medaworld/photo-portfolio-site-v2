import { useEffect, useState } from 'react';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    if (
      activeNotification &&
      ['success', 'error'].includes(activeNotification.status)
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const context = {
    notification: activeNotification,
    showNotification: setActiveNotification,
    hideNotification: () => setActiveNotification(null),
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};
