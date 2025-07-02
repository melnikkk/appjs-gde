import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/shared/ui-kit/button';
import { HeaderComponentProps } from '@/shared/types/header';
import { ExportAsHTMLDialog } from '@/features/recording/exportAsHtml';

export const RecordingHeader: React.FC<HeaderComponentProps> = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onExportClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button className="flex items-center gap-2" onClick={onExportClick}>
        <Download className="h-5 w-5" />
        Export as HTML
      </Button>

      <ExportAsHTMLDialog isOpen={isDialogOpen} onIsOpenChange={setIsDialogOpen} />
    </>
  );
};
