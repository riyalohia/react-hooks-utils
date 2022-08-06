import { useEffect, useState } from 'react';

export const initialState = {
  type: null,
};

const useElementFocus = $el => {
  const [state, setState] = useState({});

  const onFocusEvent = (event) => {
    setState({
      type: event.type,
    });
  };

  useEffect(() => {
    $el.addEventListener('onfocus', onFocusEvent);

    return () => {
      $el.removeEventListener('onfocus', onFocusEvent);
    };
  });

  return state;
};

export default useElementFocus;