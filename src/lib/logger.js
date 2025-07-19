/**
 * Sistema de logs para PicoAlert
 * Este módulo proporciona funciones para registrar eventos y errores
 * que pueden ser consultados posteriormente para diagnóstico
 */

// Verificar si estamos en el navegador (client-side) o en el servidor (server-side)
const isBrowser = typeof window !== 'undefined' && typeof console !== 'undefined';

// Clave para almacenar los logs en localStorage
const LOGS_KEY = 'picoalert-logs';

// Niveles de log
export const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// Configuración por defecto
const DEFAULT_CONFIG = {
  // Nivel mínimo de logs a almacenar
  minLevel: LogLevel.INFO,
  // Máximo número de logs a mantener
  maxLogs: 100,
  // Si es true, también muestra los logs en la consola
  consoleOutput: true,
  // Si es true, almacena los logs en localStorage
  persistLogs: true
};

// Configuración actual
let config = { ...DEFAULT_CONFIG };

/**
 * Configura el sistema de logs
 * @param {Object} newConfig - Nueva configuración
 */
export function configure(newConfig = {}) {
  config = { ...config, ...newConfig };
}

/**
 * Obtiene los logs almacenados
 * @returns {Array} - Array de objetos de log
 */
export function getLogs() {
  if (!isBrowser || !config.persistLogs) return [];
  
  try {
    const logsData = localStorage.getItem(LOGS_KEY);
    return logsData ? JSON.parse(logsData) : [];
  } catch (error) {
    console.error('Error al recuperar logs:', error);
    return [];
  }
}

/**
 * Guarda los logs en localStorage
 * @param {Array} logs - Array de objetos de log
 */
function saveLogs(logs) {
  if (!isBrowser || !config.persistLogs) return;
  
  try {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Error al guardar logs:', error);
  }
}

/**
 * Añade un nuevo log
 * @param {string} level - Nivel del log (DEBUG, INFO, WARN, ERROR)
 * @param {string} category - Categoría del log (auth, api, etc.)
 * @param {string} message - Mensaje del log
 * @param {Object} [data] - Datos adicionales (opcional)
 */
function addLog(level, category, message, data = null) {
  // Verificar nivel mínimo
  const levels = Object.values(LogLevel);
  if (levels.indexOf(level) < levels.indexOf(config.minLevel)) {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    level,
    category,
    message,
    data
  };
  
  // Mostrar en consola si está habilitado
  if (config.consoleOutput && isBrowser) {
    const consoleMethod = {
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
      [LogLevel.ERROR]: console.error
    }[level] || console.log;
    
    consoleMethod(`[${timestamp}] [${level}] [${category}] ${message}`, data || '');
  }
  
  // Guardar en localStorage si está habilitado
  if (config.persistLogs && isBrowser) {
    const logs = getLogs();
    logs.unshift(log); // Añadir al principio para que los más recientes estén primero
    
    // Limitar el número de logs
    if (logs.length > config.maxLogs) {
      logs.length = config.maxLogs;
    }
    
    saveLogs(logs);
  }
  
  return log;
}

/**
 * Registra un mensaje de nivel DEBUG
 * @param {string} category - Categoría del log
 * @param {string} message - Mensaje del log
 * @param {Object} [data] - Datos adicionales (opcional)
 */
export function debug(category, message, data = null) {
  return addLog(LogLevel.DEBUG, category, message, data);
}

/**
 * Registra un mensaje de nivel INFO
 * @param {string} category - Categoría del log
 * @param {string} message - Mensaje del log
 * @param {Object} [data] - Datos adicionales (opcional)
 */
export function info(category, message, data = null) {
  return addLog(LogLevel.INFO, category, message, data);
}

/**
 * Registra un mensaje de nivel WARN
 * @param {string} category - Categoría del log
 * @param {string} message - Mensaje del log
 * @param {Object} [data] - Datos adicionales (opcional)
 */
export function warn(category, message, data = null) {
  return addLog(LogLevel.WARN, category, message, data);
}

/**
 * Registra un mensaje de nivel ERROR
 * @param {string} category - Categoría del log
 * @param {string} message - Mensaje del log
 * @param {Object} [data] - Datos adicionales (opcional)
 */
export function error(category, message, data = null) {
  return addLog(LogLevel.ERROR, category, message, data);
}

/**
 * Limpia todos los logs almacenados
 */
export function clearLogs() {
  if (!isBrowser || !config.persistLogs) return;
  
  try {
    localStorage.removeItem(LOGS_KEY);
  } catch (e) {
    console.error('Error al limpiar logs:', e);
  }
}

/**
 * Exporta los logs en formato JSON
 * @returns {string} - Logs en formato JSON
 */
export function exportLogs() {
  const logs = getLogs();
  return JSON.stringify(logs, null, 2);
}

/**
 * Crea un log de error a partir de un objeto Error
 * @param {string} category - Categoría del log
 * @param {Error} err - Objeto Error
 * @param {string} [context] - Contexto adicional (opcional)
 */
export function logError(category, err, context = '') {
  const errorData = {
    name: err.name,
    message: err.message,
    stack: err.stack,
    context
  };
  
  return error(category, `${context ? context + ': ' : ''}${err.message}`, errorData);
}

// Exportar un objeto logger para uso más conveniente
export const logger = {
  debug,
  info,
  warn,
  error,
  logError,
  getLogs,
  clearLogs,
  exportLogs,
  configure
};

export default logger;