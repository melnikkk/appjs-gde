import { RecordingEvent } from '@/entities/recordingEvent/model/types';
import { useMediaDimensions } from '@/shared/hooks/useMedia/useMediaDimensions';
import { RecordingEventsPresenter } from '@/widgets/recording/recordingPlayer';
import { Dimensions } from '@/shared/types';

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
