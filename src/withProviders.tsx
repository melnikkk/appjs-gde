import recordingData from './assets/app-mocks/recording-data.json';
import { RecordingContext } from './recordingContext';

export const withProviders =
  (Component: React.ComponentType<unknown>) => (props: unknown) => {
    return (
      <RecordingContext.Provider value={recordingData}>
        <Component {...props} />
      </RecordingContext.Provider>
    );
  };
