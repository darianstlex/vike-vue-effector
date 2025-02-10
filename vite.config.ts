import { fileURLToPath, URL } from 'node:url';
import { telefunc } from 'telefunc/vite';
import md from 'unplugin-vue-markdown/vite';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vike(),
    telefunc(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
      '@services': fileURLToPath(new URL('./services', import.meta.url)),
      '@styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
    },
  },
});
