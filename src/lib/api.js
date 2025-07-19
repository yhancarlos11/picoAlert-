import { createDirectus, rest, authentication, readItems, createItem, readItem, registerUser, createUser } from '@directus/sdk';
import logger from './logger.js';

// Configuración del cliente Directus
const directus = createDirectus('https://directus.bryanmedin4.com')
    .with(rest())
    .with(authentication('cookie'));

logger.info('api', 'Cliente Directus inicializado');

// Funciones de autenticación
export async function login(email, password) {
    try {
        logger.info('auth', 'Intentando login', { email });
        // Directus espera los campos email y password para la autenticación
        // El SDK de Directus espera 'password', no 'Clave'
        const result = await directus.login({ email, password });
        logger.info('auth', 'Login exitoso', { userId: result?.id });
        
        // Verificar que se haya obtenido un token válido
        const token = await directus.getToken();
        if (!token) {
            const error = new Error('No se pudo obtener un token de autenticación válido');
            logger.error('auth', error.message);
            throw error;
        }
        
        return { success: true, data: result };
    } catch (error) {
        logger.error('auth', 'Error en login', { 
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        
        // Proporcionar mensajes de error más descriptivos
        let errorMessage = error.message;
        if (error.message.includes('credentials')) {
            errorMessage = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
        }
        
        return { success: false, error: errorMessage };
    }
}

export async function logout() {
    try {
        logger.info('auth', 'Intentando logout');
        await directus.logout();
        logger.info('auth', 'Logout exitoso');
        return { success: true };
    } catch (error) {
        logger.error('auth', 'Error en logout', { 
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        // A pesar del error, consideramos el logout como exitoso desde el punto de vista del cliente
        // ya que queremos limpiar el estado local de autenticación
        return { success: true, warning: error.message };
    }
}

export async function getCurrentUser() {
    try {
        logger.info('auth', 'Verificando usuario actual');
        const token = await directus.getToken();
        logger.debug('auth', 'Token en getCurrentUser', { 
            hasToken: !!token, 
            tokenPreview: token ? token.substring(0, 10) + '...' : 'null' 
        });
        
        if (!token) {
            logger.info('auth', 'No hay token disponible en getCurrentUser, usuario no autenticado');
            return null;
        }
        
        // Obtener información del usuario actual
        try {
            logger.debug('auth', 'Intentando obtener datos del usuario actual');
            const currentUser = await directus.users.me.read();
            logger.info('auth', 'Usuario actual obtenido', { 
                userId: currentUser.id,
                email: currentUser.email
            });
            return {
                authenticated: true,
                id: currentUser.id,
                email: currentUser.email,
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                name: currentUser.first_name
            };
        } catch (userError) {
            logger.error('auth', 'Error al obtener datos del usuario', { 
                message: userError.message,
                name: userError.name,
                stack: userError.stack
            });
            
            // Verificar si el error es de autenticación (401 o 403)
            if (userError.message && (userError.message.includes('401') || userError.message.includes('403'))) {
                logger.warn('auth', 'Error de autenticación al obtener usuario, token inválido o expirado');
                return null;
            }
            
            // Para otros errores, devolver un objeto con valores predeterminados
            logger.warn('auth', 'Devolviendo usuario con ID desconocido debido a error no relacionado con autenticación');
            return { 
                authenticated: true,
                id: 'unknown',
                email: 'usuario',
                first_name: 'Usuario',
                last_name: '',
                name: 'Usuario'
            }; // Al menos sabemos que está autenticado
        }
    } catch (error) {
        logger.error('auth', 'Error general en getCurrentUser', { 
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        return null;
    }
}

// Función auxiliar para hacer peticiones autenticadas
async function makeAuthenticatedRequest(url, options = {}) {
    try {
        console.log('Realizando petición autenticada a:', url, 'con método:', options.method || 'GET');
        
        // Obtener token con manejo de errores
        let token;
        try {
            token = await directus.getToken();
            console.log('Token disponible:', !!token, token ? token.substring(0, 10) + '...' : 'null');
        } catch (tokenError) {
            console.error('Error al obtener token:', tokenError);
            throw new Error('Error al obtener token de autenticación. Por favor, inicia sesión nuevamente.');
        }
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log('Agregando token de autorización');
        } else {
            console.log('No hay token disponible, la petición no será autenticada');
            // Si no hay token y la petición requiere autenticación, lanzar error
            if (options.requireAuth !== false) {
                throw new Error('No hay sesión activa. Por favor, inicia sesión nuevamente.');
            }
        }
        
        console.log('Enviando petición con headers:', JSON.stringify(headers));
        
        // Manejar errores de red
        let response;
        try {
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    ...headers
                }
            });
        } catch (networkError) {
            console.error('Error de red en la petición:', networkError);
            throw new Error('Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.');
        }
        
        console.log('Respuesta recibida:', response.status, response.statusText);
        
        if (!response.ok) {
            console.error('Error en respuesta HTTP:', response.status, response.statusText);
            
            // Manejar errores específicos de autenticación
            if (response.status === 401 || response.status === 403) {
                console.error('Error de autenticación:', response.status);
                throw new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            }
            
            // Intentar obtener más detalles del error
            try {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);
                if (errorData.errors && errorData.errors.length > 0) {
                    throw new Error(errorData.errors[0].message || `Error HTTP: ${response.status}`);
                }
            } catch (parseError) {
                // Si no se puede parsear la respuesta, usar el mensaje genérico
                console.error('No se pudo parsear la respuesta de error:', parseError);
            }
            
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Parsear la respuesta con manejo de errores
        try {
            const data = await response.json();
            console.log('Respuesta parseada correctamente, datos recibidos');
            return data;
        } catch (parseError) {
            console.error('Error al parsear la respuesta JSON:', parseError);
            throw new Error('Error al procesar la respuesta del servidor.');
        }
    } catch (error) {
        console.error('Error en petición autenticada:', error);
        throw error;
    }
}

// Funciones de API existentes mejoradas con autenticación
export async function getUsers() {
    try {
        const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Usuario');
        return result.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function getUser(id) {
    try {
        const result = await makeAuthenticatedRequest(`https://directus.bryanmedin4.com/items/Usuario/${id}`);
        return result.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function getCiudades() {
    try {
        // Las ciudades son de solo lectura, no necesitan autenticación
        const response = await fetch('https://directus.bryanmedin4.com/items/Ciudad');
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ciudades:', error);
        throw error;
    }
}

export async function getReglasPicoYPlaca() {
    try {
        // Verificar si el usuario está autenticado
        const isAuth = await isAuthenticated();
        if (!isAuth) {
            console.log('No hay autenticación para obtener reglas de Pico y Placa, intentando sin autenticación');
            // Intentar obtener las reglas sin autenticación, ya que son datos públicos
            const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Regla_Pico_y_Placa');
            return result.data || [];
        }
        
        const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Regla_Pico_y_Placa');
        return result.data || [];
    } catch (error) {
        console.error('Error fetching reglas pico y placa:', error);
        return []; // Devolver un array vacío en caso de error
    }
}

export async function createReglaPicoYPlaca(data) {
    try {
        const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Regla_Pico_y_Placa', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return result.data;
    } catch (error) {
        console.error('Error creating regla pico y placa:', error);
        throw error;
    }
}

export async function createUsuario(data) {
    try {
        console.log('Iniciando creación de usuario con datos:', { ...data, Clave: '***OCULTA***' });
        // Registrar un nuevo usuario en Directus
        const userData = { ...data };
        
        // Crear el usuario en Directus
        console.log('Preparando datos para crear usuario en Directus');
        
        // Intentar primero con registerUser (para registro público sin autenticación)
        try {
            console.log('Intentando con registerUser para registro público');
            const email = userData.Correo;
            const password = userData.Clave;
            const options = {
                first_name: userData.Nombre
            };
            
            console.log('Datos preparados para registerUser:', { email, options, password: '***OCULTA***' });
            
            const result = await directus.request(registerUser(email, password, options));
            console.log('Usuario registrado exitosamente con registerUser');
            return { success: true, data: result };
        } catch (registerError) {
            console.error('Error al registrar usuario con registerUser:', registerError);
            console.log('Intentando con createUser como alternativa');
            
            // Si registerUser falla, intentar con createUser (requiere autenticación)
            // Preparar objeto de usuario para createUser
            const userItem = {
                email: userData.Correo,
                password: userData.Clave,
                first_name: userData.Nombre,
                role: '3fa85f64-5717-4562-b3fc-2c963f66afa6' // Reemplazar con el ID del rol correcto
            };
            
            console.log('Datos preparados para createUser:', { ...userItem, password: '***OCULTA***' });
            
            const result = await directus.request(createUser(userItem));
            console.log('Usuario creado exitosamente con createUser:', result);
            return result;
        }
        
        return null; // Este código nunca debería ejecutarse
    } catch (error) {
        console.error('Error al crear usuario:', error);
        console.error('Detalles del error:', {
            mensaje: error.message,
            nombre: error.name,
            código: error.code,
            stack: error.stack
        });
        throw error;
    }
}

export async function getVehiculos() {
    try {
        console.log('Iniciando getVehiculos');
        // Verificar si el usuario está autenticado
        let isAuth = false;
        try {
            isAuth = await isAuthenticated();
            console.log('Resultado de autenticación en getVehiculos:', isAuth);
        } catch (authError) {
            console.error('Error al verificar autenticación para obtener vehículos:', authError);
            return [];
        }
        
        if (!isAuth) {
            console.error('No hay autenticación para obtener vehículos');
            return [];
        }
        
        // Obtener el usuario actual
        let currentUser = null;
        try {
            currentUser = await getCurrentUser();
            console.log('Usuario actual obtenido en getVehiculos:', currentUser);
        } catch (userError) {
            console.error('Error al obtener usuario actual para vehículos:', userError);
            return [];
        }
        
        if (!currentUser) {
            console.error('No se pudo obtener información del usuario actual (null)');
            return [];
        }
        
        if (!currentUser.id) {
            console.error('Usuario actual no tiene ID');
            return [];
        }
        
        if (currentUser.id === 'unknown') {
            console.error('ID de usuario es "unknown"');
            return [];
        }
        
        const userId = currentUser.id;
        console.log('ID de usuario para consulta de vehículos:', userId);
        
        // Obtener solo los vehículos del usuario actual
        try {
            const url = `https://directus.bryanmedin4.com/items/Vehiculo?filter[Usuario][_eq]=${userId}`;
            console.log('URL para obtener vehículos:', url);
            
            const result = await makeAuthenticatedRequest(url);
            console.log('Resultado de obtener vehículos:', result);
            
            if (!result) {
                console.error('Resultado de obtener vehículos es null o undefined');
                return [];
            }
            
            if (!result.data) {
                console.error('Resultado no contiene data');
                return [];
            }
            
            console.log('Vehículos obtenidos:', result.data.length);
            return result.data || [];
        } catch (requestError) {
            console.error('Error en la solicitud al obtener vehículos:', requestError);
            return [];
        }
    } catch (error) {
        console.error('Error general en getVehiculos:', error);
        return [];
    }
}

export async function createVehiculo(placa, tipo) {
    try {
        // Verificar si el usuario está autenticado
        let isAuth = false;
        try {
            isAuth = await isAuthenticated();
        } catch (authError) {
            console.error('Error al verificar autenticación para crear vehículo:', authError);
            throw new Error('Error de autenticación al crear vehículo');
        }
        
        if (!isAuth) {
            console.error('No hay autenticación para crear vehículo');
            throw new Error('No hay autenticación para crear vehículo');
        }
        
        // Obtener el usuario actual
        let currentUser = null;
        try {
            currentUser = await getCurrentUser();
        } catch (userError) {
            console.error('Error al obtener usuario actual para crear vehículo:', userError);
            throw new Error('Error al obtener información del usuario');
        }
        
        if (!currentUser || !currentUser.id || currentUser.id === 'unknown') {
            console.error('No se pudo obtener información del usuario actual');
            throw new Error('No se pudo obtener información del usuario');
        }
        
        const userId = currentUser.id;
        
        // Crear el vehículo asociado al usuario actual
        try {
            const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Vehiculo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Placa: placa,
                    Tipo: tipo,
                    Usuario: userId
                }),
            });
            
            return result.data;
        } catch (requestError) {
            console.error('Error en la solicitud al crear vehículo:', requestError);
            
            // Manejar errores específicos de autenticación
            if (requestError.status === 401 || requestError.status === 403) {
                throw new Error('Error de autenticación al crear vehículo');
            }
            
            throw new Error('Error al crear vehículo: ' + (requestError.message || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error creating vehiculo:', error);
        throw error;
    }
}

// Función para verificar si el usuario está autenticado
export async function isAuthenticated() {
    try {
        logger.info('auth', 'Verificando autenticación');
        let token = null;
        
        try {
            token = await directus.getToken();
            logger.debug('auth', 'Token en isAuthenticated', { 
                hasToken: !!token, 
                tokenPreview: token ? token.substring(0, 10) + '...' : 'null' 
            });
        } catch (tokenError) {
            logger.error('auth', 'Error al obtener token en isAuthenticated', { 
                message: tokenError.message,
                name: tokenError.name,
                stack: tokenError.stack
            });
            return false;
        }
        
        const isAuth = !!token;
        logger.info('auth', '¿Usuario autenticado? (basado en token)', { isAuthenticated: isAuth });
        
        // Si hay token, verificar que sea válido intentando obtener el usuario actual
        if (isAuth) {
            try {
                // Intentar obtener información del usuario para validar el token
                const user = await directus.users.me.read();
                logger.info('auth', 'Usuario validado en isAuthenticated', { userId: user ? user.id : 'null' });
                return true;
            } catch (userError) {
                logger.error('auth', 'Error al validar token en isAuthenticated', { 
                    message: userError.message,
                    name: userError.name,
                    stack: userError.stack
                });
                // Si hay error al obtener el usuario, el token podría ser inválido
                return false;
            }
        }
        
        return isAuth;
    } catch (error) {
        logger.error('auth', 'Error general en isAuthenticated', { 
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        return false;
    }
}

// Exportar el cliente directus para uso directo si es necesario
export { directus };