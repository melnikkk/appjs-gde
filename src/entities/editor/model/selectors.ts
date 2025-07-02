import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

const selectEditorState = (state: RootState) => state.editor;

export const selectRecordingPauseTimestamp = createSelector(
  selectEditorState,
  (state) => state.recordingPauseTimestamp ?? 0,
);
