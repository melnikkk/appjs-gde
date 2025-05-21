import { useRef, useEffect } from 'react';
import { useDOMRect } from './useDOMRect';
import { useResizeObserver } from './useResizeObserver';

export const useElementSize = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);
  const dimensions = useResizeObserver<T>(elementRef);
  const { rect, updateRect } = useDOMRect<T>(elementRef);

  useEffect(() => {
    if (dimensions) {
      updateRect();
    }
  }, [dimensions, updateRect]);

  return {
    elementRef,
    dimensions,
    rect,
    updateRect,
  };
};
