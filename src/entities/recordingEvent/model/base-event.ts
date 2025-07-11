import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';

export interface BaseRecordingEventProps<T> {
  id: string;
  title: string;
  description: string | null;
  screenshotUrl: string | null;
  timestamp: number;
  type: RecordingEventType;
  data: T;
}

export interface RenderConfig {
  isDragging?: boolean;
  isSelected?: boolean;
  onDragMove?: (evt: KonvaEventObject<DragEvent>) => void;
  onDragEnd?: (evt: KonvaEventObject<DragEvent>) => void;
  onClick?: (evt: KonvaEventObject<MouseEvent>) => void;
}

export abstract class BaseRecordingEvent<T> {
  id: string;
  title: string;
  description: string | null;
  screenshotUrl: string | null;
  timestamp: number;

  abstract type: RecordingEventType;
  abstract data: T;

  constructor(props: BaseRecordingEventProps<T>) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.screenshotUrl = props.screenshotUrl;
    this.timestamp = props.timestamp;
  }

  abstract getCoordinates(): { x: number; y: number };

  abstract render(layer: Konva.Layer, config?: RenderConfig): Konva.Group;
}
