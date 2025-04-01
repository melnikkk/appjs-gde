import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { RecordingPage } from "../pages/Recording"
import { RecordingsPage } from "../pages/Recordings"

declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
  }

const rootRoute = createRootRoute({
    component: () => (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    ),
  })

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <div>
          <h3>Welcome Home!</h3>
        </div>
      ),
  })

  const recordingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/recordings',
    component: () => <RecordingsPage />,
  })

  const recordingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/recordings/$id',
    component: () => <RecordingPage />,
  })

const routeTree = rootRoute.addChildren([indexRoute, recordingsRoute, recordingRoute])

export const router = createRouter({ routeTree })
