/* empty css                                              */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderScript } from '../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/layout_Ch4OXKww.mjs';
import { $ as $$StatusMessage } from '../chunks/StatusMessage_BeNY4QfS.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n - PicoAlert+", "description": "Inicia sesi\xF3n en PicoAlert+ como usuario o administrador.", "keywords": "login, iniciar sesi\xF3n, usuario, administrador, pico y placa" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> <div class="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
Iniciar Sesión en PicoAlert+
</h1> <!-- Mensajes de estado utilizando el componente StatusMessage --> ${renderComponent($$result2, "StatusMessage", $$StatusMessage, {})} <form id="login-form" class="space-y-4 md:space-y-6"> <div> <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label> <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="tu@email.com" required> </div> <div> <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required> </div> <div class="flex items-center justify-between"> <div class="flex items-start"> <div class="flex items-center h-5"> <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"> </div> <div class="ml-3 text-sm"> <label for="remember" class="text-gray-500 dark:text-gray-300">Recordarme</label> </div> </div> <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a> </div> <button type="submit" id="login-button" class="w-full text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 shadow-md cursor-pointer"> <span id="login-text">Iniciar Sesión</span> <span id="login-loading" class="hidden"> <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
Iniciando sesión...
</span> </button> <p class="text-sm font-light text-gray-500 dark:text-gray-400">
¿No tienes una cuenta? <a href="/register-user" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate aquí</a> </p> </form> </div> </div> </div> </section> ${renderScript($$result2, "D:/Github/picolalert/src/pages/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/Github/picolalert/src/pages/login.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
