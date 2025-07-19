import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  ),
});
