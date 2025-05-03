import { useState, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

const DEFAULT_TITLE = 'Guide Creator';

export const useHeaderTitle = () => {
  const routerState = useRouterState();
  const [headerTitle, setHeaderTitle] = useState(DEFAULT_TITLE);

  const routePath = routerState.location.pathname;

  useEffect(() => {
    const timer = setTimeout(() => {
      const headerTitle = document
        .querySelector('[data-header-title]')
        ?.getAttribute('data-header-title');

      if (headerTitle) {
        setHeaderTitle(headerTitle);
      } else {
        setHeaderTitle(DEFAULT_TITLE);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [routePath]);

  return headerTitle;
};
