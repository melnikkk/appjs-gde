import { RecordingEvent } from '@/domain/RecordingEvents';
import { useMediaDimensions } from '../../hooks/useMediaDimensions';
import { RecordingEventsPresenter } from '@/app/pages/Recording/RecordingEventsPresenter';
import { Dimensions } from '@/domain/Recordings';

interface Props {
  screenshotUrl: string;
  alt?: string;
  className?: string;
  maxHeight?: number;
  initialDimensions: Dimensions;
  event: RecordingEvent;
}

export const ScreenshotWithOverlay: React.FC<Props> = ({
  screenshotUrl,
  event,
  alt = 'Screenshot',
  maxHeight = 400,
  className = '',
  initialDimensions,
}) => {
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
        <RecordingEventsPresenter
          dimensions={dimensions}
          coordinates={event.data.coordinates}
          initialDimensions={initialDimensions}
        />
      )}
    </div>
  );
};
