import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectRecordingEventToAdd } from '@/infrastructure/store/slices/recordingEvents/selectors';
import {
  setCurrentEventId,
  setRecordingEventToAdd,
} from '@/infrastructure/store/slices/recordingEvents/slice';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';
import { TimelineTrackerEvent } from './TimelineTrackerEvent';
import { TimeMarker } from './TimeMarker';
import { TimelineTracker } from './TimelineTracker';
import { TrackerEvents } from '@/app/pages/Recording/components/RecordingTimelineTracker/types';

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

  const recordingEventToAdd = useAppSelector(selectRecordingEventToAdd);

  const onTimelineTrackerClick = (timestamp: number) => {
    const id = uuidv4();
    debugger;
    dispatch(
      setRecordingEventToAdd({
        id,
        timestamp,
        trackerPosition: ((timestamp - startPointTimestamp) / recordingDuration) * 100,
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
        {recordingEventToAdd ? (
          <TimelineTrackerEvent
            isNewEvent
            recordingEventId={recordingEventToAdd.id}
            position={recordingEventToAdd.trackerPosition}
            recordingEventTimestamp={recordingEventToAdd.timestamp}
            startPointTimestamp={startPointTimestamp}
          />
        ) : null}
        {trackerEvents.map(({ id, trackerPosition, timestamp }) => {
          return (
            <TimelineTrackerEvent
              key={id}
              recordingEventId={id}
              position={trackerPosition}
              recordingEventTimestamp={timestamp}
              startPointTimestamp={startPointTimestamp}
            />
          );
        })}
        <TimeMarker className="right-0" duration={recordingDuration} />
      </TimelineTracker>
    </div>
  );
};
