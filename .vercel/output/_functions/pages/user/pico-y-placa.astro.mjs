/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_D6PDzdHV.mjs';
import { b as getVehiculos, g as getReglasPicoYPlaca } from '../../chunks/api_oxAjwbqA.mjs';
import { getEstadoPicoYPlaca } from '../../chunks/pico-y-placa_O2HSrEV5.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BbfvC7Tx.mjs';

const $$PicoYPlaca = createComponent(async ($$result, $$props, $$slots) => {
  const vehiculos = await getVehiculos();
  const vehiculoUsuario = vehiculos.length > 0 ? vehiculos[0] : null;
  const fechaActual = /* @__PURE__ */ new Date();
  const fechaFormateada = fechaActual.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const diaEsPar = fechaActual.getDate() % 2 === 0;
  const reglas = await getReglasPicoYPlaca();
  const digitosRestringidos = diaEsPar ? reglas.item2 : reglas.item1;
  const digitosRestringidosTexto = digitosRestringidos.join(", ");
  let estadoPicoYPlaca = null;
  if (vehiculoUsuario && vehiculoUsuario.Placa) {
    estadoPicoYPlaca = await getEstadoPicoYPlaca(vehiculoUsuario.Placa);
  }
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <div class="mx-auto max-w-screen-sm text-center"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Pico y Placa para ${fechaFormateada}</h2> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">El pico y placa para hoy es para placas terminadas en ${digitosRestringidosTexto}.</p> <div class="p-4 bg-gray-100 rounded-lg dark:bg-gray-800"> <dl class="grid grid-cols-2 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8"> ${digitosRestringidos.map((digito) => renderTemplate`<div class="flex flex-col items-center justify-center"> <dt class="mb-2 text-3xl font-extrabold">${digito}</dt> <dd class="font-light text-gray-500 dark:text-gray-400">Placa</dd> </div>`)} </dl> </div> ${estadoPicoYPlaca && renderTemplate`<div${addAttribute(`mt-6 mb-6 p-4 rounded-lg ${estadoPicoYPlaca.color === "green" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, "class")}> <p class="font-medium text-lg">${estadoPicoYPlaca.estado}</p> <p class="font-light">${estadoPicoYPlaca.mensaje}</p> </div>`} <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Horario de restricción: 6:00 AM - 9:00 PM</p> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">El pico y placa aplica para vehículos particulares y taxis.</p> <a href="/user/dashboard" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Entendido</a> </div> </div> </section> ` })}`;
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
