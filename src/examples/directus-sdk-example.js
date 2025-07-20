/**
 * Ejemplo de uso del SDK de Directus
 * Este archivo muestra cómo usar el SDK de Directus para autenticarse y leer datos
 */

// 1. Importar los módulos necesarios del SDK de Directus
import { createDirectus, authentication, rest, readItems } from '@directus/sdk';

// 2. Configurar el cliente de Directus
const DIRECTUS_URL = 'https://directus.bryanmedin4.com';
const directus = createDirectus(DIRECTUS_URL).with(authentication()).with(rest());

/**
 * Función para autenticarse y obtener vehículos
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 */
async function obtenerVehiculos(email, password) {
  try {
    // 3. Autenticarse con Directus
    console.log('Iniciando autenticación con Directus...');
    // En la versión 20.0.0 del SDK, el método login espera un objeto { email, password }
    await directus.login({ email, password });
    console.log('Autenticación exitosa');
    
    // 4. Obtener los vehículos
    console.log('Obteniendo vehículos...');
    const items = await directus.request(readItems('Vehiculo'));
    console.log('Vehículos obtenidos:', items);
    
    return items;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * Ejemplo de uso:
 * 
 * // Llamar a la función con credenciales
 * const EMAIL = 'usuario@ejemplo.com';
 * const PASSWORD = 'contraseña';
 * 
 * obtenerVehiculos(EMAIL, PASSWORD)
 *   .then(vehiculos => {
 *     console.log('Total de vehículos:', vehiculos.length);
 *     // Hacer algo con los vehículos
 *   })
 *   .catch(error => {
 *     console.error('Error al obtener vehículos:', error);
 *   });
 */

export { obtenerVehiculos, directus };