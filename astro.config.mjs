import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Importa el adaptador de Vercel serverless específicamente
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    // Asegúrate de que se generen correctamente los archivos del servidor
    includeFiles: ['./dist/server/entry.mjs'],
    // Configuración adicional para el adaptador de Vercel
    functionPerRoute: false, // Usa una sola función para todas las rutas
    maxDuration: 60 // Aumenta el tiempo máximo de ejecución (en segundos)
  }), // Usa el adaptador de Vercel
  integrations: [svelte(), tailwind()]
});