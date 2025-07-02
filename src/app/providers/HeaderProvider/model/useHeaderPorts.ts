import { useContext } from 'react';
import { HeaderPortsContext } from '../components/HeaderPortsProvider';

export const useHeaderPorts = () => {
  const context = useContext(HeaderPortsContext);

  if (context === undefined) {
    throw new Error('useHeaderPorts must be used within a HeaderPortsProvider');
  }

  return context;
};
