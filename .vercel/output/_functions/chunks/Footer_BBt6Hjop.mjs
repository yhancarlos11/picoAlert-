import { c as createComponent, a as createAstro, b as renderTemplate, d as renderSlot, f as renderScript, h as renderHead, e as addAttribute, m as maybeRenderHead } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import 'clsx';
import 'flowbite';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    title = "PicoAlert+ - Tu Aliado contra el Pico y Placa",
    description = "Mantente informado y evita multas. Recibe notificaciones en tiempo real sobre las restricciones de Pico y Placa en Bogot\xE1.",
    keywords = "pico y placa, Bogot\xE1, notificaciones, veh\xEDculos, restricciones, movilidad, PicoAlert+",
    ogTitle = title,
    ogDescription = description,
    ogImage = "/images/og-image.jpg",
    twitterTitle = title,
    twitterDescription = description,
    twitterImage = "/images/twitter-image.jpg"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', '><meta name="keywords"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- Estilos globales --><link rel="stylesheet" href="/styles/global.css"><!-- Slot para estilos adicionales espec\xEDficos de cada layout -->', "", '</head> <body class="min-h-screen bg-gray-50 dark:bg-gray-900"> <!-- Contenido principal --> ', " <!-- Scripts comunes --> <script>\n      // Inicializar Flowbite (ya importado v\xEDa npm en package.json)\n      document.addEventListener('DOMContentLoaded', function() {\n        // Flowbite ya est\xE1 disponible globalmente a trav\xE9s de la instalaci\xF3n npm\n      });\n    <\/script> <!-- Script para manejar el tema oscuro/claro --> ", " <!-- Slot para scripts adicionales espec\xEDficos de cada layout --> ", " </body></html>"])), title, addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(Astro2.url, "content"), addAttribute(ogTitle, "content"), addAttribute(ogDescription, "content"), addAttribute(ogImage, "content"), addAttribute(Astro2.url, "content"), addAttribute(twitterTitle, "content"), addAttribute(twitterDescription, "content"), addAttribute(twitterImage, "content"), renderSlot($$result, $$slots["head"]), renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "D:/Github/picolalert/src/layout/base.astro?astro&type=script&index=0&lang.ts"), renderSlot($$result, $$slots["scripts"]));
}, "D:/Github/picolalert/src/layout/base.astro", void 0);

const $$Astro = createAstro();
const $$LogoutButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LogoutButton;
  const {
    variant = "navbar",
    class: className = ""
  } = Astro2.props;
  let buttonClasses = "";
  if (variant === "navbar") {
    buttonClasses = "text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 shadow-md cursor-pointer";
  } else if (variant === "sidebar") {
    buttonClasses = "w-full flex items-center hover:bg-red-700 p-2 rounded bg-red-600 text-white";
  }
  const finalClasses = className ? `${buttonClasses} ${className}` : buttonClasses;
  const buttonId = variant === "navbar" ? "navbar-logout-btn" : "sidebar-logout-btn";
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(buttonId, "id")}${addAttribute(finalClasses, "class")}> ${variant === "sidebar" && renderTemplate`<span class="mr-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path> </svg> </span>`} <span>Cerrar Sesión</span> </button> ${renderScript($$result, "D:/Github/picolalert/src/components/LogoutButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Github/picolalert/src/components/LogoutButton.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8"> <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8"> <div class="md:flex md:justify-between"> <div class="mb-6 md:mb-0"> <a href="/" class="flex items-center"> <img src="/logo/logo.png" class="h-8 mr-3" alt="PicoAlert Logo"> <span class="self-center text-2xl font-semibold whitespace-nowrap text-primary-500 dark:text-white">PicoAlert+</span> </a> <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
Tu aliado contra el Pico y Placa en Bogotá.
</p> </div> <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3"> <div> <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Recursos</h2> <ul class="text-gray-600 dark:text-gray-400 font-medium"> <li class="mb-4"> <a href="/pico-y-placa" class="hover:underline">Pico y Placa</a> </li> <li> <a href="/faq" class="hover:underline">Preguntas Frecuentes</a> </li> </ul> </div> <div> <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2> <ul class="text-gray-600 dark:text-gray-400 font-medium"> <li> <a href="/terms-and-conditions" class="hover:underline">Términos y Condiciones</a> </li> </ul> </div> </div> </div> <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"> <div class="sm:flex sm:items-center sm:justify-between"> <span class="text-sm text-gray-600 dark:text-gray-400 sm:text-center">
© ${currentYear} <a href="/" class="hover:underline">PicoAlert+</a>. Todos los derechos reservados.
</span> <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0"> <span class="text-sm text-gray-600 dark:text-gray-400">
Hecho con <span class="text-red-500">❤️</span> por especialistas tech
</span> </div> </div> </div> </footer>`;
}, "D:/Github/picolalert/src/components/Footer.astro", void 0);

export { $$Base as $, $$Footer as a, $$LogoutButton as b };
