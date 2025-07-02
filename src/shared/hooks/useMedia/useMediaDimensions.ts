import { useEffect, useState } from 'react';
import { Dimensions } from '@/shared/types';
import { useMediaLoad } from './useMediaLoad';
import { useResizeObserver } from '../useResizeObserver';

export const useMediaDimensions = () => {
  const { mediaRef, isLoaded, handleMediaLoad } = useMediaLoad();

  const observedDimensions = useResizeObserver(mediaRef);
  console.log('observedDimensions', observedDimensions);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    if (isLoaded && mediaRef.current) {
      if (!observedDimensions) {
        setDimensions({
          width: mediaRef.current.clientWidth,
          height: mediaRef.current.clientHeight,
        });
      } else {
        setDimensions(observedDimensions);
      }
    }
  }, [isLoaded, observedDimensions, mediaRef]);

  return {
    mediaRef,
    dimensions,
    handleMediaLoad,
  };
};
