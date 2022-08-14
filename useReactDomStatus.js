import { useEffect, useState } from 'react';

export const initialState = {
  readyState: document.readyState,
};

const useDOMState = () => {
  const [state, setState] = useState(initialState);

  const handleDOM = () => {
    setState({ readyState: document.readyState });
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', handleDOM);
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOM);
    };
  }, []);

  return state;
};

export default useDOMState;