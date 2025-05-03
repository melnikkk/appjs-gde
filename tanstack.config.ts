/** @type {import('@tanstack/router-cli').RouterConfig} */
export default {
  routesDirectory: 'src/app/routes',
  generatedRouteTree: 'src/app/routeTree.gen.ts',
  routeFileIgnorePatterns: ['**/*.spec.*'],
  disableTypes: false,
  target: 'react',
};
