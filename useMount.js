import { useState } from 'react';
import useTimeout from './useTimeout';

const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);
  useTimeout(() => {
    setIsMounted(true);
  }, 0);
  return isMounted;
};

export default useMount;
