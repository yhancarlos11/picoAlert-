/* empty css                                                 */
import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, b as renderTemplate, r as renderComponent } from '../../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Admin } from '../../chunks/admin_BPiIbv-A.mjs';
import { e as getUsers } from '../../chunks/api_oxAjwbqA.mjs';
import 'clsx';
export { r as renderers } from '../../chunks/_@astro-renderers_BbfvC7Tx.mjs';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { text, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-secondary-500 rounded-lg hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 dark:focus:ring-secondary-700 shadow-md cursor-pointer"> ${text} </a>`;
}, "D:/Github/picolalert/src/components/Button.astro", void 0);

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const users = await getUsers();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$Admin, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Usuarios Registrados</h2> <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> ${users.map((user) => renderTemplate`<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"> <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${user.Nombre}</h3> <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${user.Correo}</p> ${renderComponent($$result2, "Button", $$Button, { "text": "Ver m\xE1s", "url": `/admin/user/${user.id}` })} </div>`)} </div> </div> </section> ` })}`;
}, "D:/Github/picolalert/src/pages/admin/users.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
