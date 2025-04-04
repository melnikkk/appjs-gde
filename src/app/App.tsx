import { RouterProvider } from '@tanstack/react-router';
import './App.css';
import { withProviders } from './hocs/withProviders';
import { router } from './routes';

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default withProviders(App);
