import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  onActionClick: () => void;
}

export const ExportException: React.FC<Props> = ({ onActionClick }) => {
  return (
    <div className="mt-6 flex flex-col items-center rounded-md border p-6 text-center">
      <AlertCircle className="text-destructive mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">Failed to Load HTML Export</h3>
      <p className="text-muted-foreground mb-6 text-sm">
        An unexpected error occurred while trying to export the recording as HTML.
      </p>
      <button
        onClick={onActionClick}
        className="bg-destructive hover:bg-destructive/90 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
};
