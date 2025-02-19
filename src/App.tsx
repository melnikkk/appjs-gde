import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import './App.css';
import { VideoPlayer } from './VideoPlayer';
import { CanvasOverlay } from './CanvasOverlay';
import screenCaptureVideo from './assets/app-mocks/screen-capture.webm';
import { RecordingContext } from './recordingContext';
import { withProviders } from './withProviders';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from './constants';
import { exportStageToJson, prepareEvent } from './utils';

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const { events, startTime } = useContext(RecordingContext);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(events[0]);

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
        <VideoPlayer
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          videoUrl={screenCaptureVideo}
          pauseTime={currentEvent.timeFromStart}
        />
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
}

export default withProviders(App);
