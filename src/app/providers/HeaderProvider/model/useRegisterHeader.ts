import { useEffect } from 'react';
import { HeaderComponent } from '../model/types';
import { useHeaderPorts } from './useHeaderPorts';

export const useRegisterHeader = (path: string, component: HeaderComponent) => {
  const { registerHeader } = useHeaderPorts();

  useEffect(() => {
    registerHeader(path, component);
  }, [path, component, registerHeader]);
};
