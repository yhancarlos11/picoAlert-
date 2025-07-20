import { c as createComponent, a as createAstro, m as maybeRenderHead, r as renderComponent, e as addAttribute, f as renderScript, b as renderTemplate, d as renderSlot } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { b as $$LogoutButton, $ as $$Base, a as $$Footer } from './Footer_BBt6Hjop.mjs';

/**
 * Módulo de almacenamiento para gestionar la persistencia de datos entre sesiones
 * Proporciona una capa de abstracción sobre sessionStorage y localStorage
 */

// Verificar si estamos en el navegador (client-side) o en el servidor (server-side)
const isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

// Clave para almacenar los datos de autenticación
const AUTH_KEY = 'picoalert-auth-session';

/**
 * Obtiene datos de sessionStorage
 * @param {string} key - Clave para recuperar los datos
 * @returns {any|null} - Datos almacenados o null si no existen
 */
const getSessionData = (key) => {
  if (!isBrowser) return null;
  
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error al recuperar datos de sessionStorage:', error);
    return null;
  }
};

/**
 * Obtiene datos de autenticación de sessionStorage
 * @returns {Object|null} - Datos de autenticación o null si no existe sesión
 */
const getAuthSession = () => {
  return getSessionData(AUTH_KEY);
};

/**
 * Verifica si existe una sesión de autenticación activa
 * @returns {boolean} - true si existe sesión, false en caso contrario
 */
const hasAuthSession = () => {
  return getAuthSession() !== null;
};

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const isAuthenticated = hasAuthSession();
  isAuthenticated ? getAuthSession() : null;
  const { pathname } = Astro2.url;
  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  const getLinkClasses = (href) => {
    const baseClasses = "block py-2 pr-4 pl-3 rounded lg:p-0";
    const activeClasses = "text-white bg-primary-500 lg:bg-transparent lg:text-primary-500 dark:text-white";
    const inactiveClasses = "text-gray-900 border-b border-gray-200 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-500 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700";
    return isActive(href) ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
  };
  return renderTemplate`${maybeRenderHead()}<header> <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900"> <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"> <a href="/" class="flex items-center"> <img src="/logo/logo.png" class="mr-3 h-[26.4px] sm:h-[39.6px]" alt="Picolalert Logo"> <span class="self-center text-xl font-semibold whitespace-nowrap text-primary-500 dark:text-white">Picolalert</span> </a> <div class="flex items-center lg:order-2"> ${isAuthenticated ? renderTemplate`<div class="flex items-center"> <a href="/user/dashboard"${addAttribute(`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isActive("/user/dashboard") ? "text-white bg-primary-500 dark:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800" : "text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800"}`, "class")}>Dashboard</a> <a href="/user/vehicles"${addAttribute(`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isActive("/user/vehicles") ? "text-white bg-primary-500 dark:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800" : "text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800"}`, "class")}>Mis Vehículos</a> <a href="/admin/logs"${addAttribute(`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isActive("/admin/logs") ? "text-white bg-primary-500 dark:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800" : "text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800"}`, "class")}>Logs</a> ${renderComponent($$result, "LogoutButton", $$LogoutButton, { "variant": "navbar" })} </div>` : renderTemplate`<div class="flex items-center"> <a href="/login"${addAttribute(`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ${isActive("/login") ? "text-white bg-primary-500 dark:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800" : "text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800"}`, "class")}>Iniciar Sesión</a> <a href="/register-user"${addAttribute(`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 shadow-md cursor-pointer ${isActive("/register-user") ? "text-white bg-primary-500 dark:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800" : "text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800"}`, "class")}>Regístrate</a> </div>`} ${renderComponent($$result, "ThemeSwitcher", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "D:/Github/picolalert/src/components/ThemeSwitcher.svelte", "client:component-export": "default" })} <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false"> <span class="sr-only">Open main menu</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> </button> </div> <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2"> <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"> <li> <a href="/"${addAttribute(getLinkClasses("/"), "class")}${addAttribute(isActive("/") ? "page" : void 0, "aria-current")}>Home</a> </li> <li> <a href="/pico-y-placa"${addAttribute(getLinkClasses("/pico-y-placa"), "class")}${addAttribute(isActive("/pico-y-placa") ? "page" : void 0, "aria-current")}>Pico y Placa</a> </li> <li> <a href="/faq"${addAttribute(getLinkClasses("/faq"), "class")}${addAttribute(isActive("/faq") ? "page" : void 0, "aria-current")}>FAQ</a> </li> <li> <a href="/terms-and-conditions"${addAttribute(getLinkClasses("/terms-and-conditions"), "class")}${addAttribute(isActive("/terms-and-conditions") ? "page" : void 0, "aria-current")}>Términos y Condiciones</a> </li> </ul> </div> </div> </nav> </header> ${renderScript($$result, "D:/Github/picolalert/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Github/picolalert/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "PicoAlert+ - Notificaciones de Pico y Placa en Bogot\xE1",
    description = "Implementaci\xF3n de una API para notificaci\xF3n de pico y placa en Bogot\xE1. Registra tu veh\xEDculo y recibe alertas en tiempo real.",
    keywords = "pico y placa, Bogot\xE1, notificaciones, veh\xEDculos, restricciones, movilidad, API, PicoAlert+",
    ...restProps
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": title, "description": description, "keywords": keywords, "ogImage": Astro2.url.origin + "/Hero.jpg", "twitterImage": Astro2.url.origin + "/Hero.jpg", ...restProps }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Github/picolalert/src/layout/layout.astro", void 0);

export { $$Layout as $ };
