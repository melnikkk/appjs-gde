import { RootState } from '@/infrastructure/store';
import { createSelector } from '@reduxjs/toolkit';

const selectRecordingsState = (state: RootState) => state.recordings;

export const selectCurrentRecordingId = createSelector(
  selectRecordingsState,
  (state) => state.currentRecordingId,
);
