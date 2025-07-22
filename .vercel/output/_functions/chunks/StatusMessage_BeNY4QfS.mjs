import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, f as renderScript, b as renderTemplate } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$StatusMessage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StatusMessage;
  const {
    id = "message-container",
    successId = "success-message",
    errorId = "error-message"
  } = Astro2.props;
  return renderTemplate`<!-- Mensajes de estado -->${maybeRenderHead()}<div${addAttribute(id, "id")} class="hidden mb-6"> <div${addAttribute(successId, "id")} class="hidden p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"> <div class="flex items-center"> <svg class="flex-shrink-0 w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span id="success-text"></span> </div> </div> <div${addAttribute(errorId, "id")} class="hidden p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"> <div class="flex items-center"> <svg class="flex-shrink-0 w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> <span id="error-text"></span> </div> </div> </div> ${renderScript($$result, "D:/Github/picolalert/src/components/StatusMessage.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Github/picolalert/src/components/StatusMessage.astro", void 0);

export { $$StatusMessage as $ };
