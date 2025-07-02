export {
  useGetEventsQuery,
  useAddEventsMutation,
  useDeleteEventMutation,
  useEditRecordingEventMutation,
  useGenerateAiRecordingEventsContentMutation,
} from './api/queries';

export { setCurrentEventId } from './model/slice';

export type { Coordinates } from './model/types';

export {
  selectRecordingEventsFromCache,
  selectCurrentEventId,
  selectRecordingEventsEntities,
  selectSortedEventIds,
  selectEventsAmount,
  selectDoesRecordingEventExist,
  selectTrackerEvents,
  selectCurrentTrackerEvent,
  selectCurrentEventIndex,
  selectCurrentEvent,
} from './model/selectors';

export { scaleCoordinates } from './lib/utils';

export { DEFAULT_RECORDING_EVENT_COORDINATES, RecordingEventType } from './lib/constants';
