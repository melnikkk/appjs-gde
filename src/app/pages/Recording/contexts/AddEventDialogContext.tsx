import React, { createContext, ReactNode, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import { useAddEventsMutation } from '@/infrastructure/store/slices/recordingEvents/api';
import { RecordingEventType } from '@/domain/RecordingEvents/constants';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectEventsAmount } from '@/infrastructure/store/slices/editor/selectors';

export interface EventFormData {
  time: number;
  type: RecordingEventType;
}

export interface AddEventDialogContextValue {
  isOpen: boolean;
  currentTime: number;
  formattedTime: string;
  isSubmitting: boolean;
  setIsOpen: (open: boolean) => void;
  addCustomEvent: (data: EventFormData) => void;
}

export const AddEventDialogContext = createContext<AddEventDialogContextValue>({
  isOpen: false,
  isSubmitting: false,
  currentTime: 0,
  formattedTime: '0:00',
  addCustomEvent: () => {},
  setIsOpen: () => {},
});

interface Props {
  children: ReactNode;
  currentTime?: number;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const AddEventDialogProvider: React.FC<Props> = ({
  children,
  currentTime = 0,
}) => {
  const { id: recordingId } = useParams({ strict: false });

  const eventsAmount = useAppSelector(selectEventsAmount);

  const [isOpen, setIsOpen] = useState(false);

  const [addEvents, { isLoading }] = useAddEventsMutation();

  const { data: recording } = useGetRecordingQuery(
    { id: recordingId },
    { skip: !recordingId },
  );

  const addCustomEvent = async (data: EventFormData) => {
    if (!recordingId || !recording) {
      toast.error('Cannot add event: Recording not found');

      return;
    }

    try {
      const timestamp = recording.startTime + data.time * 1000;
      const eventId = uuidv4();
      const eventData = {
        coordinates: {
          x: 100,
          y: 100,
        },
        view: {
          innerWidth: Object.values(recording.events)[0]?.data.view.innerWidth,
          innerHeight: Object.values(recording.events)[0]?.data.view.innerHeight,
        },
      };
      const event = {
        timestamp,
        id: eventId,
        type: data.type,
        index: eventsAmount,
        data: eventData,
      };

      await addEvents({
        recordingId,
        events: { [eventId]: event },
      }).unwrap();

      toast.success(`Custom event "${data.type}" added successfully.`);

      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add custom event. Please try again.');
    }
  };

  return (
    <AddEventDialogContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentTime,
        addCustomEvent,
        isSubmitting: isLoading,
        formattedTime: formatTime(currentTime),
      }}
    >
      {children}
    </AddEventDialogContext.Provider>
  );
};
