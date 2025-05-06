import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '../../../infrastructure/store/slices/recordings/api';
import {
  setNextEventIndex,
  setPreviousEventIndex,
} from '../../../infrastructure/store/slices/editor/slice';
import { selectCurrentEventIndex } from '../../../infrastructure/store/slices/editor/selectors';
import { RecordingPlayer } from './RecordingPlayer';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';
import { Button } from '@/components/ui/button';
import { RecordingTimeline } from './components/RecordingTimeline';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { id } = useParams({ strict: false });

  const currentEventIndex = useSelector(selectCurrentEventIndex);

  const { data: recording } = useGetRecordingQuery(
    {
      id: id as string,
    },
    {
      skip: !id,
    },
  );

  const isPreviousButtonDisabled = currentEventIndex === 0;

  const onPreviousClick = useCallback(() => {
    dispatch(setPreviousEventIndex());
  }, [dispatch]);

  const onNextClick = useCallback(() => {
    dispatch(setNextEventIndex());
  }, [dispatch]);

  const handleResize = useCallback((newDimensions: { width: number; height: number }) => {
    setDimensions(newDimensions);
  }, []);

  const handleExport = useCallback(() => {
    console.log('Exporting guide');
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving guide');
  }, []);

  if (!recording) {
    return null;
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <RecordingPlayer recording={recording} onResize={handleResize} />
        <RecordingEventsPresenter recording={recording} dimensions={dimensions} />
      </div>
      <div className="mt-4 flex space-x-2">
        <Button disabled={isPreviousButtonDisabled} onClick={onPreviousClick}>
          Previous
        </Button>
        <Button onClick={onNextClick}>Next</Button>
      </div>
      <RecordingTimeline recordingEvents={recording.events} startPointTimestamp={recording.startTime}/>
    </>
  );
};
