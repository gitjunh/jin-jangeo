import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@shared/media': resolve(__dirname, '../shared/media/index.ts') },
  },
  test: {
    environment: 'node',
  },
});
