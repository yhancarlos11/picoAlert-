import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Base, a as $$Footer } from './Footer_BBt6Hjop.mjs';
import { $ as $$Sidebar } from './Sidebar_CenvZ1bK.mjs';

const $$Astro = createAstro();
const $$User = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$User;
  const userLinks = [
    { href: "/user/dashboard", text: "Dashboard", icon: "Home" },
    { href: "/user/register-vehicle", text: "Registrar Veh\xEDculo", icon: "Car" },
    { href: "/user/vehicles", text: "Mis Veh\xEDculos", icon: "Car1" },
    { href: "/user/pico-y-placa", text: "Pico y Placa", icon: "Restriction" },
    { href: "/user/calendar", text: "Calendario", icon: "Calendar" },
    { href: "/user/movility-suggestion", text: "Movilidad Sostenible", icon: "Leaf" }
  ];
  const {
    title = "Panel de Usuario - PicoAlert+",
    description = "Panel de control para usuarios de PicoAlert+. Gestiona tus veh\xEDculos y notificaciones de Pico y Placa.",
    keywords = "panel usuario, dashboard, veh\xEDculos, notificaciones, pico y placa, PicoAlert+",
    ...restProps
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": title, "description": description, "keywords": keywords, ...restProps }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-white dark:bg-gray-900"> <div class="flex flex-1"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "title": "Panel de Usuario", "links": userLinks })} <main class="flex-1 p-6 overflow-y-auto md:ml-64"> ${renderSlot($$result2, $$slots["default"])} </main> </div> <div class="md:ml-64"> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> </div> ` })}`;
}, "D:/Github/picolalert/src/layout/user.astro", void 0);

export { $$User as $ };
