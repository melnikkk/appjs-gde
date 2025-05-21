import { useCallback, useState, RefObject } from 'react';

export const useDOMRect = <T extends HTMLElement>(elementRef: RefObject<T | null>) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (elementRef.current) {
      setRect(elementRef.current.getBoundingClientRect());
    }
  }, [elementRef]);

  return { rect, updateRect };
};
