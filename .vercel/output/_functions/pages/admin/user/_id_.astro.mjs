/* empty css                                                    */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Admin } from '../../../chunks/admin_DnQmx-sP.mjs';
import { a as getUser } from '../../../chunks/api_DnlhPW6k.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const user = await getUser(id);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$Admin, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"> <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${user.Nombre}</h2> <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Email:</strong> ${user.Correo}</p> <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Teléfono:</strong> ${user.Telefono}</p> </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/admin/user/[id].astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/admin/user/[id].astro";
const $$url = "/admin/user/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
