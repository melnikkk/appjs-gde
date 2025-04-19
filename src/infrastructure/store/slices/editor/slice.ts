import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  currentEventIndex: number;
}

const initialState: EditorState = {
  currentEventIndex: 0,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setNextEventIndex: (state) => {
      state.currentEventIndex += 1;
    },
    setPreviousEventIndex: (state) => {
      state.currentEventIndex -= 1;
    },
  },
});

export const { setNextEventIndex, setPreviousEventIndex } = editorSlice.actions;

export default editorSlice.reducer;