import { toast } from 'sonner';

interface Props {
  scriptContent: string | undefined;
  isLoading: boolean;
}

export const ScriptContentTextPreview: React.FC<Props> = ({
  scriptContent,
  isLoading,
}) => {
  const onCopytoClipboardClick = () => {
    if (!scriptContent) {
      toast.error('No code available to copy.');

      return;
    }

    navigator.clipboard.writeText(scriptContent);

    toast.success('Embed code copied to clipboard!');
  };

  return isLoading ? (
    <div className="py-8 text-center">Loading code...</div>
  ) : (
    <div className="h-full flex flex-col gap-4">
      <pre className="flex-1 overflow-y-auto overflow-x-hidden rounded-md bg-gray-100 p-4 text-sm">
        <code className="language-javascript whitespace-pre-wrap break-all">
          {scriptContent || 'No code available'}
        </code>
      </pre>
      {scriptContent && (
        <div className="flex justify-end">
          <button
            className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium text-white shadow"
            onClick={onCopytoClipboardClick}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};
