import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

const selectEditorState = (state: RootState) => state.editor;

export const selectCurrentEventIndex = createSelector(
    selectEditorState,
  (state) => state.currentEventIndex
);
