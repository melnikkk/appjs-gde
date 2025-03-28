import { ComponentType } from 'react';
import recordingData from './assets/app-mocks/recording-data.json';
import { RecordingContext, RecordingContextProps } from './recordingContext';

export const withProviders = (Component: ComponentType<any>) => (props: any) => {
  const value = recordingData as RecordingContextProps;
  return (
    <RecordingContext.Provider value={value}>
      <Component {...props} />
    </RecordingContext.Provider>
  );
};
