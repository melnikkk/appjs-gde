import { ReactNode } from 'react';

export interface HeaderPortProps {
  title: string;
}

export interface HeaderComponentProps extends HeaderPortProps {
  children?: ReactNode;
}

export type HeaderComponent = React.ComponentType<HeaderComponentProps>;
