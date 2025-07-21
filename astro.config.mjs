import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Importa el adaptador de Vercel serverless específicamente
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(), // Usa el adaptador de Vercel
  integrations: [svelte(), tailwind()]
});