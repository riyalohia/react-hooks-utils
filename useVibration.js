import { useCallback } from 'react';

export const defaultValue = 200;

const useVibration = (value = defaultValue) => {
  const vibrate = () =>
    useCallback(() => {
      navigator.vibrate(value);
    }, []);

  return vibrate;
};

export default useVibration;