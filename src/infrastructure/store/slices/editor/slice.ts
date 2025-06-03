import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditorState, TrackerEvent } from '@/infrastructure/store/slices/editor/types';

const initialState: EditorState = {
  recordingPauseTimestamp: null,
  selectedTrackerEvent: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setRecordingPauseTimestamp: (state, { payload }: PayloadAction<number>) => {
      state.recordingPauseTimestamp = payload;
    },
    setSelectedTrackerEvent: (state, { payload }: PayloadAction<TrackerEvent | null>) => {
      state.selectedTrackerEvent = payload;
    },
  },
});

export const { setRecordingPauseTimestamp, setSelectedTrackerEvent } =
  editorSlice.actions;

export default editorSlice.reducer;
