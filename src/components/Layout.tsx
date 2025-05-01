import React, { FC, useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const routePath = router.state.location.pathname;
  const showBackButton = true;

  const handleSave = useCallback(() => {
    console.log('Saving guide');
  }, []);

  const handleExport = useCallback(() => {
    console.log('Exporting guide');
  }, []);

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr] overflow-hidden">
      <div className="hidden md:block">
        <Sidebar className="h-screen" />
      </div>
      <div className="flex flex-col h-screen max-h-screen">
        <Header
          title='Guide Creator'
          showBackButton={showBackButton}
          onSave={routePath.includes('/recordings/') ? handleSave : undefined}
          onExport={routePath.includes('/recordings/') ? handleExport : undefined}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}