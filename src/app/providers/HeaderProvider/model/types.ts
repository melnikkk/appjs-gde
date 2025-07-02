import {
  HeaderComponent,
  HeaderPortProps,
  HeaderComponentProps,
} from '@/shared/types/header';

export interface HeaderPortsContextType {
  registerHeader: (path: string, component: HeaderComponent) => void;
  getHeaderForPath: (path: string) => HeaderComponent | null;
}

export type { HeaderPortProps, HeaderComponentProps, HeaderComponent };
