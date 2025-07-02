import { RecordingHeader } from '@/widgets/recording/recordingHeader';
import { DefaultHeader } from '@/shared/components/header';
import { useRegisterHeader } from '../model/useRegisterHeader';

export const HeaderRegistry: React.FC = () => {
  useRegisterHeader('/', DefaultHeader);
  useRegisterHeader('/recordings', DefaultHeader);
  useRegisterHeader('/recordings/:id', RecordingHeader);
  useRegisterHeader('/guides', DefaultHeader);
  useRegisterHeader('/profile', DefaultHeader);
  useRegisterHeader('/settings', DefaultHeader);

  return null;
};
