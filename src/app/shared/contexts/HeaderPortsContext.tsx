import React, { createContext, useContext, ReactNode, useEffect } from 'react';

export interface HeaderPortProps {
  title: string;
}

export interface HeaderComponentProps extends HeaderPortProps {
  children?: ReactNode;
}

export type HeaderComponent = React.ComponentType<HeaderComponentProps>;

interface HeaderPortsContextType {
  registerHeader: (path: string, component: HeaderComponent) => void;
  getHeaderForPath: (path: string) => HeaderComponent | null;
}

const HeaderPortsContext = createContext<HeaderPortsContextType | undefined>(undefined);

export const HeaderPortsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const headerMap = React.useRef<Map<string, HeaderComponent>>(new Map());

  const registerHeader = (path: string, component: HeaderComponent) => {
    headerMap.current.set(path, component);
  };

  const getHeaderForPath = (path: string): HeaderComponent | null => {
    for (const [pattern, component] of Array.from(headerMap.current.entries())) {
      if (
        pattern === path ||
        (pattern.endsWith('*') && path.startsWith(pattern.slice(0, -1))) ||
        (pattern.includes(':') &&
          new RegExp(`^${pattern.replace(/:\w+/g, '([^/]+)')}$`).test(path))
      ) {
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

export const useHeaderPorts = () => {
  const context = useContext(HeaderPortsContext);

  if (context === undefined) {
    throw new Error('useHeaderPorts must be used within a HeaderPortsProvider');
  }

  return context;
};

export const useRegisterHeader = (path: string, component: HeaderComponent) => {
  const { registerHeader } = useHeaderPorts();

  useEffect(() => {
    registerHeader(path, component);
  }, [path, component, registerHeader]);
};
