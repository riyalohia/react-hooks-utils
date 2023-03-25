import { useEffect, useState } from 'react';

export const usePersist = (key, data) => {
  const storageKey = `persist-cache-${key}`;
  const storageValue = localStorage.getItem(storageKey);
  const persistedValue = JSON.parse(storageValue ?? '{}');
  const [state, setState] = useState(storageValue ? persistedValue : data);

  useEffect(() => {
    if (data) {
      setState(data);
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);
  return state;
};