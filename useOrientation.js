import { useEffect, useState } from 'react';

export const defaultState = {
  angle: 0,
  type: 'landscape-primary',
};

const useOrientation = (initialState = defaultState) => {
  const [state, setState] = useState(initialState);

  const onOrientationChangeEvent = () => {
    const { orientation } = state;
    const { angle, type } = orientation;

    if (!orientation) {
      setState(initialState);
    }

    setState({ angle, type });
  };

  useEffect(() => {
    window.addEventListener(
      'orientationchange',
      onOrientationChangeEvent,
      true,
    );

    return () => {
      window.addEventListener(
        'orientationchange',
        onOrientationChangeEvent,
        true,
      );
    };
  }, []);

  return state;
};

export default useOrientation;