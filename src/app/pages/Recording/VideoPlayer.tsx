import { useEffect } from 'react';
import { millesecondsToSeconds } from '@/app/shared/utils';

interface Props {
  width: number;
  height: number;
  pauseTime: number;
  source: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onTimeUpdate?: (time: number) => void;
  handleMediaLoad: () => void;
}

export const VideoPlayer: React.FC<Props> = ({
  source,
  width,
  height,
  pauseTime,
  onTimeUpdate,
  videoRef,
  handleMediaLoad,
}) => {
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && isFinite(pauseTime) && pauseTime >= 0) {
      videoElement.currentTime = millesecondsToSeconds(pauseTime);

      const handleTimeUpdate = () => {
        if (onTimeUpdate && videoElement) {
          onTimeUpdate(Math.floor(videoElement.currentTime));
        }
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [pauseTime, onTimeUpdate, videoRef]);

  return (
    <video
      ref={videoRef as React.RefObject<HTMLVideoElement>}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        maxHeight: `${height}px`,
        maxWidth: `${width}px`,
        objectFit: 'contain',
      }}
      className="block h-auto w-full rounded-lg"
      onLoadedMetadata={handleMediaLoad}
      onLoadedData={handleMediaLoad}
      preload="metadata"
    >
      {source && <source src={source} />}
      Your browser does not support the video tag.
    </video>
  );
};
