/* empty css                                                 */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$User } from '../../chunks/user_BMm60huL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Calendar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Calendar;
  const { month: monthParam, year: yearParam } = Astro2.url.searchParams;
  const today = /* @__PURE__ */ new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const currentMonth = monthParam ? parseInt(monthParam) - 1 : today.getMonth();
  const currentYear = yearParam ? parseInt(yearParam) : today.getFullYear();
  const currentDate = currentMonth === todayMonth && currentYear === todayYear ? todayDate : null;
  const prevMonthJS = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonth = prevMonthJS + 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextMonthJS = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonth = nextMonthJS + 1;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const calendar = [];
  let day = 1;
  let weekRow = [];
  for (let i = 0; i < firstDayAdjusted; i++) {
    weekRow.push(null);
  }
  while (day <= daysInMonth) {
    if (weekRow.length === 7) {
      calendar.push([...weekRow]);
      weekRow = [];
    }
    weekRow.push(day);
    day++;
  }
  while (weekRow.length < 7) {
    weekRow.push(null);
  }
  if (weekRow.length > 0) {
    calendar.push([...weekRow]);
  }
  return renderTemplate`${renderComponent($$result, "UserLayout", $$User, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Calendario de Pico y Placa</h2> <div class="flex justify-between items-center mb-6"> <a${addAttribute(`/user/calendar?month=${prevMonth}&year=${prevMonthYear}`, "href")} class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg">
&larr; Mes anterior
</a> <h3 class="text-2xl font-bold text-gray-700 dark:text-gray-300">${monthNames[currentMonth]} ${currentYear}</h3> <a${addAttribute(`/user/calendar?month=${nextMonth}&year=${nextMonthYear}`, "href")} class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg">
Mes siguiente &rarr;
</a> </div> <a href="/user/calendar" class="inline-block mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
Volver al mes actual
</a> <div class="relative overflow-x-auto shadow-md sm:rounded-lg"> <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"> <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> <tr> <th scope="col" class="px-6 py-3">Lun</th> <th scope="col" class="px-6 py-3">Mar</th> <th scope="col" class="px-6 py-3">Mié</th> <th scope="col" class="px-6 py-3">Jue</th> <th scope="col" class="px-6 py-3">Vie</th> <th scope="col" class="px-6 py-3">Sáb</th> <th scope="col" class="px-6 py-3">Dom</th> </tr> </thead> <tbody> ${calendar.map((week) => renderTemplate`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"> ${week.map((day2) => renderTemplate`<td${addAttribute(`px-6 py-4 ${day2 === currentDate ? "font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300" : ""} ${day2 === null ? "text-gray-300 dark:text-gray-600" : ""}`, "class")}> ${day2 !== null ? day2 : ""} </td>`)} </tr>`)} </tbody> </table> </div> <div class="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg"> <p class="text-gray-700 dark:text-gray-300"> <span class="font-bold">Nota:</span> El día actual está resaltado en azul. Recuerda que las restricciones de Pico y Placa aplican de lunes a viernes.
</p> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/user/calendar.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/user/calendar.astro";
const $$url = "/user/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendar,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
