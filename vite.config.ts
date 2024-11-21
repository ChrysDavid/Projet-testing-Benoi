import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $routes: new URL('./src/routes', import.meta.url).pathname,
      $lib: new URL('./src/lib', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: new URL('./src/tests/setup.ts', import.meta.url).pathname, // Utilisation d'un chemin absolu pour setup.ts
  },
});
