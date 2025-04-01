import { ComponentType, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import recordingData from '../../assets/app-mocks/recording-data.json';
import { RecordingContext, RecordingContextProps } from '../contexts/recordingContext';
import { store } from '../../infrastructure/store';

type WithProvidersProps = PropsWithChildren<object>;

export const withProviders = <P extends WithProvidersProps>(
  Component: ComponentType<P>
) => {
  return (props: P) => {
    const value = recordingData as unknown as RecordingContextProps;

    return (
      <Provider store={store}>
        <RecordingContext.Provider value={value}>
          <Component {...props} />
        </RecordingContext.Provider>
      </Provider>
    );
  };
};
