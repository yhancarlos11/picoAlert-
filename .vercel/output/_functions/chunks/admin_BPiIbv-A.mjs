import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Base, a as $$Footer } from './Footer_BBt6Hjop.mjs';
import { $ as $$Sidebar } from './Sidebar_CqEgEZdr.mjs';

const $$Astro = createAstro();
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const adminLinks = [
    { href: "/admin/users", text: "Lista de Usuarios", icon: "Users" },
    { href: "/admin/pico-y-placa-rules", text: "Gesti\xF3n de Pico y Placa", icon: "Settings" },
    { href: "/admin/logs", text: "Logs del Sistema", icon: "Document" }
  ];
  const {
    title = "Panel de Administrador - PicoAlert+",
    description = "Panel de administraci\xF3n para PicoAlert+. Gestiona usuarios y reglas de Pico y Placa.",
    keywords = "panel administrador, admin, usuarios, reglas, pico y placa, PicoAlert+",
    ...restProps
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": title, "description": description, "keywords": keywords, ...restProps }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-white dark:bg-gray-900"> <div class="flex flex-1"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "title": "Panel de Administrador", "links": adminLinks })} <main class="flex-1 p-6 overflow-y-auto md:ml-64"> ${renderSlot($$result2, $$slots["default"])} </main> </div> <div class="md:ml-64"> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> </div> ` })}`;
}, "D:/Github/picolalert/src/layout/admin.astro", void 0);

export { $$Admin as $ };
