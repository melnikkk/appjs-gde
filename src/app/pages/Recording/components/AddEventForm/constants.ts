export enum EventFormMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export const SUBMIT_BUTTON_TEXT_BY_MODE: Record<EventFormMode, string> = {
  [EventFormMode.CREATE]: 'Add event',
  [EventFormMode.EDIT]: 'Edit event',
};

export const SUBMIT_BUTTON_LOADING_TEXT_BY_MODE: Record<EventFormMode, string> = {
  [EventFormMode.CREATE]: 'Adding event...',
  [EventFormMode.EDIT]: 'Editing event...',
};

export const FORM_TITLE_BY_MODE: Record<EventFormMode, string> = {
  [EventFormMode.CREATE]: 'Add event',
  [EventFormMode.EDIT]: 'Edit event',
};

export const FORM_DESCRIPTION_BY_MODE: Record<EventFormMode, string> = {
  [EventFormMode.CREATE]: 'Add a custom event at the current timestamp in the recording.',
  [EventFormMode.EDIT]: 'Edit the existing event details.',
};
