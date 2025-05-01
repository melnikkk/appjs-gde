import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/guides')({
  component: () => (
    <div>
      <h3>Guides</h3>
    </div>
  ),
});
