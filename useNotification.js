import { useCallback } from 'react';

export const defaultValue = {
  options: {
    dir: 'auto',
    lang: 'EN',
  },
  title: '💡 Test notification!',
};

const useNotification = (value = defaultValue) => {
  const { options, title } = defaultValue;
  const notify = () =>
    useCallback(() => {
      if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);
      } else {
        // Fail silenty
        return;
      }
    }, []);

  return notify;
};

export default useNotification;