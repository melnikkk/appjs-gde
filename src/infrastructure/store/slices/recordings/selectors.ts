import { RootState } from '@/infrastructure/store';
import { createSelector } from '@reduxjs/toolkit';
import { recordingsApiSlice } from '@/infrastructure/store/slices/recordings/api';
import { Recording } from '@/domain/Recordings';

const selectRecordingsState = (state: RootState) => state.recordings;

export const selectCurrentRecordingId = createSelector(
  selectRecordingsState,
  (state) => state.currentRecordingId,
);

export const selectRecordingEventsFromCache = createSelector(
  (state: RootState) => state,
  selectCurrentRecordingId,
  (state, id): Recording | null => {
    if (!id) {
      return null;
    }

    const queryResult = recordingsApiSlice.endpoints.getRecording.select({
      id,
    })(state);

    return queryResult.data ?? null;
  },
);

export const selectCurrentRecordingStartTimestamp = createSelector(
  selectRecordingEventsFromCache,
  (recording) => recording?.startTime ?? null,
);

export const selectCurrentRecordingDuration = createSelector(
  selectRecordingEventsFromCache,
  (recording) => recording?.duration ?? null,
);
