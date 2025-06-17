import { useParams } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExportAsStepByStepHTMLQuery } from '@/infrastructure/store/slices/recordings/api';
import { ScriptContentTextPreview } from './ScriptContentTextPreview';
import { ScriptContentHtmlPreview } from './ScriptContentHtmlPreview';
import { ExportException } from './ExportException';

interface ExportAsHTMLDialogProps {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
}

export const ExportAsHTMLDialog: React.FC<ExportAsHTMLDialogProps> = ({
  isOpen,
  onIsOpenChange,
}) => {
  const { id: recordingId } = useParams({ strict: false });

  const {
    data: htmlGuide,
    isLoading,
    isError,
    refetch,
  } = useExportAsStepByStepHTMLQuery(
    {
      recordingId,
    },
    {
      skip: !isOpen || !recordingId,
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={onIsOpenChange}>
      <DialogContent className="h-[60vh] content-start overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Export as HTML</DialogTitle>
        </DialogHeader>

        {isError ? (
          <ExportException onActionClick={refetch} />
        ) : (
          <Tabs defaultValue="preview" className="flex h-[calc(60vh-100px)] flex-col">
            <TabsList className="self-end">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="h-full flex-1 overflow-scroll">
              <ScriptContentHtmlPreview scriptContent={htmlGuide} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="code" className="h-full flex-1 overflow-scroll rounded">
              <ScriptContentTextPreview scriptContent={htmlGuide} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
