/**
 * Ejemplo de cómo consumir el endpoint de API de registro
 * Este archivo muestra cómo registrar usuarios a través de la API REST
 */

/**
 * Función para registrar un usuario a través de la API
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.email - Correo electrónico del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @param {string} userData.first_name - Nombre del usuario (opcional)
 * @param {string} userData.last_name - Apellido del usuario (opcional)
 * @returns {Promise<Object>} Resultado del registro
 */
async function registrarUsuarioAPI(userData) {
  try {
    // Validar datos requeridos
    if (!userData.email || !userData.password) {
      throw new Error('El email y la contraseña son obligatorios');
    }
    
    // Realizar petición al endpoint de registro
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    // Obtener datos de la respuesta
    const data = await response.json();
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {
      success: false,
      error: error.message || 'Error al registrar usuario'
    };
  }
}

/**
 * Ejemplo de uso:
 */
async function ejemploRegistro() {
  // Datos de ejemplo
  const userData = {
    email: 'nuevo.usuario@ejemplo.com',
    password: 'contraseña123',
    first_name: 'Nuevo',
    last_name: 'Usuario'
  };
  
  try {
    console.log('Registrando usuario...');
    const result = await registrarUsuarioAPI(userData);
    
    if (result.success) {
      console.log('Usuario registrado exitosamente:', result.data);
      // Aquí puedes realizar acciones adicionales, como redirigir al usuario
      // window.location.href = '/login';
    } else {
      console.error('Error al registrar usuario:', result.error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
}

// Exportar funciones para uso en otros archivos
export { registrarUsuarioAPI, ejemploRegistro };

/**
 * Ejemplo de uso en un componente o página:
 * 
 * import { registrarUsuarioAPI } from './api-register-example.js';
 * 
 * // En un manejador de eventos de formulario
 * form.addEventListener('submit', async (e) => {
 *   e.preventDefault();
 *   
 *   const formData = new FormData(form);
 *   const userData = {
 *     email: formData.get('email'),
 *     password: formData.get('password'),
 *     first_name: formData.get('first_name'),
 *     last_name: formData.get('last_name')
 *   };
 *   
 *   const result = await registrarUsuarioAPI(userData);
 *   
 *   if (result.success) {
 *     // Mostrar mensaje de éxito
 *     showSuccess('Usuario registrado exitosamente');
 *     // Redirigir al login
 *     setTimeout(() => {
 *       window.location.href = '/login';
 *     }, 2000);
 *   } else {
 *     // Mostrar mensaje de error
 *     showError(result.error);
 *   }
 * });
 */