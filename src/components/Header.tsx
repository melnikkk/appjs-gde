import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  onSave?: () => void;
  onExport?: () => void;
}

export const Header: React.FC<Props> = ({
  title,
  onSave,
  onExport
}) => {
  return (
    <header className="flex h-13 items-center border-b px-4 bg-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center">
          <div className="font-semibold">{title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onExport && (
          <Button variant="ghost" size="icon" onClick={onExport}>
            <Download className="h-5 w-5" />
            <span className="sr-only">Export</span>
          </Button>
        )}
        {onSave && (
          <Button onClick={onSave}>
            Save Guide
          </Button>
        )}
      </div>
    </header>
  );
}