import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setCurrentEventIndex: (state, action: PayloadAction<number>) => {
      state.currentEventIndex = action.payload;
    },
  },
});

export const { setNextEventIndex, setPreviousEventIndex, setCurrentEventIndex } =
  editorSlice.actions;

export default editorSlice.reducer;
