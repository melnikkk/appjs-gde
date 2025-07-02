import { useSidebar } from '@/shared/ui-kit/sidebar';
import { HeaderComponentProps } from '@/shared/types/header';

export const Header: React.FC<HeaderComponentProps> = ({ title, children }) => {
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
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
};
