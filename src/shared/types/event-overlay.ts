import Konva from 'konva';
import { Coordinates } from './index';

export interface RenderableEvent {
  getCoordinates(): Coordinates;
  render(layer: Konva.Layer, config?: RenderConfig): Konva.Group;
}

export interface RenderConfig {
  isDragging?: boolean;
  isSelected?: boolean;
  onDragMove?: (evt: unknown) => void;
  onDragEnd?: (evt: unknown) => void;
  onClick?: (evt: unknown) => void;
}
