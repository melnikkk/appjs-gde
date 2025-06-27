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
    if (videoRef.current && isFinite(pauseTime) && pauseTime >= 0) {
      videoRef.current.currentTime = millesecondsToSeconds(pauseTime);

      const handleTimeUpdate = () => {
        if (onTimeUpdate && videoRef.current) {
          onTimeUpdate(Math.floor(videoRef.current.currentTime));
        }
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [pauseTime, onTimeUpdate]);

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
