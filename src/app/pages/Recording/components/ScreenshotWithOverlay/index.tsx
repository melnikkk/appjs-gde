import { useRef } from 'react';
import Konva from 'konva';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { MediaOverlay } from '../../MediaOverlay';
import { useMediaDimensions } from '../../hooks/useMediaDimensions';

interface Props {
  screenshotUrl: string;
  event: RecordingEvent;
  alt?: string;
  maxHeight?: number;
  className?: string;
}

export const ScreenshotWithOverlay: React.FC<Props> = ({
  screenshotUrl,
  event,
  alt = 'Screenshot',
  maxHeight = 400,
  className = '',
}) => {
  const stageRef = useRef<Konva.Stage | null>(null);

  const { mediaRef, dimensions, handleMediaLoad } = useMediaDimensions();

  return (
    <div className={`relative ${className}`}>
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        src={screenshotUrl}
        alt={alt}
        className="h-auto w-full rounded-md border object-contain"
        style={{ maxHeight: `${maxHeight}px` }}
        onLoad={handleMediaLoad}
      />

      {dimensions && (
        <MediaOverlay
          width={dimensions.width}
          height={dimensions.height}
          event={event}
          stageRef={stageRef}
          markerColor="green"
        />
      )}
    </div>
  );
};
