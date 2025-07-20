import { c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate, e as addAttribute, u as unescapeHTML } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHeader;
  const {
    title,
    description = "",
    backUrl = "",
    backText = "Volver",
    actionUrl = "",
    actionText = "",
    actionIcon = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center justify-between mb-8"> <div> <h2 class="text-3xl font-bold text-gray-900 dark:text-white">${title}</h2> ${description && renderTemplate`<p class="mt-2 text-gray-600 dark:text-gray-400">${description}</p>`} </div> <div class="flex space-x-2"> ${backUrl && renderTemplate`<a${addAttribute(backUrl, "href")} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> ${backText} </a>`} ${actionUrl && actionText && renderTemplate`<a${addAttribute(actionUrl, "href")} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-secondary-500 rounded-lg hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 dark:focus:ring-secondary-700 shadow-md cursor-pointer"> ${actionIcon && renderTemplate`<span class="mr-2">${unescapeHTML(actionIcon)}</span>`} ${actionText} </a>`} </div> </div>`;
}, "D:/Github/picolalert/src/components/PageHeader.astro", void 0);

export { $$PageHeader as $ };
