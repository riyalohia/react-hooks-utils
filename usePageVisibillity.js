import { useEffect, useState } from 'react';

export const initialState = {
  hidden: document.hidden,
  visibilityState: document.visibilityState,
};

const useVisible = () => {
  const [state, setState] = useState(initialState);

  const onVisibilityChangeEvent = (event) => {
    setState({
      hidden: document.hidden,
      visibilityState: document.visibilityState,
    });
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChangeEvent);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChangeEvent);
    };
  }, []);

  return state;
};

export default useVisible;