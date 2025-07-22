import { RecordingEvent } from '@/entities/recordingEvent/model/types';
import { useMediaDimensions } from '@/shared/hooks/useMedia/useMediaDimensions';
import { RecordingEventsPresenter } from '@/widgets/recording/recordingPlayer';
import { Dimensions } from '@/shared/types';
import { AuthenticatedImage } from '@/shared/components/AuthenticatedImage';

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
  alt = 'Screenshot',
  maxHeight = 400,
  className = '',
  initialDimensions,
}) => {
  const { mediaRef, dimensions, handleMediaLoad } = useMediaDimensions();

  return (
    <div className={`relative ${className}`}>
      <AuthenticatedImage
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        thumbnailPath={screenshotUrl}
        alt={alt}
        className="h-auto w-full rounded-md border object-contain"
        style={{ maxHeight: `${maxHeight}px` }}
        onLoad={handleMediaLoad}
      />

      {dimensions && (
        <RecordingEventsPresenter
          dimensions={dimensions}
          initialDimensions={initialDimensions}
        />
      )}
    </div>
  );
};
