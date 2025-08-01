import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
const config = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      generatedRouteTree: './src/app/routeTree.gen.ts',
      routesDirectory: './src/app/routes',
      disableLogging: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

export default config;
