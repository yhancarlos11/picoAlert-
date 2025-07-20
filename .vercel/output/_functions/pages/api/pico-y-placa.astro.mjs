import { g as getEstadoPicoYPlaca } from '../../chunks/pico-y-placa_B0kbKJND.mjs';
export { renderers } from '../../renderers.mjs';

/**
 * API endpoint para verificar el estado de pico y placa
 * Este endpoint recibe una placa y devuelve si puede circular o no
 */

async function post({ request }) {
  try {
    // Obtener los datos de la solicitud
    const data = await request.json();
    const { placa, tipoVehiculoExento = false } = data;
    
    console.log('Solicitud de verificación de pico y placa', { placa, tipoVehiculoExento });
    
    // Validar la placa
    if (!placa || typeof placa !== 'string' || placa.length < 5) {
      console.warn('Placa inválida en solicitud', { placa });
      return new Response(
        JSON.stringify({
          estado: 'ERROR',
          color: 'yellow',
          mensaje: 'Placa inválida',
          detalles: { placa }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Obtener el estado de pico y placa
    const resultado = await getEstadoPicoYPlaca(placa, tipoVehiculoExento);
    console.log('Resultado de verificación de pico y placa', { 
      placa, 
      estado: resultado.estado,
      mensaje: resultado.mensaje
    });
    
    // Devolver la respuesta
    return new Response(
      JSON.stringify(resultado),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error en endpoint de pico y placa', { 
      message: error.message, 
      stack: error.stack 
    });
    
    return new Response(
      JSON.stringify({
        estado: 'ERROR',
        color: 'yellow',
        mensaje: 'Error al procesar la solicitud: ' + error.message,
        detalles: { error: error.message }
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
