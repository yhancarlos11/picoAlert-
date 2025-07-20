/**
 * Ejemplo de creación de usuarios con el SDK de Directus
 * Este archivo muestra cómo crear usuarios utilizando la API específica de Directus
 */

// Importar la función de creación de usuarios
import { createDirectusUser } from '../lib/api.js';

/**
 * Función de ejemplo para crear un usuario
 * @param {Object} userData - Datos del usuario a crear
 */
async function ejemploCrearUsuario() {
  try {
    // Datos de ejemplo para crear un usuario
    const userData = {
      email: 'nuevo.usuario@ejemplo.com',
      password: 'contraseña123',
      first_name: 'Nuevo',
      last_name: 'Usuario',
      role: '3', // ID del rol (3 suele ser el rol de usuario normal)
      status: 'active' // Estado del usuario (active, invited, draft, etc.)
    };
    
    console.log('Iniciando creación de usuario...');
    
    // Llamar a la función de creación de usuarios
    const result = await createDirectusUser(userData);
    
    // Verificar el resultado
    if (result.success) {
      console.log('Usuario creado exitosamente:', {
        ...result.data,
        password: '***OCULTA***' // No mostrar la contraseña en los logs
      });
      
      // Aquí puedes realizar acciones adicionales con el usuario creado
      // Por ejemplo, enviar un correo de bienvenida, redirigir al usuario, etc.
    } else {
      console.error('Error al crear usuario:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error inesperado:', error);
    return {
      success: false,
      error: error.message || 'Error inesperado al crear usuario'
    };
  }
}

/**
 * Función para crear un usuario con datos personalizados
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} firstName - Nombre del usuario
 * @param {string} lastName - Apellido del usuario
 */
async function crearUsuarioPersonalizado(email, password, firstName, lastName) {
  try {
    // Validar datos requeridos
    if (!email || !password) {
      throw new Error('El email y la contraseña son obligatorios');
    }
    
    // Preparar datos del usuario
    const userData = {
      email,
      password,
      first_name: firstName || '',
      last_name: lastName || '',
      role: '3', // ID del rol por defecto
      status: 'active' // Estado activo por defecto
    };
    
    // Llamar a la función de creación de usuarios
    return await createDirectusUser(userData);
  } catch (error) {
    console.error('Error al crear usuario personalizado:', error);
    return {
      success: false,
      error: error.message || 'Error al crear usuario personalizado'
    };
  }
}

// Exportar funciones para uso en otros archivos
export { ejemploCrearUsuario, crearUsuarioPersonalizado };

/**
 * Para usar este ejemplo:
 * 
 * import { ejemploCrearUsuario, crearUsuarioPersonalizado } from './directus-user-creation.js';
 * 
 * // Ejemplo 1: Crear un usuario con datos predefinidos
 * ejemploCrearUsuario()
 *   .then(result => {
 *     if (result.success) {
 *       console.log('Usuario creado con éxito');
 *     } else {
 *       console.error('Error:', result.error);
 *     }
 *   });
 * 
 * // Ejemplo 2: Crear un usuario con datos personalizados
 * crearUsuarioPersonalizado('usuario@ejemplo.com', 'contraseña123', 'Nombre', 'Apellido')
 *   .then(result => {
 *     if (result.success) {
 *       console.log('Usuario personalizado creado con éxito');
 *     } else {
 *       console.error('Error:', result.error);
 *     }
 *   });
 */