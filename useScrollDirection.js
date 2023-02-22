import { useEffect, useRef, useState } from 'react';

function useScrollDirection(enable = true) {
  const [scrollDirection, setScrollDirection] =
    useState(null);
  const lastScrollDirectionRef = useRef(null);

  let lastScrollY = typeof window !== 'undefined' ? window.pageYOffset : 0;

  const updateScrollDirection = () => {
    const scrollY = window.pageYOffset;
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    if (
      direction !== lastScrollDirectionRef.current &&
      (scrollY - lastScrollY > 8 || scrollY - lastScrollY < -8)
    ) {
      setScrollDirection(direction);
      lastScrollDirectionRef.current = direction;
    }
    lastScrollY = scrollY > 0 ? scrollY : 0;
  };

  useEffect(() => {
    if (enable) window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [enable]);

  return scrollDirection;
}

export default useScrollDirection;
