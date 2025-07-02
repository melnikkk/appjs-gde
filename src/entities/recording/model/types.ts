import { RecordingEvents } from '@/entities/recordingEvent/model/types';
import { Dimensions } from '@/shared/types';

export interface RequestRecordingDto {
  id: string;
}

export interface RecordingsState {
  currentRecordingId: string | null;
}

export interface ExportAsStepByStepHTMLRequestDto {
  recordingId: string;
}

export interface Recording {
  id: string;
  name: string;
  sourceUrl: string;
  createdAt: string;
  fileSize: number;
  startTime: number;
  stopTime: number;
  duration: number;
  thumbnailUrl: string | null;
  viewData: Dimensions;
  events: RecordingEvents;
}

export type Recordings = Array<Recording>;
