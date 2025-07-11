import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import { BaseRecordingEventProps } from './base-event';
import { ClickRecordingEvent } from './click-event';
import { RecordingEventModel } from './event-types';
import { UrlChangeRecordingEvent } from './url-change-event';

export const createRecordingEvent = (
  props: BaseRecordingEventProps<unknown>,
): RecordingEventModel => {
  switch (props.type) {
    case RecordingEventType.CLICK: {
      const data = props.data as Record<string, unknown>;
      const coordinates = data.coordinates as { x: number; y: number } | undefined;
      if (
        !coordinates ||
        typeof coordinates.x !== 'number' ||
        typeof coordinates.y !== 'number'
      ) {
        throw new Error(`Invalid click event data: missing or invalid coordinates`);
      }

      return new ClickRecordingEvent({
        id: props.id,
        title: props.title,
        description: props.description,
        screenshotUrl: props.screenshotUrl,
        timestamp: props.timestamp,
        type: RecordingEventType.CLICK,
        data: {
          coordinates: coordinates,
        },
      });
    }

    case RecordingEventType.URL_CHANGE: {
      const data = props.data as Record<string, unknown>;
      const previousUrl = data.previousUrl as string | undefined;
      const newUrl = data.newUrl as string | undefined;

      if (!previousUrl || !newUrl) {
        throw new Error(`Invalid URL change event data: missing required fields`);
      }

      return new UrlChangeRecordingEvent({
        id: props.id,
        title: props.title,
        description: props.description,
        screenshotUrl: props.screenshotUrl,
        timestamp: props.timestamp,
        type: RecordingEventType.URL_CHANGE,
        data: {
          previousUrl,
          newUrl,
        },
      });
    }
    default:
      throw new Error(`Unsupported recording event type: ${props.type}`);
  }
};
