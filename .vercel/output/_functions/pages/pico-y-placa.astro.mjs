/* empty css                                              */
import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, b as renderTemplate, g as defineScriptVars, r as renderComponent } from '../chunks/astro/server_BJY87dAg.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/layout_Ch4OXKww.mjs';
import { g as getReglasPicoYPlaca, b as getVehiculos } from '../chunks/api_DnlhPW6k.mjs';
import 'clsx';
import { g as getEstadoPicoYPlaca } from '../chunks/pico-y-placa_B0kbKJND.mjs';
import { $ as $$StatusMessage } from '../chunks/StatusMessage_BeNY4QfS.mjs';
export { renderers } from '../renderers.mjs';

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
      estadoPicoYPlaca = await getEstadoPicoYPlaca(placaUpperCase, tipoVehiculoExento);
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
      detalles: { error: error.message }
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
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`pico-placa-status rounded-lg p-4 ${statusClasses}`, "class")}> <div class="flex items-center"> <div class="flex-shrink-0"> ${iconName === "check-circle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} ${iconName === "x-circle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} ${iconName === "alert-triangle" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg>`} ${iconName === "clock" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} </div> <div class="ml-3"> <h3 class="text-lg font-medium">${estadoPicoYPlaca.estado}</h3> <div class="mt-1 text-sm"> <p>${estadoPicoYPlaca.mensaje}</p> </div> </div> </div> ${showDetails && renderTemplate`<div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"> <div class="text-sm"> <p><strong>Placa:</strong> ${estadoPicoYPlaca.detalles.placa}</p> <p><strong>Fecha:</strong> ${new Date(estadoPicoYPlaca.detalles.fecha).toLocaleString()}</p> ${estadoPicoYPlaca.detalles.reglaAplicada && renderTemplate`<div class="mt-2"> <p><strong>Regla aplicada:</strong></p> <div class="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded"> <p class="text-sm mb-2"> <span class="font-medium">Tipo de restricción:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.tipo} </p> <p class="text-sm mb-2"> <span class="font-medium">Dígitos restringidos:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.Ultimo_Digito.join(", ")} </p> <p class="text-sm"> <span class="font-medium">Aplicable en:</span> ${estadoPicoYPlaca.detalles.reglaAplicada.id === 1 ? "D\xEDas impares" : "D\xEDas pares"} </p> </div> </div>`} </div> </div>`} </div>`;
}, "D:/Github/picolalert/src/components/PicoPlacaStatus.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$PicoYPlaca = createComponent(async ($$result, $$props, $$slots) => {
  const hoy = /* @__PURE__ */ new Date();
  const fechaFormateada = hoy.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const reglas = await getReglasPicoYPlaca();
  const esDiaImpar = hoy.getDate() % 2 !== 0;
  const digitosRestringidos = esDiaImpar ? reglas.item1.join(", ") : reglas.item2.join(", ");
  const esFindeSemana = hoy.getDay() === 0 || hoy.getDay() === 6;
  const vehiculos = await getVehiculos();
  vehiculos.length > 0 ? vehiculos[0] : null;
  const ejemplos = [
    { placa: "ABC123", tipoVehiculoExento: false, descripcion: "Veh\xEDculo particular" },
    { placa: "XYZ456", tipoVehiculoExento: false, descripcion: "Veh\xEDculo particular" },
    { placa: "DEF789", tipoVehiculoExento: true, descripcion: "Veh\xEDculo exento (ej. servicio p\xFAblico)" }
  ];
  [
    { fecha: /* @__PURE__ */ new Date(), descripcion: "Hoy" },
    { fecha: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 1)), descripcion: "Ma\xF1ana" },
    { fecha: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 2)), descripcion: "Pasado ma\xF1ana" }
  ];
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", `
  // Manejar el bot\xF3n de registro y contador de usuarios
  document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register-button');
    const userCountElement = document.getElementById('user-count');
    
    // Manejar el bot\xF3n de registro
    if (registerButton) {
      registerButton.addEventListener('click', (e) => {
        // Prevenir la navegaci\xF3n inmediata para mostrar un mensaje
        e.preventDefault();
        
        // Mostrar mensaje de informaci\xF3n
        if (typeof window.showSuccessMessage === 'function') {
          window.showSuccessMessage('Redirigiendo a la p\xE1gina de registro...');
        }
        
        // Redirigir despu\xE9s de un breve retraso para que el usuario vea el mensaje
        setTimeout(() => {
          window.location.href = '/register-user';
        }, 1000);
      });
    }
    
    // Simular contador de usuarios que aumenta gradualmente
    if (userCountElement) {
      // N\xFAmero base de usuarios (ficticio)
      const baseUsers = 1234;
      
      // Funci\xF3n para formatear n\xFAmeros con comas
      const formatNumber = (num) => {
        return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
      };
      
      // Actualizar contador cada cierto tiempo
      let currentUsers = baseUsers;
      userCountElement.textContent = \`\${formatNumber(currentUsers)} usuarios registrados\`;
      
      // Incrementar el contador aleatoriamente cada 30-60 segundos
      setInterval(() => {
        // Incremento aleatorio entre 1 y 3
        const increment = Math.floor(Math.random() * 3) + 1;
        currentUsers += increment;
        
        // Actualizar el texto con animaci\xF3n
        userCountElement.classList.add('text-secondary-500');
        userCountElement.textContent = \`\${formatNumber(currentUsers)} usuarios registrados\`;
        
        // Volver al color normal despu\xE9s de la animaci\xF3n
        setTimeout(() => {
          userCountElement.classList.remove('text-secondary-500');
        }, 1000);
      }, Math.random() * 30000 + 30000); // Entre 30 y 60 segundos
    }
  });
  
  // Funci\xF3n para verificar si un veh\xEDculo puede circular
  async function verificarPicoYPlaca(placa, tipoVehiculoExento = false) {
    try {
      const response = await fetch('/api/pico-y-placa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ placa, tipoVehiculoExento })
      });
      
      if (!response.ok) {
        throw new Error(\`Error HTTP: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al verificar pico y placa:', error);
      return {
        estado: 'ERROR',
        color: 'yellow',
        mensaje: \`Error: \${error.message}\`,
        detalles: {}
      };
    }
  }
  
  // Manejar el formulario de verificaci\xF3n
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verificar-form');
    const resultado = document.getElementById('resultado');
    
    if (form && resultado) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const placa = document.getElementById('placa').value.toUpperCase();
        const exento = document.getElementById('exento').checked;
        
        // Mostrar indicador de carga
        resultado.innerHTML = \`
          <div class="flex items-center justify-center py-4">
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-gray-600 dark:text-gray-400">Verificando...</span>
          </div>
        \`;
        resultado.classList.remove('hidden');
        
        try {
          // En un entorno real, esto llamar\xEDa a la API
          // Para esta demo, simulamos una respuesta
          setTimeout(async () => {
            // Aqu\xED normalmente llamar\xEDamos a verificarPicoYPlaca(placa, exento)
            // pero como no tenemos el endpoint, simulamos una respuesta
            
            // Obtener el \xFAltimo d\xEDgito de la placa
            const ultimoDigito = placa.slice(-1);
            
            // Obtener informaci\xF3n de la fecha actual
            const fecha = new Date();
            const diaSemana = fecha.getDay(); // 0=domingo, 6=s\xE1bado
            const dia = fecha.getDate();
            const diaEsPar = dia % 2 === 0;
            
            // Verificar si es fin de semana (s\xE1bado o domingo)
            let puedeCircular = true;
            let mensaje = '';
            let reglaAplicada = null;
            
            if ([0, 6].includes(diaSemana)) {
              // Fin de semana: sin restricci\xF3n
              puedeCircular = true;
              mensaje = 'Fin de semana: sin restricci\xF3n';
            } else if (exento) {
              // Veh\xEDculo exento
              puedeCircular = true;
              mensaje = 'Veh\xEDculo exento de restricci\xF3n';
            } else {
              // Obtener las reglas de pico y placa desde el endpoint (ya obtenidas al inicio de la p\xE1gina)
              // Aplicar reglas seg\xFAn si el d\xEDa es par o impar
              // D\xEDa par -> item2 (ID 2) -> d\xEDgitos obtenidos del endpoint
              // D\xEDa impar -> item1 (ID 1) -> d\xEDgitos obtenidos del endpoint
              const digitosRestringidos = diaEsPar ? reglas.item2 : reglas.item1;
              const estaRestringido = digitosRestringidos.includes(ultimoDigito);
              puedeCircular = !estaRestringido;
              
              reglaAplicada = {
                id: diaEsPar ? 2 : 1,  // ID 2 para d\xEDas pares, ID 1 para d\xEDas impares
                Ultimo_Digito: digitosRestringidos,
                tipo: 'Restricci\xF3n'
              };
              
              if (puedeCircular) {
                mensaje = \`Puede circular: placa terminada en \${ultimoDigito} no est\xE1 restringida en d\xEDa \${diaEsPar ? 'par' : 'impar'}\`;
              } else {
                mensaje = \`No puede circular: placa terminada en \${ultimoDigito} est\xE1 restringida en d\xEDa \${diaEsPar ? 'par' : 'impar'}\`;
              }
            }
            
            const estadoSimulado = {
              estado: puedeCircular ? 'PERMITIDO' : 'RESTRINGIDO',
              color: puedeCircular ? 'green' : 'red',
              mensaje: mensaje,
              detalles: {
                placa,
                fecha: fecha.toISOString(),
                tipoVehiculoExento: exento,
                reglaAplicada: reglaAplicada
              }
            };
            
            // Determinar las clases CSS seg\xFAn el estado
            let statusClasses = '';
            let iconHtml = '';
            
            switch (estadoSimulado.color) {
              case 'green':
                statusClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
                iconHtml = \`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\`;
                break;
              case 'red':
                statusClasses = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
                iconHtml = \`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\`;
                break;
              case 'yellow':
                statusClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
                iconHtml = \`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>\`;
                break;
              default:
                statusClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
                iconHtml = \`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\`;
            }
            
            // Mostrar el resultado
            resultado.innerHTML = \`
              <div class="\${statusClasses} rounded-lg p-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    \${iconHtml}
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium">\${estadoSimulado.estado}</h3>
                    <div class="mt-1 text-sm">
                      <p>\${estadoSimulado.mensaje}</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div class="text-sm">
                    <p><strong>Placa:</strong> \${estadoSimulado.detalles.placa}</p>
                    <p><strong>Fecha:</strong> \${new Date(estadoSimulado.detalles.fecha).toLocaleString()}</p>
                    \${estadoSimulado.detalles.reglaAplicada ? \`
                      <div class="mt-2">
                        <p><strong>Regla aplicada:</strong></p>
                        <div class="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <p class="text-sm mb-2">
                            <span class="font-medium">Tipo de restricci\xF3n:</span> \${estadoSimulado.detalles.reglaAplicada.tipo}
                          </p>
                          <p class="text-sm mb-2">
                            <span class="font-medium">D\xEDgitos restringidos:</span> \${estadoSimulado.detalles.reglaAplicada.Ultimo_Digito.join(', ')}
                          </p>
                          <p class="text-sm">
                            <span class="font-medium">Aplicable en:</span> \${estadoSimulado.detalles.reglaAplicada.Ultimo_Digito === reglas.item1 ? 'D\xEDas impares' : 'D\xEDas pares'}
                          </p>
                        </div>
                      </div>
                    \` : ''}
                  </div>
                </div>
              </div>
            \`;
          }, 1000);
        } catch (error) {
          console.error('Error:', error);
          resultado.innerHTML = \`
            <div class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-lg p-4">
              <p>Error: \${error.message}</p>
            </div>
          \`;
        }
      });
    }
  });
})();<\/script>`], ["", " <script>(function(){", `
  // Manejar el bot\xF3n de registro y contador de usuarios
  document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register-button');
    const userCountElement = document.getElementById('user-count');
    
    // Manejar el bot\xF3n de registro
    if (registerButton) {
      registerButton.addEventListener('click', (e) => {
        // Prevenir la navegaci\xF3n inmediata para mostrar un mensaje
        e.preventDefault();
        
        // Mostrar mensaje de informaci\xF3n
        if (typeof window.showSuccessMessage === 'function') {
          window.showSuccessMessage('Redirigiendo a la p\xE1gina de registro...');
        }
        
        // Redirigir despu\xE9s de un breve retraso para que el usuario vea el mensaje
        setTimeout(() => {
          window.location.href = '/register-user';
        }, 1000);
      });
    }
    
    // Simular contador de usuarios que aumenta gradualmente
    if (userCountElement) {
      // N\xFAmero base de usuarios (ficticio)
      const baseUsers = 1234;
      
      // Funci\xF3n para formatear n\xFAmeros con comas
      const formatNumber = (num) => {
        return num.toString().replace(/\\\\B(?=(\\\\d{3})+(?!\\\\d))/g, ",");
      };
      
      // Actualizar contador cada cierto tiempo
      let currentUsers = baseUsers;
      userCountElement.textContent = \\\`\\\${formatNumber(currentUsers)} usuarios registrados\\\`;
      
      // Incrementar el contador aleatoriamente cada 30-60 segundos
      setInterval(() => {
        // Incremento aleatorio entre 1 y 3
        const increment = Math.floor(Math.random() * 3) + 1;
        currentUsers += increment;
        
        // Actualizar el texto con animaci\xF3n
        userCountElement.classList.add('text-secondary-500');
        userCountElement.textContent = \\\`\\\${formatNumber(currentUsers)} usuarios registrados\\\`;
        
        // Volver al color normal despu\xE9s de la animaci\xF3n
        setTimeout(() => {
          userCountElement.classList.remove('text-secondary-500');
        }, 1000);
      }, Math.random() * 30000 + 30000); // Entre 30 y 60 segundos
    }
  });
  
  // Funci\xF3n para verificar si un veh\xEDculo puede circular
  async function verificarPicoYPlaca(placa, tipoVehiculoExento = false) {
    try {
      const response = await fetch('/api/pico-y-placa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ placa, tipoVehiculoExento })
      });
      
      if (!response.ok) {
        throw new Error(\\\`Error HTTP: \\\${response.status}\\\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al verificar pico y placa:', error);
      return {
        estado: 'ERROR',
        color: 'yellow',
        mensaje: \\\`Error: \\\${error.message}\\\`,
        detalles: {}
      };
    }
  }
  
  // Manejar el formulario de verificaci\xF3n
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('verificar-form');
    const resultado = document.getElementById('resultado');
    
    if (form && resultado) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const placa = document.getElementById('placa').value.toUpperCase();
        const exento = document.getElementById('exento').checked;
        
        // Mostrar indicador de carga
        resultado.innerHTML = \\\`
          <div class="flex items-center justify-center py-4">
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-gray-600 dark:text-gray-400">Verificando...</span>
          </div>
        \\\`;
        resultado.classList.remove('hidden');
        
        try {
          // En un entorno real, esto llamar\xEDa a la API
          // Para esta demo, simulamos una respuesta
          setTimeout(async () => {
            // Aqu\xED normalmente llamar\xEDamos a verificarPicoYPlaca(placa, exento)
            // pero como no tenemos el endpoint, simulamos una respuesta
            
            // Obtener el \xFAltimo d\xEDgito de la placa
            const ultimoDigito = placa.slice(-1);
            
            // Obtener informaci\xF3n de la fecha actual
            const fecha = new Date();
            const diaSemana = fecha.getDay(); // 0=domingo, 6=s\xE1bado
            const dia = fecha.getDate();
            const diaEsPar = dia % 2 === 0;
            
            // Verificar si es fin de semana (s\xE1bado o domingo)
            let puedeCircular = true;
            let mensaje = '';
            let reglaAplicada = null;
            
            if ([0, 6].includes(diaSemana)) {
              // Fin de semana: sin restricci\xF3n
              puedeCircular = true;
              mensaje = 'Fin de semana: sin restricci\xF3n';
            } else if (exento) {
              // Veh\xEDculo exento
              puedeCircular = true;
              mensaje = 'Veh\xEDculo exento de restricci\xF3n';
            } else {
              // Obtener las reglas de pico y placa desde el endpoint (ya obtenidas al inicio de la p\xE1gina)
              // Aplicar reglas seg\xFAn si el d\xEDa es par o impar
              // D\xEDa par -> item2 (ID 2) -> d\xEDgitos obtenidos del endpoint
              // D\xEDa impar -> item1 (ID 1) -> d\xEDgitos obtenidos del endpoint
              const digitosRestringidos = diaEsPar ? reglas.item2 : reglas.item1;
              const estaRestringido = digitosRestringidos.includes(ultimoDigito);
              puedeCircular = !estaRestringido;
              
              reglaAplicada = {
                id: diaEsPar ? 2 : 1,  // ID 2 para d\xEDas pares, ID 1 para d\xEDas impares
                Ultimo_Digito: digitosRestringidos,
                tipo: 'Restricci\xF3n'
              };
              
              if (puedeCircular) {
                mensaje = \\\`Puede circular: placa terminada en \\\${ultimoDigito} no est\xE1 restringida en d\xEDa \\\${diaEsPar ? 'par' : 'impar'}\\\`;
              } else {
                mensaje = \\\`No puede circular: placa terminada en \\\${ultimoDigito} est\xE1 restringida en d\xEDa \\\${diaEsPar ? 'par' : 'impar'}\\\`;
              }
            }
            
            const estadoSimulado = {
              estado: puedeCircular ? 'PERMITIDO' : 'RESTRINGIDO',
              color: puedeCircular ? 'green' : 'red',
              mensaje: mensaje,
              detalles: {
                placa,
                fecha: fecha.toISOString(),
                tipoVehiculoExento: exento,
                reglaAplicada: reglaAplicada
              }
            };
            
            // Determinar las clases CSS seg\xFAn el estado
            let statusClasses = '';
            let iconHtml = '';
            
            switch (estadoSimulado.color) {
              case 'green':
                statusClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
                iconHtml = \\\`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\\\`;
                break;
              case 'red':
                statusClasses = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
                iconHtml = \\\`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\\\`;
                break;
              case 'yellow':
                statusClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
                iconHtml = \\\`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>\\\`;
                break;
              default:
                statusClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
                iconHtml = \\\`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>\\\`;
            }
            
            // Mostrar el resultado
            resultado.innerHTML = \\\`
              <div class="\\\${statusClasses} rounded-lg p-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    \\\${iconHtml}
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium">\\\${estadoSimulado.estado}</h3>
                    <div class="mt-1 text-sm">
                      <p>\\\${estadoSimulado.mensaje}</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div class="text-sm">
                    <p><strong>Placa:</strong> \\\${estadoSimulado.detalles.placa}</p>
                    <p><strong>Fecha:</strong> \\\${new Date(estadoSimulado.detalles.fecha).toLocaleString()}</p>
                    \\\${estadoSimulado.detalles.reglaAplicada ? \\\`
                      <div class="mt-2">
                        <p><strong>Regla aplicada:</strong></p>
                        <div class="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <p class="text-sm mb-2">
                            <span class="font-medium">Tipo de restricci\xF3n:</span> \\\${estadoSimulado.detalles.reglaAplicada.tipo}
                          </p>
                          <p class="text-sm mb-2">
                            <span class="font-medium">D\xEDgitos restringidos:</span> \\\${estadoSimulado.detalles.reglaAplicada.Ultimo_Digito.join(', ')}
                          </p>
                          <p class="text-sm">
                            <span class="font-medium">Aplicable en:</span> \\\${estadoSimulado.detalles.reglaAplicada.Ultimo_Digito === reglas.item1 ? 'D\xEDas impares' : 'D\xEDas pares'}
                          </p>
                        </div>
                      </div>
                    \\\` : ''}
                  </div>
                </div>
              </div>
            \\\`;
          }, 1000);
        } catch (error) {
          console.error('Error:', error);
          resultado.innerHTML = \\\`
            <div class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-lg p-4">
              <p>Error: \\\${error.message}</p>
            </div>
          \\\`;
        }
      });
    }
  });
})();<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Pico y Placa Hoy - PicoAlert+", "description": "Consulta las restricciones de pico y placa para hoy en Bogot\xE1.", "keywords": "pico y placa, hoy, Bogot\xE1, restricciones, veh\xEDculos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white dark:bg-gray-900"> <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> <div class="mx-auto max-w-screen-md"> <h1 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white text-center">Pico y Placa Hoy</h1> <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg text-center">${fechaFormateada}</p> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"> <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Restricciones para hoy</h2> ${esFindeSemana ? renderTemplate`<div class="p-4 bg-green-100 text-green-800 rounded-lg dark:bg-green-800 dark:text-green-100 mb-4"> <p class="text-center text-lg font-medium">¡Hoy es fin de semana! No hay restricciones de Pico y Placa.</p> </div>` : renderTemplate`<div class="p-4 bg-yellow-100 text-yellow-800 rounded-lg dark:bg-yellow-800 dark:text-yellow-100 mb-4"> <p class="text-center text-lg font-medium">Hoy aplica restricción para placas terminadas en: <span class="font-bold">${digitosRestringidos}</span></p> <p class="text-center mt-2">Horario de restricción: 6:00 AM - 8:30 AM y 3:00 PM - 7:30 PM</p> </div>`} <div class="overflow-x-auto mt-6"> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> <thead class="bg-gray-50 dark:bg-gray-700"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo de día</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dígitos restringidos</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"> <tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Día par</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Lunes a viernes</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${reglas.item2.join(", ")}</td> </tr> <tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Día impar</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Lunes a viernes</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${reglas.item1.join(", ")}</td> </tr> <tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Fin de semana</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Sábado y domingo</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Sin restricción</td> </tr> </tbody> </table> </div> </div>  <!-- Componente para mostrar mensajes de estado --> ${renderComponent($$result2, "StatusMessage", $$StatusMessage, {})} <!-- Sección de invitación a registrarse --> <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg shadow-lg p-6 mb-8 border border-primary-100 dark:border-primary-800 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"> <div class="flex flex-col md:flex-row items-center justify-between gap-6"> <div class="flex-1"> <h2 class="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-3 flex items-center"> <svg class="w-6 h-6 mr-2 text-secondary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path> </svg>
¿Quieres recibir notificaciones de Pico y Placa?
</h2> <p class="text-primary-700 dark:text-primary-300 mb-4 text-lg">Regístrate gratis y recibe alertas personalizadas en tu dispositivo y correo electrónico cuando a tus vehículos les toque Pico y Placa.</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"> <div class="flex items-start"> <svg class="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-primary-700 dark:text-primary-300">Notificaciones personalizadas</span> </div> <div class="flex items-start"> <svg class="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-primary-700 dark:text-primary-300">Alertas con anticipación</span> </div> <div class="flex items-start"> <svg class="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-primary-700 dark:text-primary-300">Gestión de múltiples vehículos</span> </div> <div class="flex items-start"> <svg class="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-primary-700 dark:text-primary-300">Completamente gratis</span> </div> </div> </div> <div class="flex-shrink-0 flex flex-col items-center"> <a href="/register-user" id="register-button" class="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-white rounded-lg bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-300 dark:focus:ring-secondary-900 shadow-lg transition-all duration-300 w-full mb-3 relative overflow-hidden group"> <span class="relative z-10 flex items-center">
Registrarme Ahora
<svg class="w-4 h-4 ms-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path> </svg> </span> <span class="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span> </a> <a href="/login" class="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">¿Ya tienes cuenta? Inicia sesión</a> <div class="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center"> <svg class="w-4 h-4 mr-1 text-secondary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path> </svg> <span id="user-count" class="transition-colors duration-500">1,234 usuarios registrados</span> </div> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"> <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Verificar placa</h2> <div class="mb-6"> <form id="verificar-form" class="space-y-4"> <div> <label for="placa" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Placa</label> <input type="text" id="placa" name="placa" class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ej. ABC123" required style="text-transform: uppercase;"> </div> <div> <label class="flex items-center"> <input type="checkbox" id="exento" name="exento" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Vehículo exento</span> </label> </div> <div> <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
Verificar
</button> </div> </form> </div> <div id="resultado" class="hidden"></div> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"> <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Ejemplos</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${ejemplos.map((ejemplo) => renderTemplate`<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"> <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Placa: ${ejemplo.placa}</h3> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${ejemplo.descripcion}</p> ${renderComponent($$result2, "PicoPlacaStatus", $$PicoPlacaStatus, { "placa": ejemplo.placa, "tipoVehiculoExento": ejemplo.tipoVehiculoExento, "showDetails": true })} </div>`)} </div> </div> </div> </div> </section> ` }), defineScriptVars({ reglas }));
}, "D:/Github/picolalert/src/pages/pico-y-placa.astro", void 0);

const $$file = "D:/Github/picolalert/src/pages/pico-y-placa.astro";
const $$url = "/pico-y-placa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PicoYPlaca,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
