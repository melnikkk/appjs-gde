import { createContext, useContext, ReactNode } from 'react';
import { RecordingEvents } from '@/domain/RecordingEvents';

interface RecordingEventsContextType {
  recordingEvents: RecordingEvents;
}

const RecordingEventsContext = createContext<RecordingEventsContextType | undefined>(
  undefined,
);

interface RecordingEventsProviderProps {
  children: ReactNode;
  recordingEvents: RecordingEvents;
}

export const RecordingEventsProvider = ({
  children,
  recordingEvents,
}: RecordingEventsProviderProps) => {
  return (
    <RecordingEventsContext.Provider value={{ recordingEvents }}>
      {children}
    </RecordingEventsContext.Provider>
  );
};

export const useRecordingEvents = (): RecordingEventsContextType => {
  const context = useContext(RecordingEventsContext);

  if (context === undefined) {
    throw new Error('useRecordingEvents must be used within a RecordingEventsProvider');
  }

  return context;
};
