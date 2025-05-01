import React from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Film, BookOpen, User, Settings } from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarNavProps) {
  return (
    <div className={cn("border-r h-full bg-white", className)} {...props}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Guide Creator</h2>
        </div>
        <div className="flex-1">
          <nav className="px-2 py-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase">Navigation</h3>
            <div className="mt-2 space-y-1">
              <NavItem to="/" icon={<LayoutDashboard className="mr-3 h-4 w-4" />}>Dashboard</NavItem>
              <NavItem to="/recordings" icon={<Film className="mr-3 h-4 w-4" />}>Recordings</NavItem>
              <NavItem to="/guides" icon={<BookOpen className="mr-3 h-4 w-4" />}>Guides</NavItem>
            </div>
          </nav>
        </div>
        <div className="border-t p-4">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase">Account</h3>
          <div className="mt-2 space-y-1">
            <NavItem to="/profile" icon={<User className="mr-3 h-4 w-4" />}>Profile</NavItem>
            <NavItem to="/settings" icon={<Settings className="mr-3 h-4 w-4" />}>Settings</NavItem>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ to, icon, children }: NavItemProps) {
  return (
    <Link
      to={to}
      activeProps={{ className: 'bg-accent text-accent-foreground' }}
      inactiveProps={{ className: 'hover:bg-muted' }}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md",
      )}
    >
      {icon}
      {children}
    </Link>
  );
}