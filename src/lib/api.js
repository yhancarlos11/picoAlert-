/**
 * API de integración con el backend
 * Este archivo contiene funciones para interactuar con el backend
 */

// Importar los módulos necesarios del SDK de Directus
import { createDirectus, authentication, rest, readItems, createItem, login, refresh } from '@directus/sdk';

// Configurar el cliente de Directus
const DIRECTUS_URL = 'https://directus.bryanmedin4.com';
// Usar el modo de autenticación 'json' ya que el servidor tiene Access-Control-Allow-Origin: *
const directus = createDirectus(DIRECTUS_URL).with(authentication('json')).with(rest());

// Timeout para operaciones de autenticación (en milisegundos)
const AUTH_TIMEOUT = 10000; // 10 segundos

/**
 * Autentica al usuario con Directus
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Resultado de la autenticación
 */
export async function authenticateUser(email, password) {
  try {
    console.log('Intentando autenticar con Directus:', { email });
    
    // Crear una promesa con timeout para evitar que la operación se quede colgada
    const loginPromise = directus.login({ email, password, mode: 'json' });
    
    // Establecer un timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado al autenticar')), AUTH_TIMEOUT);
    });
    
    // Usar Promise.race para limitar el tiempo de espera
    const result = await Promise.race([loginPromise, timeoutPromise]);
    
    console.log('Resultado de autenticación:', { 
      success: true, 
      hasUser: !!result.user, 
      hasToken: !!result.access_token,
      hasRefreshToken: !!result.refresh_token,
      expires: result.expires
    });
    
    if (!result || !result.access_token) {
      throw new Error('Respuesta de autenticación inválida');
    }
    
    return {
      success: true,
      data: {
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires: result.expires
      },
      user: result.user || { email }, // Si no hay user, al menos guardamos el email
      token: result.access_token
    };
  } catch (error) {
    console.error('Error de autenticación:', error);
    return {
      success: false,
      error: error.message || 'Error al autenticar usuario'
    };
  }
}

/**
 * Obtiene los vehículos del usuario autenticado
 * @returns {Promise<Array>} Lista de vehículos del usuario
 */
export async function getVehiculos() {
  try {
    // Verificar si el usuario está autenticado
    // En una implementación real, esto haría una llamada al endpoint
    const items = await directus.request(readItems('Vehiculo'));
    return items || [];
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    return [];
  }
}

/**
 * Obtiene las reglas de pico y placa desde el endpoint
 * @returns {Promise<Object>} Objeto con las reglas de pico y placa
 */
export async function getReglasPicoYPlaca() {
  try {
    // En una implementación real, esto haría una llamada al endpoint
    // Intentar obtener las reglas desde el servidor
    try {
      // Aquí iría la llamada real al endpoint cuando esté disponible
      // const response = await directus.request(readItems('PicoYPlacaRules'));
      // if (response && Array.isArray(response) && response.length >= 2) {
      //   return {
      //     item1: response[0].digitos || ['6', '7', '8', '9', '0'],
      //     item2: response[1].digitos || ['1', '2', '3', '4', '5']
      //   };
      // }
    } catch (apiError) {
      console.warn('Error al obtener reglas desde API, usando reglas predefinidas:', apiError);
      // Continuar con las reglas predefinidas
    }
    
    // Simular la respuesta del endpoint o usar como fallback
    const reglas = {
      item1: ['6', '7', '8', '9', '0'],  // ID 1 en el endpoint - Días impares (lunes, miércoles)
      item2: ['1', '2', '3', '4', '5']   // ID 2 en el endpoint - Días pares (martes, jueves)
    };
    
    console.log('Reglas de Pico y Placa obtenidas:', reglas);
    return reglas;
  } catch (error) {
    console.error('Error al obtener reglas de pico y placa:', error);
    // En caso de error, retornamos las reglas por defecto
    return {
      item1: ['6', '7', '8', '9', '0'],
      item2: ['1', '2', '3', '4', '5']
    };
  }
}

/**
 * Cierra la sesión del usuario en Directus
 * @returns {Promise<Object>} Resultado del cierre de sesión
 */
/**
 * Refresca el token de acceso usando el refresh token
 * @param {string} refreshToken - Token de refresco
 * @returns {Promise<Object>} Resultado del refresco de token
 */
export async function refreshToken(refreshToken) {
  try {
    console.log('Intentando refrescar token con Directus');
    
    // Crear una promesa con timeout para evitar que la operación se quede colgada
    const refreshPromise = directus.request(refresh({ refresh_token: refreshToken, mode: 'json' }));
    
    // Establecer un timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado al refrescar token')), AUTH_TIMEOUT);
    });
    
    // Usar Promise.race para limitar el tiempo de espera
    const result = await Promise.race([refreshPromise, timeoutPromise]);
    
    console.log('Token refrescado correctamente');
    
    if (!result || !result.access_token) {
      throw new Error('Respuesta de refresco de token inválida');
    }
    
    return {
      success: true,
      data: result,
      token: result.access_token,
      refreshToken: result.refresh_token,
      expires: result.expires
    };
  } catch (error) {
    console.error('Error al refrescar token:', error);
    return {
      success: false,
      error: error.message || 'Error al refrescar token'
    };
  }
}

export async function logoutUser() {
  try {
    await directus.logout();
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { 
      success: false, 
      error: error.message || 'Error al cerrar sesión'
    };
  }
}

/**
 * Verifica si el usuario está autenticado con Directus
 * @returns {Promise<boolean>} true si está autenticado, false en caso contrario
 */
/**
 * Verifica si el usuario está autenticado con Directus
 * @param {string} refreshToken - Token de refresco (opcional)
 * @returns {Promise<Object>} Resultado de la verificación de autenticación
 */
/**
 * Crea un nuevo vehículo en Directus
 * @param {string} placa - Placa del vehículo
 * @param {string} tipo - Tipo del vehículo
 * @returns {Promise<Object>} Resultado de la creación del vehículo
 */
export async function createVehiculo(placa, tipo) {
  try {
    console.log('Creando vehículo en Directus:', { placa, tipo });
    
    // Crear una promesa con timeout para evitar que la operación se quede colgada
    const createPromise = directus.request(
      createItem('Vehiculo', {
        Placa: placa,
        Tipo: tipo
      })
    );
    
    // Establecer un timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado al crear vehículo')), AUTH_TIMEOUT);
    });
    
    // Usar Promise.race para limitar el tiempo de espera
    const result = await Promise.race([createPromise, timeoutPromise]);
    
    console.log('Vehículo creado correctamente:', result);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    return {
      success: false,
      error: error.message || 'Error al crear vehículo'
    };
  }
}

export async function isAuthenticated(refreshToken = null) {
  try {
    console.log('Verificando autenticación con Directus');
    
    // Crear una promesa con timeout para evitar que la operación se quede colgada
    const authCheckPromise = directus.request(readItems('Vehiculo', { limit: 1 }));
    
    // Establecer un timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado')), AUTH_TIMEOUT);
    });
    
    // Usar Promise.race para limitar el tiempo de espera
    await Promise.race([authCheckPromise, timeoutPromise]);
    console.log('Usuario autenticado correctamente');
    return { isAuthenticated: true, tokenRefreshed: false };
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    
    // Verificar si el error es por token expirado o inválido
    if (error && (error.message?.includes('token') || error.message?.includes('auth') || error.status === 401 || error.status === 403)) {
      console.log('Error de autenticación detectado, token posiblemente expirado');
      
      // Si tenemos un refresh token, intentar refrescar el token
      if (refreshToken) {
        console.log('Intentando refrescar token automáticamente');
        try {
          const refreshResult = await refreshToken(refreshToken);
          if (refreshResult.success) {
            console.log('Token refrescado automáticamente con éxito');
            return { 
              isAuthenticated: true, 
              tokenRefreshed: true,
              newToken: refreshResult.token,
              newRefreshToken: refreshResult.refreshToken,
              expires: refreshResult.expires
            };
          }
        } catch (refreshError) {
          console.error('Error al refrescar token automáticamente:', refreshError);
        }
      }
      
      return { isAuthenticated: false, tokenRefreshed: false };
    }
    
    // Para otros tipos de errores (como problemas de red), no consideramos que la autenticación haya fallado
    // Solo que no pudimos verificarla
    console.log('Error de conexión o servidor, no se pudo verificar la autenticación');
    return { isAuthenticated: null, tokenRefreshed: false }; // Retornamos null para indicar que no pudimos verificar
  }
}