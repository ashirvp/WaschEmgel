import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        automotive: resolve(__dirname, 'automotive.html'),
        flight: resolve(__dirname, 'flight.html'),
        impressum: resolve(__dirname, 'impressum.html'),
      },
    },
  },
});
