import { useRef, useContext, useEffect, useCallback, useState } from 'react';
import { Konva } from 'konva';
import { useGetRecordingQuery } from '../../../infrastructure/slices/recordings/api';
import { RecordingContext } from '../../contexts/recordingContext';
import { VideoPlayer } from './VideoPlayer';
import { CanvasOverlay } from './CanvasOverlay';
import { exportStageToJson, prepareEvent } from './utils';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';
import { useParams } from '@tanstack/react-router';

export const RecordingPage = () => {
  // useWebSocketConnection();

  const { id } = useParams({ strict: false });

  const { data: recording } = useGetRecordingQuery(
    {
      id: id as string,
    },
    {
      skip: !id,
    },
  );

  const stageRef = useRef<Konva.Stage>(null);

  const { events, startTime } = useContext(RecordingContext);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(prepareEvent(events[0], startTime));

  const onExportClick = useCallback(() => {
    exportStageToJson(stageRef.current);
  }, [stageRef]);

  const onPreviousClick = useCallback(() => {
    setCurrentEventIndex(currentEventIndex - 1);
  }, [currentEventIndex]);

  const onNextClick = useCallback(() => {
    setCurrentEventIndex(currentEventIndex + 1);
  }, [currentEventIndex]);

  useEffect(() => {
    if (events[currentEventIndex]) {
      const preparedEvent = prepareEvent(events[currentEventIndex], startTime);

      setCurrentEvent(preparedEvent);
    }
  }, [currentEventIndex, events, startTime]);

  const recordingSourceUrl = `${import.meta.env.VITE_BACKEND_URL}${recording?.sourceUrl}`;

  return (
    <>
      <div style={{ position: 'relative' }}>
        {recording?.sourceUrl ? (
          <VideoPlayer
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            source={recordingSourceUrl}
            pauseTime={currentEvent.timeFromStart}
          />
        ) : null}
        <CanvasOverlay
          event={currentEvent}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          stageRef={stageRef}
        />
      </div>
      <div>
        <button disabled={currentEventIndex === 0} onClick={onPreviousClick}>
          Previous
        </button>
        <button disabled={currentEventIndex === events.length - 1} onClick={onNextClick}>
          Next
        </button>
        <button
          onClick={onExportClick}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
        >
          Export Canvas
        </button>
      </div>
    </>
  );
};
