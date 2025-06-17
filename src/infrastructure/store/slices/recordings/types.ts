export interface RequestRecordingDto {
  id: string;
}

export interface RecordingsState {
  currentRecordingId: string | null;
}

export interface ExportAsStepByStepHTMLRequestDto {
  recordingId: string;
}
