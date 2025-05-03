import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: () => (
    <div data-header-title="Profile">
      <h3>Profile Page</h3>
      <p>This is the user profile page.</p>
    </div>
  ),
});
