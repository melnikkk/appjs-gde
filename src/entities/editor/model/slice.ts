import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditorState } from '@/entities/editor/model/types';

const initialState: EditorState = {
  recordingPauseTimestamp: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setRecordingPauseTimestamp: (state, { payload }: PayloadAction<number>) => {
      state.recordingPauseTimestamp = payload;
    },
  },
});

export const { setRecordingPauseTimestamp } = editorSlice.actions;

export default editorSlice.reducer;
