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
        'final_omdb_check': resolve(__dirname, 'final_omdb_check/index.html'),
        'picsum-lookup': resolve(__dirname, 'picsum-lookup/index.html'),
        'tech-document': resolve(__dirname, 'tech-document/index.html'),
      },
    },
  },
});