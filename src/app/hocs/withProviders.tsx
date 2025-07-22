import { ComponentType, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ClerkAuthProvider } from '@/shared/auth';

type WithProvidersProps = PropsWithChildren<object>;

export const withProviders = <P extends WithProvidersProps>(
  Component: ComponentType<P>,
) => {
  return (props: P) => {
    return (
      <Provider store={store}>
        <ClerkAuthProvider>
          <Component {...props} />
        </ClerkAuthProvider>
      </Provider>
    );
  };
};
