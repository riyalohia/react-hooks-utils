import { useCallback, useEffect, useState, useRef } from 'react';


export function useIsTyping({ timeout = 1000 } = {}) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentEl, setCurrentEl] = useState(null);
  const timeoutRef = useRef(null);

  const reset = useCallback(() => {
    // Debounce `reset()` based on `timeout`
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, timeout);
  }, [timeout]);

  const register = useCallback(el => {
    setCurrentEl(el);
    if (!el) {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsTyping(false);
    if (!currentEl) {
      return;
    }

    const keyUpDownListener = (e) => {
      const hasValue = (e.target).value !== '';

      setIsTyping(hasValue);
      reset();
    };
    const blurListener = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsTyping(false);
    };

    currentEl.addEventListener('keyup', keyUpDownListener);
    currentEl.addEventListener('keydown', keyUpDownListener);
    currentEl.addEventListener('blur', blurListener);

    return () => {
      currentEl.removeEventListener('keydown', keyUpDownListener);
      currentEl.removeEventListener('keyup', keyUpDownListener);
      currentEl.removeEventListener('blur', blurListener);
    };
  }, [currentEl, reset]);

  return [isTyping, register];
}

export default useIsTyping;