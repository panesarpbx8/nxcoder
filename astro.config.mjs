import { defineConfig } from 'astro/config';
import turbolinks from "@astrojs/turbolinks";

// https://astro.build/config
export default defineConfig({
  site: 'https://nxcoder.vercel.app',
  integrations: [turbolinks()],
  markdown: {
    syntaxHighlight: 'prism',
  },

});