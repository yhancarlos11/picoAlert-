import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_nnHBjsJb.mjs';
import { manifest } from './manifest_CTswwRvd.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/pico-y-placa-rules.astro.mjs');
const _page2 = () => import('./pages/admin/user/_id_.astro.mjs');
const _page3 = () => import('./pages/admin/users.astro.mjs');
const _page4 = () => import('./pages/api/pico-y-placa.astro.mjs');
const _page5 = () => import('./pages/api/register.astro.mjs');
const _page6 = () => import('./pages/faq.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/pico-y-placa.astro.mjs');
const _page9 = () => import('./pages/register-user.astro.mjs');
const _page10 = () => import('./pages/terms-and-conditions.astro.mjs');
const _page11 = () => import('./pages/user/calendar.astro.mjs');
const _page12 = () => import('./pages/user/dashboard.astro.mjs');
const _page13 = () => import('./pages/user/movility-suggestion.astro.mjs');
const _page14 = () => import('./pages/user/notifications.astro.mjs');
const _page15 = () => import('./pages/user/pico-y-placa.astro.mjs');
const _page16 = () => import('./pages/user/pico-y-placa-details.astro.mjs');
const _page17 = () => import('./pages/user/register-vehicle.astro.mjs');
const _page18 = () => import('./pages/user/vehicles.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/pico-y-placa-rules.astro", _page1],
    ["src/pages/admin/user/[id].astro", _page2],
    ["src/pages/admin/users.astro", _page3],
    ["src/pages/api/pico-y-placa.js", _page4],
    ["src/pages/api/register.js", _page5],
    ["src/pages/faq.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/pico-y-placa.astro", _page8],
    ["src/pages/register-user.astro", _page9],
    ["src/pages/terms-and-conditions.astro", _page10],
    ["src/pages/user/calendar.astro", _page11],
    ["src/pages/user/dashboard.astro", _page12],
    ["src/pages/user/movility-suggestion.astro", _page13],
    ["src/pages/user/notifications.astro", _page14],
    ["src/pages/user/pico-y-placa.astro", _page15],
    ["src/pages/user/pico-y-placa-details.astro", _page16],
    ["src/pages/user/register-vehicle.astro", _page17],
    ["src/pages/user/vehicles.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4a53108b-697a-4bd1-999c-ab7f808fcfb3",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
