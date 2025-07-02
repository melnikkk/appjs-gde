import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { setCurrentEventId } from '@/entities/recordingEvent/model/slice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { TrackerEvents } from '@/entities/editor/model/types';
import {
  selectCurrentTrackerEvent,
  selectDoesRecordingEventExist,
} from '@/entities/recordingEvent/model/selectors';
import { TimelineTrackerEvent } from '../../recordingTimelineTracker/components/TimelineTrackerEvent';
import { TimeMarker } from '../../recordingTimelineTracker/components/TimeMarker';
import { TimelineTracker } from '../../recordingTimelineTracker/components/TimelineTracker';
import { setRecordingPauseTimestamp } from '@/entities/editor/model/slice';

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

  const onTimelineTrackerClick = (trackerTimestamp: number) => {
    dispatch(setRecordingPauseTimestamp(trackerTimestamp));
    dispatch(setCurrentEventId(null));
  };

  return (
    <div className="relative flex-1">
      <TimelineTracker
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
