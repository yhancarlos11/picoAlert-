/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_BMm60huL.mjs';
import { b as getVehiculos } from '../../chunks/api_DnlhPW6k.mjs';
export { renderers } from '../../renderers.mjs';

const $$Vehicles = createComponent(async ($$result, $$props, $$slots) => {
  const vehiculos = await getVehiculos();
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Mis Vehículos</h2> <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> ${vehiculos.length > 0 ? vehiculos.map((vehiculo) => renderTemplate`<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"> <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Placa: ${vehiculo.Placa?.toUpperCase()}</h3> <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tipo: ${vehiculo.Tipo ? vehiculo.Tipo.replace("_", " ") : "No especificado"}</p> </div>`) : renderTemplate`<p class="text-gray-500 dark:text-gray-400">No tienes vehículos registrados aún.</p>`} </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/user/vehicles.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/vehicles.astro";
const $$url = "/user/vehicles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Vehicles,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
