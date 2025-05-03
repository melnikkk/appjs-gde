import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/guides')({
  component: () => (
    <div data-header-title="Guides">
      <h3>Guides</h3>
    </div>
  ),
});
