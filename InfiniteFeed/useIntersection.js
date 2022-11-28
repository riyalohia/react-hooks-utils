import { useState, useEffect } from 'react';

const useIntersection = () => {
  const [intersecting, setIntersecting] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      setIntersecting(entries[0]?.isIntersecting);
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element]);

  return { intersecting, ref: (el) => el && setElement(el) };
};

export default useIntersection;
