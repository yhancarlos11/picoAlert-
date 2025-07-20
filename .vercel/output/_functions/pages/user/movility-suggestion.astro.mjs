/* empty css                                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_BMm60huL.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_D4k2RuTt.mjs';
export { renderers } from '../../renderers.mjs';

const $$MovilitySuggestion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, { "title": "Movilidad Sostenible - PicoAlert+", "description": "Consejos y recursos para una movilidad sostenible en Bogot\xE1." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Movilidad Sostenible en Bogot\xE1", "description": "Descubre recomendaciones y recursos para moverte de forma eficiente y ecol\xF3gica en la ciudad." })} <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"> <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800 shadow-sm"> <h3 class="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Usa el transporte público</h3> <p class="text-gray-700 dark:text-gray-300 mb-4">
El sistema TransMilenio y SITP cubre gran parte de Bogotá. Planifica tu ruta y evita el tráfico y la contaminación.
</p> <a href="https://www.transmilenio.gov.co/" target="_blank" rel="noopener" class="text-green-700 hover:underline">Sitio oficial TransMilenio</a> </div> <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm"> <h3 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Movilidad activa</h3> <p class="text-gray-700 dark:text-gray-300 mb-4">
Camina o usa bicicleta para trayectos cortos. Bogotá cuenta con ciclovías y espacios peatonales seguros.
</p> <a href="https://www.movilidadbogota.gov.co/web/ciclovia" target="_blank" rel="noopener" class="text-blue-700 hover:underline">Mapa de Ciclovías</a> </div> <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-100 dark:border-yellow-800 shadow-sm"> <h3 class="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">Comparte tu vehículo</h3> <p class="text-gray-700 dark:text-gray-300 mb-4">
El carpooling reduce el número de autos en las vías y ayuda a disminuir la huella de carbono.
</p> <a href="https://www.blablacar.com.co/" target="_blank" rel="noopener" class="text-yellow-700 hover:underline">BlaBlaCar Colombia</a> </div> <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800 shadow-sm"> <h3 class="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2">Consulta el estado del tráfico</h3> <p class="text-gray-700 dark:text-gray-300 mb-4">
Antes de salir, revisa el estado de las vías y planea rutas alternativas para evitar congestiones.
</p> <a href="https://www.movilidadbogota.gov.co/web/estado_de_vias" target="_blank" rel="noopener" class="text-purple-700 hover:underline">Estado de vías Bogotá</a> </div> </div> <div class="mt-12 text-center"> <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">¿Sabías que...?</h4> <p class="text-gray-700 dark:text-gray-300 mb-4">
Usar medios sostenibles de transporte mejora la calidad del aire, reduce el estrés y contribuye a una ciudad más saludable.
</p> <a href="/user/dashboard" class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200">
Volver al Dashboard
</a> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/user/movility-suggestion.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/movility-suggestion.astro";
const $$url = "/user/movility-suggestion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MovilitySuggestion,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
