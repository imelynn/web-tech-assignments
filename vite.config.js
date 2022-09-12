import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'Breakout Game/index': resolve(__dirname, 'Breakout Game/index.html'),
        'comment-app/index': resolve(__dirname, 'comment-app/index.html'),
        'form-input/index': resolve(__dirname, 'form-input/index.html'),
        'omdb_final_working2': resolve(__dirname, 'omdb_final_working2/index.html'),
        'picsum-lookup': resolve(__dirname, 'picsum-lookup/index.html'),
        'tech-document': resolve(__dirname, 'tech-document/index.html'),
      },
    },
  },
});