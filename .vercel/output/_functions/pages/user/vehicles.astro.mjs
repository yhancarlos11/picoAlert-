/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_D6PDzdHV.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_D4k2RuTt.mjs';
import { b as getVehiculos } from '../../chunks/api_oxAjwbqA.mjs';
import { getEstadoPicoYPlaca } from '../../chunks/pico-y-placa_O2HSrEV5.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BbfvC7Tx.mjs';

const $$Vehicles = createComponent(async ($$result, $$props, $$slots) => {
  const vehiculos = await getVehiculos();
  const vehiculosConEstado = await Promise.all(
    vehiculos.map(async (vehiculo) => {
      let estadoPicoYPlaca = { puedeCircular: null, mensaje: "Verificar estado" };
      if (vehiculo.Placa) {
        try {
          const resultado = await getEstadoPicoYPlaca(vehiculo.Placa);
          estadoPicoYPlaca = {
            puedeCircular: resultado.estado === "PERMITIDO" ? true : resultado.estado === "RESTRINGIDO" ? false : null,
            mensaje: resultado.mensaje
            // Remove color property since it's not defined in the type
            // Remove detalles property since it's not defined in the type interface
          };
        } catch (error) {
          console.error(`Error al obtener estado de pico y placa para ${vehiculo.Placa}:`, error);
        }
      }
      return { ...vehiculo, estadoPicoYPlaca };
    })
  );
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, { "title": "Mis Veh\xEDculos - PicoAlert+", "description": "Gestiona tus veh\xEDculos registrados en PicoAlert+." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Mis Veh\xEDculos", "description": "Gestiona tus veh\xEDculos registrados", "backUrl": "/user/dashboard", "backText": "Volver al Dashboard", "actionUrl": "/user/register-vehicle", "actionText": "Agregar Veh\xEDculo", "actionIcon": "plus" })} <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6"> ${vehiculosConEstado.length > 0 ? vehiculosConEstado.map((vehiculo) => {
    const puedeCircular = vehiculo.estadoPicoYPlaca?.puedeCircular;
    const statusClass = puedeCircular === true ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : puedeCircular === false ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    const tipoClass = vehiculo.Tipo?.toLowerCase().includes("carro") ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : vehiculo.Tipo?.toLowerCase() === "moto" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    return renderTemplate`<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 relative"> <a${addAttribute(`/user/vehicle-details/${vehiculo.id}`, "href")} class="absolute inset-0 z-10"${addAttribute(`Ver detalles de veh\xEDculo ${vehiculo.Placa?.toUpperCase() || "Sin placa"}`, "aria-label")}></a> <div class="flex justify-between items-start mb-4"> <h3 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${vehiculo.Placa?.toUpperCase() || "Sin placa"}</h3> <span${addAttribute(`px-2 py-1 text-xs font-medium rounded-full ${statusClass} relative z-20`, "class")}> ${puedeCircular === true ? "Puede circular" : puedeCircular === false ? "No puede circular" : "Verificar estado"} </span> </div> <div class="mb-4 flex items-center"> <img${addAttribute(`/img_tipo_vehiculo/${vehiculo.Tipo === "Automovil" ? "automovil" : vehiculo.Tipo}.jpg`, "src")}${addAttribute(`Imagen de ${vehiculo.Tipo}`, "alt")} class="w-10 h-10 object-cover rounded-full mr-2 shadow-sm relative z-20" onerror="this.src='/img_tipo_vehiculo/automovil.jpg'; this.onerror=null;"> <span${addAttribute(`px-2 py-1 text-xs font-medium rounded-full ${tipoClass} relative z-20`, "class")}> ${vehiculo.Tipo ? vehiculo.Tipo.replace("_", " ") : "No especificado"} </span> </div> ${vehiculo.Modelo && renderTemplate`<p class="mb-3 text-sm text-gray-600 dark:text-gray-400">Modelo: ${vehiculo.Modelo}</p>`} <div class="flex justify-end mt-4"> <span class="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 flex items-center relative z-20 pointer-events-none">
Ver detalles
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </span> </div> </div>`;
  }) : renderTemplate`<div class="col-span-full p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center"> <p class="text-gray-500 dark:text-gray-400 mb-4">No tienes vehículos registrados aún.</p> <a href="/user/register-vehicle" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Registrar mi primer vehículo
</a> </div>`} </div> </div> </section> ` })}`;
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
