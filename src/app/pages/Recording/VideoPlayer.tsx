import { useRef, useEffect } from 'react';
import Konva from 'konva';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { millesecondsToSeconds } from '../../shared/utils';
import { MediaOverlay } from './MediaOverlay';
import { useMediaDimensions } from './hooks/useMediaDimensions';

interface Props {
  width: number;
  height: number;
  pauseTime: number;
  source: string;
  currentEvent: RecordingEvent;
  ref?: React.RefObject<HTMLVideoElement>;
  onTimeUpdate?: (time: number) => void;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

export const VideoPlayer: React.FC<Props> = ({
  source,
  width,
  height,
  pauseTime,
  ref,
  onResize,
  onTimeUpdate,
  currentEvent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const { mediaRef, dimensions, handleMediaLoad } = useMediaDimensions();

  const videoRef = ref || (mediaRef as React.RefObject<HTMLVideoElement>);

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
  }, [pauseTime, onTimeUpdate, videoRef]);

  useEffect(() => {
    if (dimensions && onResize) {
      onResize({
        width: dimensions.width,
        height: dimensions.height,
      });
    }
  }, [dimensions, onResize]);

  return (
    <div className="relative rounded-lg border" ref={containerRef}>
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
      >
        {source && <source src={source} />}
        Your browser does not support the video tag.
      </video>

      {dimensions && (
        <MediaOverlay
          width={dimensions.width}
          height={dimensions.height}
          event={currentEvent}
          stageRef={stageRef}
          markerColor="green"
        />
      )}
    </div>
  );
};
