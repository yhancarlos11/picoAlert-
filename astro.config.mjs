import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Importa el adaptador de Vercel serverless específicamente
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
        // Asegúra que se generen correctamente los archivos del servidor
    includeFiles: ['./dist/server/entry.mjs']
  }), // Usa el adaptador de Vercel
  integrations: [svelte(), tailwind()]
});