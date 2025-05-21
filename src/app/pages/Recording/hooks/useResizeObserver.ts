import { useEffect, useState, RefObject } from 'react';

export const useResizeObserver = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
): { width: number; height: number } | null => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const updateDimensions = () => {
      setDimensions({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return dimensions;
};
