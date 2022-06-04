import { useEffect } from 'react';

export const useToggleBodyClass = (addClass, className) => {
  useEffect(() => {
    addClass ? document.body.classList.add(className) : document.body.classList.remove(className);
  }, [addClass, className]);
};