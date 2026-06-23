import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/^@angular/, /^rxjs/],
      },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
