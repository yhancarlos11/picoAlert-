/**
 * Módulo de almacenamiento para gestionar la persistencia de datos entre sesiones
 * Proporciona una capa de abstracción sobre sessionStorage y localStorage
 */

// Clave para almacenar los datos de autenticación
const AUTH_KEY = 'picoalert-auth-session';

/**
 * Almacena datos en sessionStorage
 * @param {string} key - Clave para almacenar los datos
 * @param {any} data - Datos a almacenar (se convertirán a JSON)
 */
export const setSessionData = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error al guardar datos en sessionStorage:', error);
    return false;
  }
};

/**
 * Obtiene datos de sessionStorage
 * @param {string} key - Clave para recuperar los datos
 * @returns {any|null} - Datos almacenados o null si no existen
 */
export const getSessionData = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error al recuperar datos de sessionStorage:', error);
    return null;
  }
};

/**
 * Elimina datos de sessionStorage
 * @param {string} key - Clave a eliminar
 */
export const removeSessionData = (key) => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error al eliminar datos de sessionStorage:', error);
    return false;
  }
};

/**
 * Almacena datos de autenticación en sessionStorage
 * @param {Object} authData - Datos de autenticación del usuario
 */
export const setAuthSession = (authData) => {
  return setSessionData(AUTH_KEY, authData);
};

/**
 * Obtiene datos de autenticación de sessionStorage
 * @returns {Object|null} - Datos de autenticación o null si no existe sesión
 */
export const getAuthSession = () => {
  return getSessionData(AUTH_KEY);
};

/**
 * Elimina la sesión de autenticación
 */
export const clearAuthSession = () => {
  return removeSessionData(AUTH_KEY);
};

/**
 * Verifica si existe una sesión de autenticación activa
 * @returns {boolean} - true si existe sesión, false en caso contrario
 */
export const hasAuthSession = () => {
  return getAuthSession() !== null;
};