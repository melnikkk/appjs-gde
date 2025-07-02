import { useEffect } from 'react';
import { millesecondsToSeconds } from '@/shared/lib/time-utils';

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
    if (videoRef.current && pauseTime) {
      const seconds = millesecondsToSeconds(pauseTime);

      videoRef.current.currentTime = seconds;
    }
  }, [pauseTime, videoRef]);

  const handleTimeUpdate = () => {
    if (videoRef.current && onTimeUpdate) {
      onTimeUpdate(videoRef.current.currentTime * 1000);
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '70vh',
        }}
        src={source}
        preload="auto"
        onLoadedData={handleMediaLoad}
        onTimeUpdate={handleTimeUpdate}
        width={width}
        height={height}
        muted
      />
    </div>
  );
};
