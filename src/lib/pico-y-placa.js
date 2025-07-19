import logger from './logger.js';

// Ya no importamos getReglasPicoYPlaca porque ahora usamos reglas locales

/**
 * Función para determinar si un vehículo puede circular según las reglas de pico y placa
 * @param {string} placa - Placa del vehículo
 * @param {Date} fecha - Fecha y hora para verificar (por defecto: fecha actual)
 * @param {boolean} tipoVehiculoExento - Si el vehículo está exento de la restricción
 * @returns {Promise<{puedeCircular: boolean, mensaje: string, reglaAplicada: object|null}>}
 */
export async function puedeCircular(placa, fecha = new Date(), tipoVehiculoExento = false) {
  try {
    logger.info('pico-y-placa', 'Verificando si puede circular', { placa, fecha: fecha.toISOString(), tipoVehiculoExento });
    
    // Validar placa
    if (!placa || typeof placa !== 'string' || placa.length < 5) {
      logger.warn('pico-y-placa', 'Placa inválida', { placa });
      return { 
        puedeCircular: false, 
        mensaje: 'Placa inválida', 
        reglaAplicada: null 
      };
    }
    
    // Obtener el último dígito de la placa
    const ultimoDigito = placa.slice(-1);
    logger.debug('pico-y-placa', 'Último dígito de la placa', { ultimoDigito });
    
    // Obtener información de la fecha
    const diaSemana = fecha.getDay(); // 0=domingo, 6=sábado
    const hora = fecha.getHours() + fecha.getMinutes()/60;
    const fechaISO = fecha.toISOString().slice(0,10);
    const dia = fecha.getDate();
    const diaEsPar = dia % 2 === 0;
    
    logger.debug('pico-y-placa', 'Información de fecha', { 
      diaSemana, 
      hora, 
      fechaISO, 
      dia, 
      diaEsPar 
    });

    // Verificar si es fin de semana (sábado o domingo)
    if ([0, 6].includes(diaSemana)) {
      logger.info('pico-y-placa', 'Es fin de semana, puede circular', { diaSemana });
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
      logger.info('pico-y-placa', 'Es festivo, puede circular', { fechaISO });
      return { 
        puedeCircular: true, 
        mensaje: 'Día festivo: sin restricción', 
        reglaAplicada: null 
      };
    }

    // Verificar si está fuera del horario de restricción
    if (hora < 6 || hora >= 21) {
      logger.info('pico-y-placa', 'Fuera de horario de restricción, puede circular', { hora });
      return { 
        puedeCircular: true, 
        mensaje: 'Fuera de horario de restricción', 
        reglaAplicada: null 
      };
    }

    // Verificar si el vehículo está exento
    if (tipoVehiculoExento) {
      logger.info('pico-y-placa', 'Vehículo exento, puede circular', { tipoVehiculoExento });
      return { 
        puedeCircular: true, 
        mensaje: 'Vehículo exento de restricción', 
        reglaAplicada: null 
      };
    }

    // Nota: Ya no dependemos de las reglas de Directus, aplicamos directamente la lógica
    // Registramos que estamos usando las reglas locales
    logger.debug('pico-y-placa', 'Usando reglas locales de pico y placa', { 
      reglasPares: ['1', '2', '3', '4', '5'],
      reglasImpares: ['6', '7', '8', '9', '0']
    });

    // Aplicar las nuevas reglas de pico y placa
    // Si el día es par, el pico y placa aplica para placas terminadas en 1,2,3,4,5
    // Si el día es impar, el pico y placa aplica para placas terminadas en 6,7,8,9,0
    
    // Definir los dígitos restringidos según si el día es par o impar
    const digitosRestringidos = diaEsPar ? ['1', '2', '3', '4', '5'] : ['6', '7', '8', '9', '0'];
    
    // Verificar si el último dígito está restringido
    const estaRestringido = digitosRestringidos.includes(ultimoDigito);
    
    // Si está restringido, NO puede circular (pico y placa aplica)
    const puedeCircular = !estaRestringido;
    
    // Crear un objeto de regla aplicada para mantener compatibilidad
    const reglaAplicada = {
      id: diaEsPar ? 1 : 2,
      Ultimo_Digito: digitosRestringidos,
      tipo: 'Restricción'
    };
    
    logger.debug('pico-y-placa', 'Regla aplicable', { reglaAplicada });
    logger.info('pico-y-placa', 'Resultado de verificación', { 
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
    logger.error('pico-y-placa', 'Error al verificar si puede circular', { 
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
 * @returns {Promise<{estado: string, color: string, mensaje: string, detalles: object}>}
 */
export async function getEstadoPicoYPlaca(placa, tipoVehiculoExento = false) {
  try {
    const fechaActual = new Date();
    const resultado = await puedeCircular(placa, fechaActual, tipoVehiculoExento);
    
    return {
      estado: resultado.puedeCircular ? 'PERMITIDO' : 'RESTRINGIDO',
      color: resultado.puedeCircular ? 'green' : 'red',
      mensaje: resultado.mensaje,
      detalles: {
        placa,
        fecha: fechaActual.toISOString(),
        tipoVehiculoExento,
        reglaAplicada: resultado.reglaAplicada
      }
    };
  } catch (error) {
    logger.error('pico-y-placa', 'Error al obtener estado de pico y placa', { 
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
  // Validar que la fecha sea futura
  const ahora = new Date();
  if (fecha < ahora) {
    logger.warn('pico-y-placa', 'La fecha proporcionada no es futura', { 
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