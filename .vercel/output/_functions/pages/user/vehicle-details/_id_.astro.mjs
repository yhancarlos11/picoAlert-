/* empty css                                                    */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, g as defineScriptVars, e as addAttribute, m as maybeRenderHead } from '../../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../../chunks/user_D6PDzdHV.mjs';
import { $ as $$PageHeader } from '../../../chunks/PageHeader_D4k2RuTt.mjs';
import { $ as $$PicoPlacaStatus } from '../../../chunks/PicoPlacaStatus_DO5tGNXh.mjs';
import { d as getVehiculoById } from '../../../chunks/api_oxAjwbqA.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BbfvC7Tx.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let vehiculo = null;
  let error = null;
  try {
    if (id) {
      vehiculo = await getVehiculoById(id);
    } else {
      error = "ID de veh\xEDculo no proporcionado";
    }
    if (!vehiculo) {
      error = "Veh\xEDculo no encontrado";
    }
  } catch (e) {
    console.error("Error al obtener detalles del veh\xEDculo:", e);
    error = "Error al cargar los detalles del veh\xEDculo";
  }
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, { "title": "Detalles del Veh\xEDculo - PicoAlert+", "description": "Detalles y estado de Pico y Placa de tu veh\xEDculo registrado." }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16"> <!-- Header utilizando el componente PageHeader --> ', " ", " ", " </div> </section> <script>(function(){", "\n    // Script para manejar la edici\xF3n del veh\xEDculo\n    document.addEventListener('DOMContentLoaded', function() {\n      const editButton = document.getElementById('edit-vehicle');\n      if (editButton) {\n        editButton.addEventListener('click', function() {\n          // Por ahora, simplemente mostrar una alerta\n          alert('Funcionalidad de edici\xF3n en desarrollo');\n          // En una implementaci\xF3n futura, redirigir a la p\xE1gina de edici\xF3n\n          // window.location.href = `/user/edit-vehicle/${vehiculoId}`;\n        });\n      }\n    });\n  })();<\/script> "], [" ", '<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16"> <!-- Header utilizando el componente PageHeader --> ', " ", " ", " </div> </section> <script>(function(){", "\n    // Script para manejar la edici\xF3n del veh\xEDculo\n    document.addEventListener('DOMContentLoaded', function() {\n      const editButton = document.getElementById('edit-vehicle');\n      if (editButton) {\n        editButton.addEventListener('click', function() {\n          // Por ahora, simplemente mostrar una alerta\n          alert('Funcionalidad de edici\xF3n en desarrollo');\n          // En una implementaci\xF3n futura, redirigir a la p\xE1gina de edici\xF3n\n          // window.location.href = \\`/user/edit-vehicle/\\${vehiculoId}\\`;\n        });\n      }\n    });\n  })();<\/script> "])), maybeRenderHead(), renderComponent($$result2, "PageHeader", $$PageHeader, { "title": vehiculo ? `Veh\xEDculo: ${vehiculo.Placa?.toUpperCase() || "Sin placa"}` : "Detalles del Veh\xEDculo", "description": vehiculo ? `Informaci\xF3n detallada y estado de Pico y Placa` : error || void 0, "backUrl": "/user/dashboard", "backText": "Volver al Dashboard" }), error && renderTemplate`<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"> <span class="font-medium">Error:</span> ${error} </div>`, vehiculo && renderTemplate`<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mt-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Información básica del vehículo --> <div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información del Vehículo</h3> <!-- Imagen del tipo de vehículo --> ${vehiculo.Tipo && renderTemplate`<div class="mb-4 flex justify-center"> <img${addAttribute(`/img_tipo_vehiculo/${vehiculo.Tipo === "Automovil" ? "automovil" : vehiculo.Tipo}.jpg`, "src")}${addAttribute(`Imagen de ${vehiculo.Tipo}`, "alt")} class="w-32 h-32 object-cover rounded-lg shadow-sm" onerror="this.src='/img_tipo_vehiculo/automovil.jpg'; this.onerror=null;"> </div>`} <div class="space-y-4"> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Placa</p> <p class="text-lg font-medium text-gray-900 dark:text-white">${vehiculo.Placa?.toUpperCase() || "No disponible"}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Tipo</p> <p class="text-lg font-medium text-gray-900 dark:text-white"> <span class="px-2 py-1 text-xs font-medium rounded-full inline-block mr-2 
                      \${(vehiculo as Vehiculo).Tipo?.toLowerCase().includes('carro') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      (vehiculo as Vehiculo).Tipo?.toLowerCase() === 'moto' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}
                    "> ${vehiculo.Tipo?.replace("_", " ") || "No especificado"} </span> </p> </div>  <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"> <p class="text-sm text-gray-600 dark:text-gray-400"> <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Para ver información adicional como modelo y color, contacta al administrador para actualizar los permisos de acceso.
</p> </div> </div> </div> <!-- Estado de Pico y Placa --> <div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Estado de Pico y Placa</h3> <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"> ${vehiculo.Placa ? renderTemplate`${renderComponent($$result2, "PicoPlacaStatus", $$PicoPlacaStatus, { "placa": vehiculo.Placa || "", "tipoVehiculoExento": false, "showDetails": true })}` : renderTemplate`<p class="text-gray-500 dark:text-gray-400">No se puede determinar el estado de Pico y Placa sin una placa válida.</p>`} </div> <div class="mt-6"> <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recordatorios</h4> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
Recibirás notificaciones sobre el estado de Pico y Placa de este vehículo.
</p> <p class="text-sm text-gray-600 dark:text-gray-400">
Puedes configurar tus preferencias de notificación en la sección de configuración.
</p> </div> </div> </div> <!-- Acciones --> <div class="flex justify-end mt-6 space-x-4"> <a href="/user/vehicles" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
Volver a Mis Vehículos
</a> <button id="edit-vehicle" class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
Editar Vehículo
</button> </div> </div>`, defineScriptVars({ vehiculoId: id })) })}`;
}, "D:/Github/picolalert/src/pages/user/vehicle-details/[id].astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/vehicle-details/[id].astro";
const $$url = "/user/vehicle-details/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
