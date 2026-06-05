import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kavindu-w.github.io',
  integrations: [react()],
  output: 'static',
});
