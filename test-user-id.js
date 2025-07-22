/**
 * Script para probar la obtención del ID de usuario desde Directus
 */

// Importar la función directus desde api.js
const { directus } = require('./src/lib/api.js');

// Función para probar la obtención del ID de usuario
async function testGetUserId() {
  try {
    console.log('Intentando obtener usuario desde Directus');
    
    // Obtener el usuario actual desde Directus usando el endpoint /users/me
    const userResponse = await directus.request(() => ({
      path: '/users/me',
      method: 'GET',
    }));
    
    console.log('Respuesta completa de Directus:', JSON.stringify(userResponse, null, 2));
    
    if (userResponse && userResponse.id) {
      console.log('ID de usuario obtenido desde Directus:', userResponse.id);
    } else {
      console.log('No se pudo obtener el ID del usuario');
    }
  } catch (error) {
    console.error('Error al obtener el usuario desde Directus:', error);
  }
}

// Ejecutar la función de prueba
testGetUserId();