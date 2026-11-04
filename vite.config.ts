import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { blogFeedPlugin } from './vite-plugins/blog-feed';

export default defineConfig({
  plugins: [react(), tailwindcss(), blogFeedPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
