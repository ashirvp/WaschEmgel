import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aufbereitung: resolve(__dirname, 'aufbereitung.html'),
        lackierarbeiten: resolve(__dirname, 'lackierarbeiten.html'),
        leasing: resolve(__dirname, 'leasing.html'),
        lederreparatur: resolve(__dirname, 'lederreparatur.html'),
        ppf: resolve(__dirname, 'ppf.html'),
        aviation: resolve(__dirname, 'aviation.html'),
        impressum: resolve(__dirname, 'impressum.html'),
      },
    },
  },
});
