import { useRegisterHeader } from '@/app/shared/contexts/HeaderPortsContext';
import { RecordingHeader } from '@/app/pages/Recording/components/RecordingHeader';
import { DefaultHeader } from './DefaultHeader';

export const HeaderRegistry: React.FC = () => {
  useRegisterHeader('/', DefaultHeader);
  useRegisterHeader('/recordings', DefaultHeader);
  useRegisterHeader('/recordings/:id', RecordingHeader);
  useRegisterHeader('/guides', DefaultHeader);
  useRegisterHeader('/profile', DefaultHeader);
  useRegisterHeader('/settings', DefaultHeader);

  return null;
};
