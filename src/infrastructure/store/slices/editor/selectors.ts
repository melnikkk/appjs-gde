import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const selectEditorState = (state: RootState) => state.editor;

export const selectCurrentEventIndex = createSelector(
  selectEditorState,
  (state) => state.currentEventIndex,
);

export const selectCurrentEventId = createSelector(
  selectEditorState,
  (state) => state.currentEventId,
);

export const selectEventsCache = createSelector(
  selectEditorState,
  (state) => state.eventsCache,
);

export const selectSortedEventIds = createSelector(
  selectEditorState,
  (state) => state.sortedEventIds,
);

export const selectEventsAmount = createSelector(
  selectSortedEventIds,
  (events) => events.length,
);
