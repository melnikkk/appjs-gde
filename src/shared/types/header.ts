import { ReactNode } from 'react';

export interface HeaderComponentProps {
  title?: string;
  children?: ReactNode;
}

export type HeaderComponent = React.ComponentType<HeaderComponentProps>;
