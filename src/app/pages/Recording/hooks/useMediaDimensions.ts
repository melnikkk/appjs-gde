import { useMediaLoad } from './useMediaLoad';
import { useResizeObserver } from './useResizeObserver';

export const useMediaDimensions = () => {
  const { mediaRef, isLoaded, handleMediaLoad } = useMediaLoad();
  const dimensions = useResizeObserver(mediaRef);

  return {
    mediaRef,
    dimensions: isLoaded ? dimensions : null,
    handleMediaLoad,
  };
};
