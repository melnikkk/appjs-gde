import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

interface Props {
  title: string;
  onSave?: () => void;
  onExport?: () => void;
}

export const Header: React.FC<Props> = ({ title, onSave, onExport }) => {
  const { open } = useSidebar();

  return (
    <header
      className={`fixed top-0 right-0 z-10 flex h-13 items-center border-b bg-white px-4 transition-all duration-200 ease-linear ${open ? 'md:left-[var(--sidebar-width)]' : 'md:left-[var(--sidebar-width-icon)]'} left-0`}
    >
      <div className="flex flex-1 items-center gap-4">
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
        {onSave && <Button onClick={onSave}>Save Guide</Button>}
      </div>
    </header>
  );
};
