import { Dimensions } from '@/domain/Recordings';
import { CanvasOverlay } from './CanvasOverlay';
import { Coordinates } from '@/domain/RecordingEvents';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { setSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/slice';

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
  const dispatch = useAppDispatch();

  const selectedTrackerEvent = useAppSelector(selectSelectedTrackerEvent);

  const width = dimensions?.width || initialDimensions.width;
  const height = dimensions?.height || initialDimensions.height;

  const onEventPositionChangeEnd = (coordinates: Coordinates) => {
    if (selectedTrackerEvent) {
      dispatch(setSelectedTrackerEvent({ ...selectedTrackerEvent, coordinates }));
    }
  };

  return (
    <CanvasOverlay
      coordinates={coordinates}
      width={width}
      height={height}
      onPositionChangeEnd={onEventPositionChangeEnd}
    />
  );
};
