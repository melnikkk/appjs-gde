import { toast } from 'sonner';
import { useState } from 'react';
import { Dimensions } from '@/shared/types';
import { Coordinates } from '@/entities/recordingEvent/model/types';
import { scaleCoordinates } from '@/entities/recordingEvent/lib/utils';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectRecordingEventsEntities,
} from '@/entities/recordingEvent/model/selectors';
import { selectCurrentRecordingId } from '@/entities/recording/model/selectors';
import { useEditRecordingEventMutation } from '@/entities/recordingEvent/api/queries';
import { CanvasOverlay } from '@/shared/components/canvas/CanvasOverlay';

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
