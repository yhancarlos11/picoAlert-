/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderScript } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_D6PDzdHV.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_D4k2RuTt.mjs';
import { $ as $$StatusMessage } from '../../chunks/StatusMessage_BeNY4QfS.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BbfvC7Tx.mjs';

const $$RegisterVehicle = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, { "title": "Registrar Veh\xEDculo - PicoAlert+", "description": "Registra un nuevo veh\xEDculo en PicoAlert+ para recibir notificaciones de Pico y Placa." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16"> <!-- Header utilizando el componente PageHeader --> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Registrar Nuevo Veh\xEDculo", "description": "Agrega un veh\xEDculo para recibir notificaciones de Pico y Placa", "backUrl": "/user/dashboard", "backText": "Volver al Dashboard" })} <!-- Mensajes de estado utilizando el componente StatusMessage --> ${renderComponent($$result2, "StatusMessage", $$StatusMessage, {})} <!-- Formulario --> <form id="vehicle-form" class="space-y-6"> <div class="grid gap-6 sm:grid-cols-2"> <!-- Placa --> <div class="sm:col-span-2"> <label for="placa" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
Placa del Vehículo *
</label> <input type="text" id="placa" name="placa" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ej: ABC123" required maxlength="10" style="text-transform: uppercase;"> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Ingresa la placa sin espacios ni guiones</p> </div> <!-- Tipo de Vehículo --> <div class="sm:col-span-2"> <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
Tipo de Vehículo *
</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <select id="tipo" name="tipo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required> <option value="">Selecciona el tipo</option> <option value="Automovil">Automóvil</option> <option value="Motocarro">Motocarro</option> <option value="Cuatrimoto">Cuatrimoto</option> <option value="Campero">Campero</option> <option value="Camioneta">Camioneta</option> <option value="Microbus">Microbús</option> </select> </div> <div class="flex justify-center items-center"> <img id="vehicle-type-preview" src="/img_tipo_vehiculo/automovil.jpg" alt="Vista previa del tipo de vehículo" class="w-24 h-24 object-cover rounded-lg shadow-sm"> </div> </div> </div> </div> <!-- Botones --> <div class="flex items-center space-x-4"> <button type="submit" id="submit-btn" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> <svg id="submit-spinner" class="hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> <span id="submit-text">Registrar Vehículo</span> </button> <a href="/user/dashboard" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
Cancelar
</a> </div> </form> </div> </section> ${renderScript($$result2, "D:/Github/picolalert/src/pages/user/register-vehicle.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/Github/picolalert/src/pages/user/register-vehicle.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/register-vehicle.astro";
const $$url = "/user/register-vehicle";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$RegisterVehicle,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
