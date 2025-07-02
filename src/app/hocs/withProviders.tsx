import { ComponentType, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

type WithProvidersProps = PropsWithChildren<object>;

export const withProviders = <P extends WithProvidersProps>(
  Component: ComponentType<P>,
) => {
  return (props: P) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};
