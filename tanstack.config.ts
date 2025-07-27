/** @type {import('@tanstack/router-cli').RouterConfig} */
const config = {
  routesDirectory: './src/app/routes',
  generatedRouteTree: './src/app/routeTree.gen.ts',
  routeFileIgnorePatterns: ['**/*.spec.*'],
  disableTypes: false,
  target: 'react',
};

export default config;
