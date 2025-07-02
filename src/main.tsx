import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
/* eslint-disable-next-line import/no-unassigned-import */
import './app/styles/index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
