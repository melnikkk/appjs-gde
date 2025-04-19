import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from '@tanstack/react-router';
import { useGetRecordingQuery } from '../../../infrastructure/store/slices/recordings/api';
import { setNextEventIndex, setPreviousEventIndex } from '../../../infrastructure/store/slices/editor/slice';
import { selectCurrentEventIndex } from '../../../infrastructure/store/slices/editor/selectors';
import { RecordingPlayer } from './RecordingPlayer';
import { RecordingEventsPresenter } from './RecordingEventsPresenter';

export const RecordingPage = () => {
  // useWebSocketConnection();
  const dispatch = useDispatch();

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

  if (!recording) {
    return null;
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <RecordingPlayer recording={recording} />
        <RecordingEventsPresenter recording={recording} />
      </div>
      <div>
        <button disabled={isPreviousButtonDisabled} onClick={onPreviousClick}>
          Previous
        </button>
        <button onClick={onNextClick}>
          Next
        </button>
      </div>
    </>
  );
};
