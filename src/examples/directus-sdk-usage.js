/**
 * Ejemplo completo de uso del SDK de Directus
 * Este archivo muestra exactamente el código que el usuario está buscando
 */

// Importaciones necesarias
import { createDirectus, authentication, rest, readItems } from '@directus/sdk';

// Configuración del cliente Directus
const DIRECTUS_URL = 'https://directus.bryanmedin4.com';
const directus = createDirectus(DIRECTUS_URL).with(authentication()).with(rest());

// Credenciales de ejemplo (reemplazar con valores reales)
const EMAIL = 'usuario@ejemplo.com';
const PASSWORD = 'contraseña';

// Función principal
async function main() {
  try {
    // Autenticación con Directus
    console.log('Iniciando sesión en Directus...');
    // En la versión 20.0.0 del SDK, el método login espera un objeto { email, password }
    await directus.login({ email: EMAIL, password: PASSWORD });
    console.log('Sesión iniciada correctamente');
    
    // Obtener vehículos
    console.log('Obteniendo vehículos...');
    const items = await directus.request(readItems('Vehiculo'));
    console.log('Vehículos:', items);
    
    // Ejemplo de cómo acceder a los datos
    if (items && items.length > 0) {
      console.log(`Se encontraron ${items.length} vehículos:`);
      items.forEach((vehiculo, index) => {
        console.log(`${index + 1}. Placa: ${vehiculo.Placa}, Tipo: ${vehiculo.Tipo}`);
      });
    } else {
      console.log('No se encontraron vehículos');
    }
    
  } catch (error) {
    console.error('Error:', error);
    
    // Manejo específico de errores
    if (error.message && error.message.includes('Invalid user credentials')) {
      console.error('Credenciales incorrectas. Verifique su email y contraseña.');
    } else if (error.message && error.message.includes('network')) {
      console.error('Error de conexión. Verifique su conexión a internet.');
    }
  }
}

// Ejecutar el ejemplo
// main();

/**
 * Para usar este ejemplo:
 * 1. Reemplace EMAIL y PASSWORD con sus credenciales reales
 * 2. Descomente la línea "main()" al final del archivo
 * 3. Ejecute este archivo con Node.js
 */

// Exportar para uso en otros archivos
export { directus, main };