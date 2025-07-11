import { toast } from 'sonner';
import { Coordinates, Dimensions } from '@/shared/types';
import { scaleCoordinates } from '@/shared/lib/coordinate-utils';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
  selectCurrentEventId,
  selectRecordingEventsEntities,
} from '@/entities/recordingEvent/model/selectors';
import { selectCurrentRecordingId } from '@/entities/recording/model/selectors';
import { useEditRecordingEventMutation } from '@/entities/recordingEvent/api/queries';
import { EventOverlay } from '@/shared/components/canvas/EventOverlay';
import { createRecordingEvent } from '@/entities/recordingEvent';

interface Props {
  initialDimensions: Dimensions;
  dimensions: Dimensions | null;
}

export const RecordingEventsPresenter: React.FC<Props> = ({
  dimensions,
  initialDimensions,
}) => {
  const currentEventId = useAppSelector(selectCurrentEventId);
  const recordingId = useAppSelector(selectCurrentRecordingId);
  const recordingEvents = useAppSelector(selectRecordingEventsEntities);

  const [triggerEditRecordingEvent] = useEditRecordingEventMutation();

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
    }
  };

  if (!currentEventId || !recordingEvents[currentEventId]) {
    return null;
  }

  const currentEvent = recordingEvents[currentEventId];
  const renderableEvent = createRecordingEvent(currentEvent);

  return (
    <EventOverlay
      width={width}
      height={height}
      event={renderableEvent}
      initialDimensions={initialDimensions}
      currentDimensions={dimensions || initialDimensions}
      onPositionChangeEnd={onEventPositionChangeEnd}
    />
  );
};
