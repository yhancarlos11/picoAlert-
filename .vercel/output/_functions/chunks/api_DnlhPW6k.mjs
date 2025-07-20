import { createDirectus, rest, readItems, createUser } from '@directus/sdk';

/**
 * API de integración con el backend
 * Este archivo contiene funciones para interactuar con el backend
 */


// Configurar el cliente de Directus
const DIRECTUS_URL = 'https://directus.bryanmedin4.com';
// Configurar el cliente de Directus con REST
const directus = createDirectus(DIRECTUS_URL).with(rest());

// Timeout para operaciones de autenticación (en milisegundos)
const AUTH_TIMEOUT = 10000; // 10 segundos

/**
 * Obtiene los vehículos del usuario autenticado
 * @returns {Promise<Array>} Lista de vehículos del usuario
 */
async function getVehiculos() {
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
async function getReglasPicoYPlaca() {
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
 * Crea un nuevo usuario utilizando el SDK de Directus
 * @param {Object} userData - Datos del usuario a crear
 * @param {string} userData.email - Correo electrónico del usuario (requerido)
 * @param {string} userData.password - Contraseña del usuario (requerido)
 * @param {string} userData.first_name - Nombre del usuario
 * @returns {Promise<Object>} Resultado de la creación del usuario
 */
async function createDirectusUser(userData) {
  try {
    console.log('Creando usuario con SDK de Directus:', { 
      ...userData, 
      password: '***OCULTA***' 
    });
    
    // Validar campos requeridos
    if (!userData.email || !userData.password) {
      throw new Error('El email y la contraseña son obligatorios');
    }
    
    // Preparar datos para la API de Directus - solo los campos necesarios
    const userPayload = {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name || '',
      role: "4bf867c2-ea16-4c47-a042-efe0b39ecce9" // Asignar el rol específico
    };
    
    // Crear una promesa con timeout para evitar que la operación se quede colgada
    const requestPromise = directus.request(createUser(userPayload));
    
    // Establecer un timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado al crear usuario')), AUTH_TIMEOUT);
    });
    
    // Usar Promise.race para limitar el tiempo de espera
    const result = await Promise.race([requestPromise, timeoutPromise]);
    
    console.log('Usuario creado correctamente con SDK de Directus:', { 
       ...result, 
       password: '***OCULTA***' 
     });
     
     // Devolver un objeto estructurado con success: true y los datos del usuario
     return {
       success: true,
       data: result,
       message: 'Usuario creado exitosamente'
     };
   } catch (error) {
     console.error('Error al crear usuario con SDK de Directus:', error);
     
     // Manejar errores específicos
     // Verificar si el error tiene la estructura esperada del SDK de Directus
     let errorMessage = 'Error desconocido al crear usuario';
     
     if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
       errorMessage = error.errors[0].message || 'Error desconocido';
       
       if (errorMessage.includes('Duplicate entry') || errorMessage.includes('already exists') || errorMessage.includes('has to be unique')) {
         errorMessage = 'El correo electrónico ya está registrado';
       } else if (errorMessage.includes('validation') || errorMessage.includes('Validation')) {
         errorMessage = 'Error de validación: ' + errorMessage;
       } else if (errorMessage.includes('permission') || errorMessage.includes('Permission') || 
                    errorMessage.includes('FORBIDDEN')) {
         errorMessage = 'No tienes permisos para crear usuarios';
       }
     } else if (error.message) {
       errorMessage = error.message;
       
       if (error.message.includes('Tiempo de espera agotado')) {
         errorMessage = 'Tiempo de espera agotado al crear el usuario. Inténtalo de nuevo.';
       }
     }
     
     // Devolver un objeto estructurado con success: false y el mensaje de error
     return {
       success: false,
       error: errorMessage
     };
  }
}

/**
 * Obtiene todos los usuarios registrados
 * @returns {Promise<Array>} Lista de usuarios
 */
async function getUsers() {
  try {
    // Obtener todos los usuarios desde Directus
    const users = await directus.request(readItems('directus_users', {
      fields: ['id', 'first_name', 'email']
    }));
    
    // Mapear los campos de Directus a los nombres de campo utilizados en la aplicación
    return users.map(user => ({
      id: user.id,
      Nombre: user.first_name || 'Sin nombre',
      Correo: user.email
    }));
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

/**
 * Obtiene un usuario específico por su ID
 * @param {string} id - ID del usuario a obtener
 * @returns {Promise<Object>} Datos del usuario
 */
async function getUser(id) {
  try {
    // Obtener un usuario específico desde Directus
    const user = await directus.request(readItems('directus_users', {
      fields: ['id', 'first_name', 'email', 'phone'],
      filter: { id: { _eq: id } }
    }));
    
    if (!user || user.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    
    // Mapear los campos de Directus a los nombres de campo utilizados en la aplicación
    return {
      id: user[0].id,
      Nombre: user[0].first_name || 'Sin nombre',
      Correo: user[0].email,
      Telefono: user[0].phone || 'No disponible'
    };
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    // Devolver un objeto con valores por defecto en caso de error
    return {
      id: id,
      Nombre: 'Error al cargar',
      Correo: 'No disponible',
      Telefono: 'No disponible'
    };
  }
}

export { getUser as a, getVehiculos as b, createDirectusUser as c, getUsers as d, getReglasPicoYPlaca as g };
