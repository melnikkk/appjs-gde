import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/shared/ui-kit/button';
import { HeaderComponentProps } from '@/shared/types/header';
import { ExportAsHTMLDialog } from '@/features/recording/exportAsHtml';
import { EditableTitle } from '@/features/recording/updateRecordingTitle';
import { Skeleton } from '@/shared/ui-kit/skeleton';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { selectRecordingFromCache } from '@/entities/recording/model/selectors';
import { DEFAULT_RECORDING_NAME } from '../lib/constants';
import { AvatarDropdown, useAuth } from '@/shared/auth';

export const RecordingHeader: React.FC<HeaderComponentProps> = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const recording = useAppSelector(selectRecordingFromCache);
  const isLoading = !recording;

  const onExportClick = () => {
    setIsDialogOpen(true);
  };

  const { isSignedIn } = useAuth();

  return (
    <>
      <div className="flex-1">
        {isLoading ? (
          <Skeleton className="h-5 w-64 bg-gray-400/70" />
        ) : (
          <EditableTitle
            id={recording?.id ?? ''}
            title={recording?.name || DEFAULT_RECORDING_NAME}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-2" onClick={onExportClick}>
          <Download className="h-5 w-5" />
          Export as HTML
        </Button>

        <ExportAsHTMLDialog isOpen={isDialogOpen} onIsOpenChange={setIsDialogOpen} />

        {isSignedIn && <AvatarDropdown />}
      </div>
    </>
  );
};
