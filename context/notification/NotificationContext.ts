import { createContext } from 'react';

interface NotificationProps {
  title: string;
  message: string;
  status: string;
}

interface NotificationContextProps {
  notification: null | NotificationProps;
  showNotification: (notification: NotificationProps) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});
