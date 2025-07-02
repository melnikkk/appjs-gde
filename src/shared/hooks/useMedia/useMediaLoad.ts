import { useEffect, useRef, useState, RefObject } from 'react';

type MediaElement = HTMLImageElement | HTMLVideoElement;

export const useMediaLoad = (): {
  mediaRef: RefObject<MediaElement>;
  isLoaded: boolean;
  handleMediaLoad: () => void;
} => {
  const mediaRef = useRef<MediaElement | null>(null);
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

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    element.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      element.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return { mediaRef, isLoaded, handleMediaLoad };
};
