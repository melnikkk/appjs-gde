/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root';
import { Route as AuthRouteImport } from './routes/_auth';
import { Route as AppRouteImport } from './routes/_app';
import { Route as AppIndexRouteImport } from './routes/_app/index';
import { Route as AuthSignUpRouteImport } from './routes/_auth/sign-up';
import { Route as AuthSignInRouteImport } from './routes/_auth/sign-in';
import { Route as AppSettingsRouteImport } from './routes/_app/settings';
import { Route as AppProfileRouteImport } from './routes/_app/profile';
import { Route as AppGuidesRouteImport } from './routes/_app/guides';
import { Route as AppRecordingsIndexRouteImport } from './routes/_app/recordings/index';
import { Route as AppRecordingsIdRouteImport } from './routes/_app/recordings/$id';

const AuthRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRouteImport,
} as any);
const AppRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRouteImport,
} as any);
const AppIndexRoute = AppIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any);
const AuthSignUpRoute = AuthSignUpRouteImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthRoute,
} as any);
const AuthSignInRoute = AuthSignInRouteImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthRoute,
} as any);
const AppSettingsRoute = AppSettingsRouteImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRoute,
} as any);
const AppProfileRoute = AppProfileRouteImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AppRoute,
} as any);
const AppGuidesRoute = AppGuidesRouteImport.update({
  id: '/guides',
  path: '/guides',
  getParentRoute: () => AppRoute,
} as any);
const AppRecordingsIndexRoute = AppRecordingsIndexRouteImport.update({
  id: '/recordings/',
  path: '/recordings/',
  getParentRoute: () => AppRoute,
} as any);
const AppRecordingsIdRoute = AppRecordingsIdRouteImport.update({
  id: '/recordings/$id',
  path: '/recordings/$id',
  getParentRoute: () => AppRoute,
} as any);

export interface FileRoutesByFullPath {
  '/guides': typeof AppGuidesRoute;
  '/profile': typeof AppProfileRoute;
  '/settings': typeof AppSettingsRoute;
  '/sign-in': typeof AuthSignInRoute;
  '/sign-up': typeof AuthSignUpRoute;
  '/': typeof AppIndexRoute;
  '/recordings/$id': typeof AppRecordingsIdRoute;
  '/recordings': typeof AppRecordingsIndexRoute;
}
export interface FileRoutesByTo {
  '/guides': typeof AppGuidesRoute;
  '/profile': typeof AppProfileRoute;
  '/settings': typeof AppSettingsRoute;
  '/sign-in': typeof AuthSignInRoute;
  '/sign-up': typeof AuthSignUpRoute;
  '/': typeof AppIndexRoute;
  '/recordings/$id': typeof AppRecordingsIdRoute;
  '/recordings': typeof AppRecordingsIndexRoute;
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport;
  '/_app': typeof AppRouteWithChildren;
  '/_auth': typeof AuthRouteWithChildren;
  '/_app/guides': typeof AppGuidesRoute;
  '/_app/profile': typeof AppProfileRoute;
  '/_app/settings': typeof AppSettingsRoute;
  '/_auth/sign-in': typeof AuthSignInRoute;
  '/_auth/sign-up': typeof AuthSignUpRoute;
  '/_app/': typeof AppIndexRoute;
  '/_app/recordings/$id': typeof AppRecordingsIdRoute;
  '/_app/recordings/': typeof AppRecordingsIndexRoute;
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/guides'
    | '/profile'
    | '/settings'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/recordings/$id'
    | '/recordings';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/guides'
    | '/profile'
    | '/settings'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/recordings/$id'
    | '/recordings';
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/guides'
    | '/_app/profile'
    | '/_app/settings'
    | '/_auth/sign-in'
    | '/_auth/sign-up'
    | '/_app/'
    | '/_app/recordings/$id'
    | '/_app/recordings/';
  fileRoutesById: FileRoutesById;
}
export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren;
  AuthRoute: typeof AuthRouteWithChildren;
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    '/_app': {
      id: '/_app';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AppRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    '/_app/': {
      id: '/_app/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof AppIndexRouteImport;
      parentRoute: typeof AppRoute;
    };
    '/_auth/sign-up': {
      id: '/_auth/sign-up';
      path: '/sign-up';
      fullPath: '/sign-up';
      preLoaderRoute: typeof AuthSignUpRouteImport;
      parentRoute: typeof AuthRoute;
    };
    '/_auth/sign-in': {
      id: '/_auth/sign-in';
      path: '/sign-in';
      fullPath: '/sign-in';
      preLoaderRoute: typeof AuthSignInRouteImport;
      parentRoute: typeof AuthRoute;
    };
    '/_app/settings': {
      id: '/_app/settings';
      path: '/settings';
      fullPath: '/settings';
      preLoaderRoute: typeof AppSettingsRouteImport;
      parentRoute: typeof AppRoute;
    };
    '/_app/profile': {
      id: '/_app/profile';
      path: '/profile';
      fullPath: '/profile';
      preLoaderRoute: typeof AppProfileRouteImport;
      parentRoute: typeof AppRoute;
    };
    '/_app/guides': {
      id: '/_app/guides';
      path: '/guides';
      fullPath: '/guides';
      preLoaderRoute: typeof AppGuidesRouteImport;
      parentRoute: typeof AppRoute;
    };
    '/_app/recordings/': {
      id: '/_app/recordings/';
      path: '/recordings';
      fullPath: '/recordings';
      preLoaderRoute: typeof AppRecordingsIndexRouteImport;
      parentRoute: typeof AppRoute;
    };
    '/_app/recordings/$id': {
      id: '/_app/recordings/$id';
      path: '/recordings/$id';
      fullPath: '/recordings/$id';
      preLoaderRoute: typeof AppRecordingsIdRouteImport;
      parentRoute: typeof AppRoute;
    };
  }
}

interface AppRouteChildren {
  AppGuidesRoute: typeof AppGuidesRoute;
  AppProfileRoute: typeof AppProfileRoute;
  AppSettingsRoute: typeof AppSettingsRoute;
  AppIndexRoute: typeof AppIndexRoute;
  AppRecordingsIdRoute: typeof AppRecordingsIdRoute;
  AppRecordingsIndexRoute: typeof AppRecordingsIndexRoute;
}

const AppRouteChildren: AppRouteChildren = {
  AppGuidesRoute: AppGuidesRoute,
  AppProfileRoute: AppProfileRoute,
  AppSettingsRoute: AppSettingsRoute,
  AppIndexRoute: AppIndexRoute,
  AppRecordingsIdRoute: AppRecordingsIdRoute,
  AppRecordingsIndexRoute: AppRecordingsIndexRoute,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

interface AuthRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute;
  AuthSignUpRoute: typeof AuthSignUpRoute;
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
};

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
};
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();
