import { createRoute, createRouter } from '@tanstack/react-router';
import { RecordingsPage } from '../pages/Recordings';
import { RecordingPage } from '../pages/Recording';
import { rootRoute } from '../__root';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  ),
});

const recordingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recordings',
  component: RecordingsPage,
});

const recordingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recordings/$id',
  component: RecordingPage,
});

const routeTree = rootRoute.addChildren([indexRoute, recordingsRoute, recordingRoute]);

export const router = createRouter({ routeTree });
