import { useContext } from 'react';
import {
  AddEventDialogContextValue,
  AddEventDialogContext,
} from '../contexts/AddEventDialogContext';

export const useAddEventDialog = () => {
  return useContext<AddEventDialogContextValue>(AddEventDialogContext);
};
