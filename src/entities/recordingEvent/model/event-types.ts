import { ClickRecordingEvent } from './click-event';
import { UrlChangeRecordingEvent } from './url-change-event';

export type RecordingEventModel = ClickRecordingEvent | UrlChangeRecordingEvent;

export function isEventOfType<T extends RecordingEventModel>(
  event: RecordingEventModel,
  type: T['type'],
): event is T {
  return event.type === type;
}
