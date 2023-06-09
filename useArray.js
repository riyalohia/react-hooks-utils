import { useState, useCallback } from 'react';

const useArray = (initial) => {
  const [value, setValue] = useState(initial);
  return {
    value,
    setValue,
    add: useCallback(a => setValue((v) => [...v, a]), []),
    clear: useCallback(() => setValue(() => []), []),
    removeById: useCallback(
      id => setValue((arr) => arr.filter((v) => v && v.id !== id)),
      []
    ),
    removeIndex: useCallback(
      index =>
        setValue((arr) => arr.filter((v, i) => i !== index)),
      []
    )
  };
};

export default useArray;