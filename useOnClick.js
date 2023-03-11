import { useEffect } from 'react';

export const useOnClick = (handler) => {
  useEffect(() => {
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [handler]);
};