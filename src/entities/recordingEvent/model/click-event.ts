import Konva from 'konva';
import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import { Coordinates } from '@/shared/types';
import { BaseRecordingEvent, BaseRecordingEventProps, RenderConfig } from './base-event';

export interface ClickRecordingEventData {
  coordinates: Coordinates;
}

export interface ClickRecordingEventProps
  extends BaseRecordingEventProps<ClickRecordingEventData> {
  type: RecordingEventType.CLICK;
  data: ClickRecordingEventData;
}

export class ClickRecordingEvent extends BaseRecordingEvent<ClickRecordingEventData> {
  type: RecordingEventType.CLICK;
  data: ClickRecordingEventData;

  constructor(props: ClickRecordingEventProps) {
    super({
      id: props.id,
      title: props.title,
      description: props.description,
      screenshotUrl: props.screenshotUrl,
      timestamp: props.timestamp,
      type: props.type,
      data: props.data,
    });

    this.type = RecordingEventType.CLICK;
    this.data = props.data;
  }

  getCoordinates(): Coordinates {
    return this.data.coordinates;
  }

  render(layer: Konva.Layer, config?: RenderConfig): Konva.Group {
    console.log('ClickRecordingEvent: Rendering click event at', this.data.coordinates);

    const group = new Konva.Group({
      x: 0,
      y: 0,
      draggable: true,
    });

    const outerCircle = new Konva.Circle({
      radius: 32,
      fill: '#d8b5ff',
      opacity: 0.4,
      x: 0,
      y: 0,
      shadowColor: '#d8b5ff',
      shadowBlur: 25,
      shadowOpacity: 0.7,
    });

    const middleCircle = new Konva.Circle({
      radius: 24,
      fill: '#c59dff',
      opacity: 0.6,
      x: 0,
      y: 0,
      shadowColor: '#c59dff',
      shadowBlur: 20,
      shadowOpacity: 0.7,
    });

    const innerCircle = new Konva.Circle({
      radius: 16,
      fill: '#b27eff',
      x: 0,
      y: 0,
      shadowColor: '#b27eff',
      shadowBlur: 5,
      shadowOpacity: 0.7,
    });

    group.add(outerCircle);
    group.add(middleCircle);
    group.add(innerCircle);

    const pulseAnimation = new Konva.Animation(
      (frame) => {
        if (!frame) return;

        const scale = 1 + Math.sin(frame.time / 400) * 0.2;
        outerCircle.opacity(0.4 - Math.sin(frame.time / 400) * 0.2);
        outerCircle.scale({ x: scale, y: scale });

        const middleScale = 1 + Math.sin(frame.time / 600) * 0.1;
        middleCircle.scale({ x: middleScale, y: middleScale });
      },
      [layer],
    );

    pulseAnimation.start();

    group.on('mouseover', () => {
      document.body.style.cursor = 'grab';
    });

    group.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });

    if (config) {
      if (config.onDragMove) {
        group.on('dragmove', config.onDragMove);
      }

      if (config.onDragEnd) {
        group.on('dragend', config.onDragEnd);
      }

      if (config.onClick) {
        group.on('click', config.onClick);
      }
    }

    return group;
  }
}
