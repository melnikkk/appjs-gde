import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import './App.css';
import { VideoPlayer } from './VideoPlayer';
import { CanvasOverlay } from './CanvasOverlay';
import { RecordingContext } from './recordingContext';
import { withProviders } from './hocs/withProviders';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from './constants';
import { exportStageToJson, prepareEvent } from './utils';
import {
  useGetRecordingQuery,
} from './infrastructure/slices/recordings/api';

const id = 'RECORDING_ID';

function App() {
  // useWebSocketConnection();

  const { data: recordingData = {} } = useGetRecordingQuery({
    id,
  });
  
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        {recordingData.sourceUrl ? (
          <VideoPlayer
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            source={recordingData.sourceUrl}
            pauseTime={currentEvent.timeFromStart}
          />
        ) : null}
        <CanvasOverlay
          // @ts-expect-error: will be refactored in the future
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
}

export default withProviders(App);
