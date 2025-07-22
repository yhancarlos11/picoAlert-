import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, b as renderTemplate } from './astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$PicoPlacaStatus = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PicoPlacaStatus;
  const {
    placa,
    tipoVehiculoExento = false,
    showDetails = false
  } = Astro2.props;
  let estadoPicoYPlaca = {
    estado: "CARGANDO",
    color: "gray",
    mensaje: "Cargando estado de pico y placa...",
    detalles: {}
  };
  try {
    if (placa && placa.length >= 5) {
      const placaUpperCase = placa.toUpperCase();
      const fechaActual = /* @__PURE__ */ new Date();
      const { getEstadoPicoYPlaca: getEstado } = await import('./pico-y-placa_O2HSrEV5.mjs');
      estadoPicoYPlaca = await getEstado(placaUpperCase, tipoVehiculoExento, fechaActual);
      console.log("Estado pico y placa calculado con fecha actual:", estadoPicoYPlaca);
    } else {
      estadoPicoYPlaca = {
        estado: "ERROR",
        color: "yellow",
        mensaje: "Placa inv\xE1lida",
        detalles: { placa }
      };
    }
  } catch (error) {
    console.error("Error al obtener estado de pico y placa:", error);
    estadoPicoYPlaca = {
      estado: "ERROR",
      color: "yellow",
      mensaje: "Error al verificar el estado",
      detalles: { error: error instanceof Error ? error.message : String(error) }
    };
  }
  let statusClasses = "";
  let iconName = "";
  switch (estadoPicoYPlaca.color) {
    case "green":
      statusClasses = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      iconName = "check-circle";
      break;
    case "red":
      statusClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      iconName = "x-circle";
      break;
    case "yellow":
      statusClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      iconName = "alert-triangle";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      iconName = "clock";
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`pico-placa-status rounded-lg p-4 ${statusClasses}`, "class")}> <div class="flex items-center"> <div class="flex-shrink-0"> ${iconName === "check-circle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} ${iconName === "x-circle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} ${iconName === "alert-triangle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg>`} ${iconName === "clock" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} </div> <div class="ml-3"> <h3 class="text-lg font-medium">${estadoPicoYPlaca.estado}</h3> <div class="mt-1 text-sm"> <p>${estadoPicoYPlaca.mensaje}</p> </div> </div> </div> ${showDetails && renderTemplate`<div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"> <div class="text-sm"> <p><strong>Placa:</strong> ${estadoPicoYPlaca.detalles.placa}</p> <p><strong>Fecha:</strong> ${estadoPicoYPlaca.detalles.fecha ? new Date(estadoPicoYPlaca.detalles.fecha).toLocaleString() : "No disponible"}</p> ${estadoPicoYPlaca.detalles.reglaAplicada && renderTemplate`<div class="mt-2"> <p><strong>Regla aplicada:</strong></p> <div class="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded"> <p class="text-sm mb-2"> <span class="font-medium">Tipo de restricción:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.tipo} </p> <p class="text-sm mb-2"> <span class="font-medium">Dígitos restringidos:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.Ultimo_Digito.join(", ")} </p> <p class="text-sm"> <span class="font-medium">Aplicable en:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.id === 1 ? "D\xEDas impares" : "D\xEDas pares"} </p> </div> </div>`} </div> </div>`} </div>`;
}, "D:/Github/picolalert/src/components/PicoPlacaStatus.astro", void 0);

export { $$PicoPlacaStatus as $ };
