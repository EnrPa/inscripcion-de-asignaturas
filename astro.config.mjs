import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), solidJs(), tailwind()]
});