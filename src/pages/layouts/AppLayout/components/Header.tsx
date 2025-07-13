import { useSidebar } from '@/shared/ui-kit/sidebar';
import { HeaderComponentProps } from '@/shared/types/header';

export const Header: React.FC<HeaderComponentProps> = ({ children }) => {
  const { open } = useSidebar();

  return (
    <header
      className={`fixed top-0 right-0 z-10 flex h-13 items-center border-b bg-white px-4 transition-all duration-200 ease-linear ${open ? 'md:left-[var(--sidebar-width)]' : 'md:left-[var(--sidebar-width-icon)]'} left-0`}
    >
      {children}
    </header>
  );
};
