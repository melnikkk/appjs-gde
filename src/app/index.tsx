import { RouterProvider, createRouter } from '@tanstack/react-router';
import { withProviders } from './hocs/withProviders';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

export const App = withProviders(() => {
  return <RouterProvider router={router} />;
});

export default App;
