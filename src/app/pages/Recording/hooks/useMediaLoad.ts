import { useEffect, useRef, useState, RefObject } from 'react';

type MediaElement = HTMLImageElement | HTMLVideoElement;

export const useMediaLoad = (): {
  mediaRef: RefObject<MediaElement>;
  isLoaded: boolean;
  handleMediaLoad: () => void;
} => {
  const mediaRef = useRef<MediaElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const element = mediaRef.current;

    if (!element) {
      return;
    }

    if (
      (element instanceof HTMLImageElement && element.complete) ||
      (element instanceof HTMLVideoElement && element.readyState >= 2)
    ) {
      setIsLoaded(true);
    }

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    element.addEventListener('load', handleLoad);
    element.addEventListener('loadeddata', handleLoadedData);

    return () => {
      element.removeEventListener('load', handleLoad);
      element.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return { mediaRef, isLoaded, handleMediaLoad };
};
