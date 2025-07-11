export {
  useGetEventsQuery,
  useAddEventsMutation,
  useDeleteEventMutation,
  useEditRecordingEventMutation,
  useGenerateAiRecordingEventsContentMutation,
} from './api/queries';

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

export { BaseRecordingEvent, type RenderConfig } from './model/base-event';
export { ClickRecordingEvent, type ClickRecordingEventData } from './model/click-event';
export {
  UrlChangeRecordingEvent,
  type UrlChangeRecordingEventData,
} from './model/url-change-event';
export { createRecordingEvent } from './model/recording-event-factory';
export { setCurrentEventId } from './model/slice';
