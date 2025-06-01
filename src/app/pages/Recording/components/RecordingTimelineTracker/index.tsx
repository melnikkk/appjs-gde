import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { TimelineTrackerEvent } from './TimelineTrackerEvent';
import { TimeMarker } from './TimeMarker';
import { TimelineTracker } from './TimelineTracker';
import { TrackerEvents } from '@/infrastructure/store/slices/editor/types';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { selectDoesRecordingEventExist } from '@/infrastructure/store/slices/recordingEvents/selectors';
import { setSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/slice';

interface Props {
  startPointTimestamp: number;
  recordingDuration: number;
  trackerEvents: TrackerEvents;
}

export const RecordingTimelineTracker: React.FC<Props> = ({
  startPointTimestamp,
  recordingDuration,
  trackerEvents,
}) => {
  const dispatch = useAppDispatch();

  const selectedTrackerEvent = useAppSelector(selectSelectedTrackerEvent);
  const doesEventExists = useAppSelector(
    selectDoesRecordingEventExist(selectedTrackerEvent?.id),
  );

  const onTimelineTrackerClick = (timestamp: number) => {
    const id = uuidv4();
    const trackerPosition = ((timestamp - startPointTimestamp) / recordingDuration) * 100;

    dispatch(
      setSelectedTrackerEvent({
        id,
        timestamp,
        trackerPosition,
        coordinates: { x: 50, y: 50 },
      }),
    );
    dispatch(setCurrentEventId(id));
  };

  return (
    <div className="relative flex-1">
      <TimelineTracker
        startPointTimestamp={startPointTimestamp}
        recordingDuration={recordingDuration}
        onClick={onTimelineTrackerClick}
      >
        <TimeMarker duration={0} />
        {!doesEventExists && selectedTrackerEvent ? (
          <TimelineTrackerEvent
            isNewEvent
            trackerEvent={selectedTrackerEvent}
            startPointTimestamp={startPointTimestamp}
          />
        ) : null}
        {trackerEvents.map((trackerEvent) => {
          return (
            <TimelineTrackerEvent
              key={trackerEvent.id}
              trackerEvent={trackerEvent}
              startPointTimestamp={startPointTimestamp}
            />
          );
        })}
        <TimeMarker className="right-0" duration={recordingDuration} />
      </TimelineTracker>
    </div>
  );
};
