/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_BMm60huL.mjs';
import { b as getVehiculos } from '../../chunks/api_DnlhPW6k.mjs';
export { renderers } from '../../renderers.mjs';

const $$PicoYPlaca = createComponent(async ($$result, $$props, $$slots) => {
  const vehiculos = await getVehiculos();
  const vehiculoUsuario = vehiculos.length > 0 ? vehiculos[0] : null;
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <div class="mx-auto max-w-screen-sm text-center"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Pico y Placa</h2> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Hoy, 15 de Julio de 2024</p> ${vehiculoUsuario ? renderTemplate`<div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800 mb-6"> <h3 class="text-xl font-bold text-gray-900 dark:text-white">Tu Vehículo</h3> <p class="text-gray-700 dark:text-gray-400">Placa: ${vehiculoUsuario.Placa}</p> <p class="text-gray-700 dark:text-gray-400">Tipo: ${vehiculoUsuario.Tipo_Vehiculo}</p> <p class="text-gray-700 dark:text-gray-400">Combustible: ${vehiculoUsuario.Combustible}</p> </div>` : renderTemplate`<p class="text-gray-500 dark:text-gray-400 mb-6">No se encontró ningún vehículo registrado para mostrar.</p>`} <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"> <dl class="grid grid-cols-2 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8"> <div class="flex flex-col items-center justify-center"> <dt class="mb-2 text-3xl font-extrabold">1-2</dt> <dd class="font-light text-gray-500 dark:text-gray-400">Placa</dd> </div> </dl> </div> <p class="mt-6 mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Tu vehículo tiene restricción de pico y placa hoy.</p> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Horario de restricción: 6:00 AM - 8:30 AM y 3:00 PM - 7:30 PM</p> <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Entendido</a> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/user/pico-y-placa.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/pico-y-placa.astro";
const $$url = "/user/pico-y-placa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PicoYPlaca,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
