import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: 'src/app/routes',
      generatedRouteTree: './src/app/routeTree.gen.ts'
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
