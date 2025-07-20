/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Admin } from '../../chunks/admin_DnQmx-sP.mjs';
import { g as getReglasPicoYPlaca } from '../../chunks/api_DnlhPW6k.mjs';
export { renderers } from '../../renderers.mjs';

const $$PicoYPlacaRules = createComponent(async ($$result, $$props, $$slots) => {
  const reglas = await getReglasPicoYPlaca();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$Admin, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Gestión de Reglas de Pico y Placa</h2> <div class="relative overflow-x-auto shadow-md sm:rounded-lg"> <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"> <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> <tr> <th scope="col" class="px-6 py-3">ID</th> <th scope="col" class="px-6 py-3">Día</th> <th scope="col" class="px-6 py-3">Restricción</th> <th scope="col" class="px-6 py-3">Horario</th> </tr> </thead> <tbody> ${reglas.length > 0 ? reglas.map((regla) => renderTemplate`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"> <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${regla.id}</th> <td class="px-6 py-4">${regla.Dia}</td> <td class="px-6 py-4">${regla.Restriccion}</td> <td class="px-6 py-4">${regla.Horario}</td> </tr>`) : renderTemplate`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"> <td colspan="4" class="px-6 py-4 text-center">No hay reglas de Pico y Placa registradas.</td> </tr>`} </tbody> </table> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/admin/pico-y-placa-rules.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/admin/pico-y-placa-rules.astro";
const $$url = "/admin/pico-y-placa-rules";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$PicoYPlacaRules,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
