import { Dimensions } from '@/domain/Recordings';
import { CanvasOverlay } from './CanvasOverlay';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';
import { Coordinates } from '@/domain/RecordingEvents';

interface Props {
  initialDimensions: Dimensions;
  initialEventCoordinates: Coordinates;
  dimensions: Dimensions | null;
}

export const RecordingEventsPresenter: React.FC<Props> = ({
  dimensions,
  initialDimensions,
  initialEventCoordinates,
}) => {
  const width = dimensions?.width || initialDimensions.width;
  const height = dimensions?.height || initialDimensions.height;

  const scaledCoordinates = scaleCoordinates(
    { width, height },
    initialDimensions,
    initialEventCoordinates,
  );

  return <CanvasOverlay coordinates={scaledCoordinates} width={width} height={height} />;
};
