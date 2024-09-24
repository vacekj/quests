import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    publicDir: {
      name: 'public',
      watch: true,
    },
  },
  html: {
    title: 'Penumbra Quests',
    favicon:
      'https://penumbra.zone/static/img_0-9aead6bb0ee51f1a74629d6462635d8e.png',
  },
});
