import { useEffect, useState, RefObject } from 'react';
import { Dimensions } from '@/domain/Recordings';

export const useResizeObserver = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
): Dimensions | null => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

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
