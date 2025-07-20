/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_BMm60huL.mjs';
export { renderers } from '../../renderers.mjs';

const $$PicoYPlacaDetails = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <div class="mx-auto max-w-screen-sm"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Pico y Placa para el 15 de Julio</h2> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">El pico y placa para el 15 de Julio es para placas terminadas en 1 y 2.</p> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">El horario del pico y placa es de 6:00 AM a 8:00 PM.</p> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">El pico y placa aplica para vehículos particulares y taxis.</p> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/user/pico-y-placa-details.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/pico-y-placa-details.astro";
const $$url = "/user/pico-y-placa-details";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PicoYPlacaDetails,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
