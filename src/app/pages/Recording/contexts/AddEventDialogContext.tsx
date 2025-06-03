import React, { createContext, ReactNode, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import { useAddEventsMutation } from '@/infrastructure/store/slices/recordingEvents/api';
import {
  DEFAULT_RECORDING_EVENT_COORDINATES,
  RecordingEventType,
} from '@/domain/RecordingEvents/constants';
import { useGetRecordingQuery } from '@/infrastructure/store/slices/recordings/api';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/shared/hooks/useAppSelector';
import { selectSelectedTrackerEvent } from '@/infrastructure/store/slices/editor/selectors';
import { RecordingEvent } from '@/domain/RecordingEvents';
import { setCurrentEventId } from '@/infrastructure/store/slices/recordingEvents/slice';
import { useAppDispatch } from '@/app/shared/hooks/useAppDispatch';

export interface EventFormData {
  time: number;
  type: RecordingEventType;
}

export interface AddEventDialogContextValue {
  isOpen: boolean;
  isSubmitting: boolean;
  setIsOpen: (open: boolean) => void;
  addCustomEvent: (data: EventFormData) => void;
}

export const AddEventDialogContext = createContext<AddEventDialogContextValue>({
  isOpen: false,
  isSubmitting: false,
  addCustomEvent: () => {},
  setIsOpen: () => {},
});

interface Props {
  children: ReactNode;
}

export const AddEventDialogProvider: React.FC<Props> = ({ children }) => {
  const { id: recordingId } = useParams({ strict: false });

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const trackerEvent = useAppSelector(selectSelectedTrackerEvent);

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

    let eventToAdd: RecordingEvent;

    if (!trackerEvent) {
      const timestamp = recording.startTime + data.time;
      const eventData = {
        coordinates: DEFAULT_RECORDING_EVENT_COORDINATES,
      };

      eventToAdd = {
        timestamp,
        id: uuidv4(),
        screenshotUrl: null,
        type: data.type,
        data: eventData,
      };
    } else {
      const { coordinates, timestamp, id } = trackerEvent;

      eventToAdd = {
        id,
        timestamp,
        type: data.type,
        data: {
          coordinates,
        },
        screenshotUrl: null,
      };
    }

    try {
      await addEvents({
        recordingId,
        events: { [eventToAdd.id]: eventToAdd },
      }).unwrap();

      setIsOpen(false);

      dispatch(setCurrentEventId(eventToAdd.id));

      toast.success(`Custom event "${data.type}" added successfully.`);
    } catch (error) {
      toast.error('Failed to add custom event. Please try again.');
    }
  };

  return (
    <AddEventDialogContext.Provider
      value={{
        isOpen,
        isSubmitting: isLoading,
        setIsOpen,
        addCustomEvent,
      }}
    >
      {children}
    </AddEventDialogContext.Provider>
  );
};
