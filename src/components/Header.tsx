import { Link } from '@tanstack/react-router';
import { ChevronLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onSave?: () => void;
  onExport?: () => void;
}

export function Header({ 
  title, 
  showBackButton = true, 
  onSave, 
  onExport 
}: HeaderProps) {
  return (
    <header className="flex h-14 items-center border-b px-2 bg-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            {showBackButton && (
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <div className="font-semibold">{title}</div>
          </Link>
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