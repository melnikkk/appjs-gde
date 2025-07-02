import { useContext } from 'react';
import {
  AddEventDialogContext,
  AddEventDialogContextValue,
} from '../AddRecordingEventDialogContext';

export const useAddEventDialog = () => {
  return useContext<AddEventDialogContextValue>(AddEventDialogContext);
};
