import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div data-header-title="Dashboard">
      <h3>Welcome Home!</h3>
    </div>
  ),
});
