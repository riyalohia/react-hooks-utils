import { useEffect } from 'react';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(() => {
        callback();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, []);
};

export default useTimeout;
