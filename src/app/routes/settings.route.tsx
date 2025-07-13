import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: () => (
    <div>
      <h3>Settings Page</h3>
      <p>You can configure your application settings here.</p>
    </div>
  ),
});
