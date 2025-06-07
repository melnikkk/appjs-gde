import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/infrastructure/store';

const selectEditorState = (state: RootState) => state.editor;

export const selectRecordingPauseTimestamp = createSelector(
  selectEditorState,
  (state) => state.recordingPauseTimestamp ?? 0,
);
