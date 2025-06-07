import { Dimensions } from '@/domain/Recordings';
import { CanvasOverlay } from './CanvasOverlay';
import { Coordinates } from '@/domain/RecordingEvents';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';

interface Props {
  initialDimensions: Dimensions;
  coordinates: Coordinates;
  dimensions: Dimensions | null;
}

export const RecordingEventsPresenter: React.FC<Props> = ({
  dimensions,
  initialDimensions,
  coordinates,
}) => {
  const scaledCoordinates = scaleCoordinates(
    dimensions ?? initialDimensions,
    initialDimensions,
    coordinates,
  );

  const width = dimensions?.width || initialDimensions.width;
  const height = dimensions?.height || initialDimensions.height;

  const onEventPositionChangeEnd = (coordinates: Coordinates) => {
    // TODO: provide change coordinates logic
    // if (selectedTrackerEvent) {
    //   dispatch(setSelectedTrackerEvent({ ...selectedTrackerEvent }));
    // }
  };

  return (
    <CanvasOverlay
      coordinates={scaledCoordinates}
      width={width}
      height={height}
      onPositionChangeEnd={onEventPositionChangeEnd}
    />
  );
};
