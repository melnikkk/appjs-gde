import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const Root = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const rootRoute = createRootRoute({
  component: Root,
});
