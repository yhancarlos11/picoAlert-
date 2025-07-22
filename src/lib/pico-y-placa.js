// Importamos getReglasPicoYPlaca para obtener las reglas dinámicamente
import { getReglasPicoYPlaca } from './api.js';

/**
 * Función para determinar si un vehículo puede circular según las reglas de pico y placa
 * @param {string} placa - Placa del vehículo
 * @param {Date} fecha - Fecha y hora para verificar (por defecto: fecha actual)
 * @param {boolean} tipoVehiculoExento - Si el vehículo está exento de la restricción
 * @returns {Promise<{puedeCircular: boolean, mensaje: string, reglaAplicada: object|null}>}
 */
export async function puedeCircular(placa, fecha = new Date(), tipoVehiculoExento = false) {
  try {
    // Convertir la placa a mayúsculas
    placa = placa.toUpperCase();
    console.log('Verificando si puede circular', { placa, fecha: fecha.toISOString(), tipoVehiculoExento });
    
    // Validar placa
    if (!placa || typeof placa !== 'string' || placa.length < 5) {
      console.warn('Placa inválida', { placa });
      return { 
        puedeCircular: false, 
        mensaje: 'Placa inválida', 
        reglaAplicada: null 
      };
    }
    
    // Obtener el último dígito de la placa
    const ultimoDigito = placa.slice(-1);
    console.debug('Último dígito de la placa', { ultimoDigito });
    
    // Obtener información de la fecha
    const diaSemana = fecha.getDay(); // 0=domingo, 6=sábado
    const hora = fecha.getHours() + fecha.getMinutes()/60;
    const fechaISO = fecha.toISOString().slice(0,10);
    const dia = fecha.getDate();
    const diaEsPar = dia % 2 === 0;
    
    console.debug('Información de fecha', { 
      diaSemana, 
      hora, 
      fechaISO, 
      dia, 
      diaEsPar 
    });

    // Verificar si es fin de semana (sábado o domingo)
    if ([0, 6].includes(diaSemana)) {
      console.log('Es fin de semana, puede circular', { diaSemana });
      return { 
        puedeCircular: true, 
        mensaje: 'Fin de semana: sin restricción', 
        reglaAplicada: null 
      };
    }

    // Verificar si es festivo (ejemplo: 20 de julio)
    // Aquí se podría implementar una lógica más completa para festivos
    const esFestivo = fechaISO === '2023-07-20' || fechaISO === '2023-12-25';
    if (esFestivo) {
      console.log('Es festivo, puede circular', { fechaISO });
      return { 
        puedeCircular: true, 
        mensaje: 'Día festivo: sin restricción', 
        reglaAplicada: null 
      };
    }

    // Verificar si está fuera del horario de restricción (6:00 AM a 9:00 PM)
    if (hora < 6 || hora >= 21) {
      console.log('Fuera de horario de restricción, puede circular', { hora });
      return { 
        puedeCircular: true, 
        mensaje: 'Fuera de horario de restricción (6:00 AM a 9:00 PM)', 
        reglaAplicada: null 
      };
    }

    // Verificar si el vehículo está exento
    if (tipoVehiculoExento) {
      console.log('Vehículo exento, puede circular', { tipoVehiculoExento });
      return { 
        puedeCircular: true, 
        mensaje: 'Vehículo exento de restricción', 
        reglaAplicada: null 
      };
    }

    // Obtener las reglas de pico y placa desde el endpoint
    const reglas = await getReglasPicoYPlaca();
    
    // Registramos que estamos usando las reglas del endpoint
    console.log('Usando reglas de pico y placa del endpoint', reglas);

    // Aplicar las reglas de pico y placa según el endpoint
    // Si el día es par, el pico y placa aplica para placas terminadas en los dígitos de item2
    // Si el día es impar, el pico y placa aplica para placas terminadas en los dígitos de item1
    
    // Definir los dígitos restringidos según si el día es par o impar
    // Día par -> item2 -> dígitos obtenidos del endpoint
    // Día impar -> item1 -> dígitos obtenidos del endpoint
    const digitosRestringidos = diaEsPar ? reglas.item2 : reglas.item1;
    
    console.log('Dígitos restringidos para hoy:', {
      diaEsPar,
      digitosRestringidos,
      ultimoDigito
    });
    
    // Verificar si el último dígito está restringido
    const estaRestringido = digitosRestringidos.includes(ultimoDigito);
    
    console.log('Verificación de restricción:', {
      ultimoDigito,
      digitosRestringidos,
      estaRestringido
    });
    
    // Si está restringido, NO puede circular (pico y placa aplica)
    const puedeCircular = !estaRestringido;
    
    // Crear un objeto de regla aplicada
    // Días pares: dígitos restringidos de item2
    // Días impares: dígitos restringidos de item1
    const reglaAplicada = {
      id: diaEsPar ? 2 : 1,
      Ultimo_Digito: digitosRestringidos,
      tipo: 'Restricción'
    };
    
    console.debug('Regla aplicable', { reglaAplicada });
    console.log('Resultado de verificación', { 
      puedeCircular, 
      ultimoDigito, 
      digitosRestringidos,
      diaEsPar
    });


    // Crear un mensaje más descriptivo sobre la regla aplicada
    let mensaje = '';
    if (puedeCircular) {
      mensaje = `Puede circular: placa terminada en ${ultimoDigito} no está restringida en día ${diaEsPar ? 'par' : 'impar'}`;
    } else {
      mensaje = `No puede circular: placa terminada en ${ultimoDigito} está restringida en día ${diaEsPar ? 'par' : 'impar'}`;
    }
    
    return { 
      puedeCircular, 
      mensaje, 
      reglaAplicada: reglaAplicada 
    };
  } catch (error) {
    console.error('Error al verificar si puede circular', { 
      message: error.message, 
      stack: error.stack 
    });
    
    // En caso de error, permitimos circular para no bloquear al usuario
    return { 
      puedeCircular: true, 
      mensaje: 'Error al verificar restricción: se permite circular', 
      reglaAplicada: null,
      error: error.message 
    };
  }
}

/**
 * Función para obtener el estado actual de pico y placa para una placa
 * @param {string} placa - Placa del vehículo
 * @param {boolean} tipoVehiculoExento - Si el vehículo está exento de la restricción
 * @param {Date} [fecha=new Date()] - Fecha y hora para verificar (por defecto: fecha actual)
 * @returns {Promise<{estado: string, color: string, mensaje: string, detalles: object}>}
 */
export async function getEstadoPicoYPlaca(placa, tipoVehiculoExento = false, fecha = new Date()) {
  try {
    // Convertir la placa a mayúsculas
    placa = placa.toUpperCase();
    
    // Registrar información de depuración
    console.log('Verificando pico y placa para:', { 
      placa, 
      fecha: fecha.toISOString(), 
      tipoVehiculoExento 
    });
    
    const resultado = await puedeCircular(placa, fecha, tipoVehiculoExento);
    
    // Registrar el resultado para depuración
    console.log('Resultado de puedeCircular:', resultado);
    
    const estadoFinal = {
      estado: resultado.puedeCircular ? 'PERMITIDO' : 'RESTRINGIDO',
      color: resultado.puedeCircular ? 'green' : 'red',
      mensaje: resultado.mensaje,
      detalles: {
        placa,
        fecha: fecha.toISOString(),
        tipoVehiculoExento,
        reglaAplicada: resultado.reglaAplicada
      }
    };
    
    // Registrar el estado final para depuración
    console.log('Estado final calculado:', estadoFinal);
    
    return estadoFinal;
  } catch (error) {
    console.error('Error al obtener estado de pico y placa', { 
      message: error.message, 
      stack: error.stack 
    });
    
    return {
      estado: 'ERROR',
      color: 'yellow',
      mensaje: 'Error al verificar el estado de pico y placa',
      detalles: {
        placa,
        fecha: new Date().toISOString(),
        error: error.message
      }
    };
  }
}

/**
 * Función para verificar si un vehículo puede circular en una fecha futura
 * @param {string} placa - Placa del vehículo
 * @param {Date} fecha - Fecha futura para verificar
 * @param {boolean} tipoVehiculoExento - Si el vehículo está exento de la restricción
 * @returns {Promise<{puedeCircular: boolean, mensaje: string, reglaAplicada: object|null}>}
 */
export async function verificarFechaFutura(placa, fecha, tipoVehiculoExento = false) {
  // Convertir la placa a mayúsculas
  placa = placa.toUpperCase();
  // Validar que la fecha sea futura
  const ahora = new Date();
  if (fecha < ahora) {
    console.warn('La fecha proporcionada no es futura', { 
      fechaProporcionada: fecha.toISOString(), 
      fechaActual: ahora.toISOString() 
    });
    return {
      puedeCircular: false,
      mensaje: 'La fecha proporcionada debe ser futura',
      reglaAplicada: null
    };
  }
  
  // Utilizar la función principal para verificar
  return await puedeCircular(placa, fecha, tipoVehiculoExento);
}