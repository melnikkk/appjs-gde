import { RouterProvider, createRouter } from '@tanstack/react-router';
import { withProviders } from './shared/hocs/withProviders';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default withProviders(App);
