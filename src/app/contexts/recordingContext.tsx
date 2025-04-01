import { createContext } from 'react';
import { RecordingEvents } from './types';

export interface RecordingContextProps {
  events: RecordingEvents;
  startTime: number;
  id: string;
}

export const RecordingContext = createContext<RecordingContextProps>(
  {} as RecordingContextProps,
);
