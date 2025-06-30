import { toast } from 'sonner';
import { useState } from 'react';
import { Dimensions } from '@/domain/Recordings';
import { Coordinates } from '@/domain/RecordingEvents';
import { scaleCoordinates } from '@/domain/RecordingEvents/utils';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectRecordingEventsEntities,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { selectCurrentRecordingId } from '@/infrastructure/store/slices/recordings/selectors';
import { useEditRecordingEventMutation } from '@/infrastructure/store/slices/recordingEvents/api';
import { CanvasOverlay } from './CanvasOverlay';

interface Props {
  initialDimensions: Dimensions;
  coordinates: Coordinates;
  dimensions: Dimensions | null;
}

export const RecordingEventsPresenter: React.FC<Props> = ({
  dimensions,
  initialDimensions,
  coordinates: initialCoordinates,
}) => {
  const currentEventId = useAppSelector(selectCurrentEventId);
  const recordingId = useAppSelector(selectCurrentRecordingId);
  const recordingEvents = useAppSelector(selectRecordingEventsEntities);

  const [localCoordinates, setLocalCoordinates] = useState<Coordinates | null>(null);

  const [triggerEditRecordingEvent] = useEditRecordingEventMutation();

  const effectiveCoordinates = localCoordinates || initialCoordinates;

  const scaledCoordinates = scaleCoordinates(
    dimensions ?? initialDimensions,
    initialDimensions,
    effectiveCoordinates,
  );

  const width = dimensions?.width || initialDimensions.width;
  const height = dimensions?.height || initialDimensions.height;

  const onEventPositionChangeEnd = async (newCoordinates: Coordinates) => {
    if (!currentEventId || !recordingId) return;

    try {
      const currentEvent = recordingEvents[currentEventId];

      if (!currentEvent) {
        return;
      }

      const originalCoordinates = scaleCoordinates(
        initialDimensions,
        dimensions ?? initialDimensions,
        newCoordinates,
      );

      const { id, data } = currentEvent;

      await triggerEditRecordingEvent({
        recordingId,
        eventId: id,
        event: {
          data: {
            ...data,
            coordinates: originalCoordinates,
          },
        },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update event coordinates:', error);

      toast.error('Failed to update event coordinates');
    } finally {
      setLocalCoordinates(null);
    }
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
