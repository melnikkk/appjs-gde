import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { TrackerEvents } from '@/infrastructure/store/slices/editor/types';
import {
  selectCurrentTrackerEvent,
  selectDoesRecordingEventExist,
} from '@/infrastructure/store/slices/recordingEvents/selectors';
import { TimelineTrackerEvent } from './TimelineTrackerEvent';
import { TimeMarker } from './TimeMarker';
import { TimelineTracker } from './TimelineTracker';

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

  const selectedTrackerEvent = useAppSelector(selectCurrentTrackerEvent);
  const doesEventExists = useAppSelector(
    selectDoesRecordingEventExist(selectedTrackerEvent?.id),
  );

  const onTimelineTrackerClick = (timestamp: number) => {
    const id = uuidv4();
    const trackerPosition = ((timestamp - startPointTimestamp) / recordingDuration) * 100;
    // TODO: provide event to add
    // dispatch(
    //   setSelectedTrackerEvent({
    //     id,
    //     timestamp,
    //     trackerPosition,
    //     type: RecordingEventType.CLICK,
    //   }),
    // );
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
