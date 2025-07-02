import React, { createContext, ReactNode, useRef } from 'react';
import { HeaderComponent, HeaderPortsContextType } from '../model/types';
import { isPathMatchingPattern } from '../lib/pathMatcher';

interface Props {
  children: ReactNode;
}

export const HeaderPortsProvider: React.FC<Props> = ({ children }) => {
  const headerMap = useRef<Map<string, HeaderComponent>>(new Map());

  const registerHeader = (path: string, component: HeaderComponent) => {
    headerMap.current.set(path, component);
  };

  const getHeaderForPath = (path: string): HeaderComponent | null => {
    for (const [pattern, component] of Array.from(headerMap.current.entries())) {
      if (isPathMatchingPattern(pattern, path)) {
        return component;
      }
    }

    return null;
  };

  return (
    <HeaderPortsContext.Provider value={{ registerHeader, getHeaderForPath }}>
      {children}
    </HeaderPortsContext.Provider>
  );
};

export const HeaderPortsContext = createContext<HeaderPortsContextType | undefined>(
  undefined,
);
