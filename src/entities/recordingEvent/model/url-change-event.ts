import { RecordingEventType } from '@/entities/recordingEvent/lib/constants';
import Konva from 'konva';
import { BaseRecordingEvent, BaseRecordingEventProps, RenderConfig } from './base-event';

export interface UrlChangeRecordingEventData {
  previousUrl: string;
  newUrl: string;
}

export interface UrlChangeRecordingEventProps
  extends BaseRecordingEventProps<UrlChangeRecordingEventData> {
  type: RecordingEventType.URL_CHANGE;
  data: UrlChangeRecordingEventData;
}

export class UrlChangeRecordingEvent extends BaseRecordingEvent<UrlChangeRecordingEventData> {
  type: RecordingEventType.URL_CHANGE;
  data: UrlChangeRecordingEventData;

  constructor(props: UrlChangeRecordingEventProps) {
    super({
      id: props.id,
      title: props.title,
      description: props.description,
      screenshotUrl: props.screenshotUrl,
      timestamp: props.timestamp,
      type: props.type,
      data: props.data,
    });

    this.type = RecordingEventType.URL_CHANGE;
    this.data = props.data;
  }

  getCoordinates(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }

  private get nextUrlDomain(): string {
    return new URL(this.data.newUrl).hostname;
  }

  private get nextUrlDomainText(): Konva.Text {
    const domainText = new Konva.Text({
      text: this.nextUrlDomain,
      fontSize: 24,
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: 'white',
      padding: 20,
      align: 'left',
      verticalAlign: 'middle',
    });

    return domainText;
  }

  private get eventMessageText(): Konva.Text {
    const navigateText = new Konva.Text({
      text: 'Navigate to ',
      fontSize: 24,
      fontFamily: 'Arial',
      fill: 'white',
      padding: 20,
      align: 'right',
      verticalAlign: 'middle',
    });

    return navigateText;
  }

  private getEventGroup(width: number, height: number): Konva.Group {
    const domainText = this.nextUrlDomainText;
    const navigateText = this.eventMessageText;

    domainText.x(navigateText.width() - navigateText.padding() * 2);

    const group = new Konva.Group({
      x: 0,
      y: 0,
      width: width,
      height: height,
    });

    const overlay = new Konva.Rect({
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: 'rgba(0, 0, 0, 0.6)',
      cornerRadius: 0,
    });

    const textContainer = new Konva.Group({
      x: width / 2,
      y: height / 2,
    });

    const totalTextWidth =
      navigateText.width() + domainText.width() - navigateText.padding() * 2;
    const totalTextHeight = Math.max(navigateText.height(), domainText.height());

    const textBackground = new Konva.Rect({
      x: width / 2,
      y: height / 2,
      width: totalTextWidth + 20,
      height: totalTextHeight,
      fill: '#b27eff',
      cornerRadius: 8,
      opacity: 0.8,
    });

    textContainer.add(navigateText);
    textContainer.add(domainText);

    textContainer.offsetX(totalTextWidth / 2);
    textContainer.offsetY(totalTextHeight / 2);

    textBackground.offsetX(textBackground.width() / 2);
    textBackground.offsetY(textBackground.height() / 2);

    group.add(overlay);
    group.add(textBackground);
    group.add(textContainer);

    return group;
  }

  render(layer: Konva.Layer, config?: RenderConfig): Konva.Group {
    const stage = layer.getStage();

    if (!stage) {
      return new Konva.Group();
    }

    const width = stage.width();
    const height = stage.height();

    const group = this.getEventGroup(width, height);

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
