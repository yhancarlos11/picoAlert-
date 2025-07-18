import { createDirectus, rest, authentication, readItems, createItem, readItem, registerUser, createUser } from '@directus/sdk';

// Configuración del cliente Directus
const directus = createDirectus('https://directus.bryanmedin4.com')
    .with(rest())
    .with(authentication('cookie'));

// Funciones de autenticación
export async function login(email, password) {
    try {
        console.log('Intentando login con:', { email });
        // Directus espera los campos email y password para la autenticación
        // El SDK de Directus espera 'password', no 'Clave'
        const result = await directus.login({ email, password });
        console.log('Login exitoso:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, error: error.message };
    }
}

export async function logout() {
    try {
        console.log('Intentando logout');
        await directus.logout();
        console.log('Logout exitoso');
        return { success: true };
    } catch (error) {
        console.error('Error en logout:', error);
        return { success: false, error: error.message };
    }
}

export async function getCurrentUser() {
    try {
        console.log('Verificando usuario actual');
        const token = await directus.getToken();
        console.log('Token encontrado:', !!token);
        
        if (!token) return null;
        
        // Obtener información del usuario actual
        try {
            const currentUser = await directus.users.me.read();
            console.log('Usuario actual obtenido:', currentUser);
            return {
                authenticated: true,
                id: currentUser.id,
                email: currentUser.email,
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                name: currentUser.first_name
            };
        } catch (userError) {
            console.error('Error al obtener datos del usuario:', userError);
            // Devolver un objeto con valores predeterminados para evitar undefined
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
        console.error('Error en getCurrentUser:', error);
        return null;
    }
}

// Función auxiliar para hacer peticiones autenticadas
async function makeAuthenticatedRequest(url, options = {}) {
    try {
        console.log('Realizando petición autenticada a:', url, 'con método:', options.method || 'GET');
        const token = await directus.getToken();
        console.log('Token disponible:', !!token);
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log('Agregando token de autorización');
        } else {
            console.log('No hay token disponible, la petición no será autenticada');
        }
        
        console.log('Enviando petición con headers:', headers);
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                ...headers
            }
        });
        
        console.log('Respuesta recibida:', response.status, response.statusText);
        
        if (!response.ok) {
            console.error('Error en respuesta HTTP:', response.status, response.statusText);
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json();
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
        // Verificar si el usuario está autenticado
        const isAuth = await isAuthenticated();
        if (!isAuth) {
            console.error('No hay autenticación para obtener vehículos');
            return [];
        }
        
        // Obtener el usuario actual
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id || currentUser.id === 'unknown') {
            console.error('No se pudo obtener información del usuario actual');
            return [];
        }
        
        const userId = currentUser.id;
        
        // Obtener solo los vehículos del usuario actual
        const result = await makeAuthenticatedRequest(`https://directus.bryanmedin4.com/items/Vehiculo?filter[Usuario][_eq]=${userId}`);
        return result.data;
    } catch (error) {
        console.error('Error fetching vehiculos:', error);
        return [];
    }
}

export async function createVehiculo(data) {
    try {
        // Verificar si el usuario está autenticado
        const isAuth = await isAuthenticated();
        if (!isAuth) {
            throw new Error('No hay sesión activa. Por favor, inicia sesión nuevamente.');
        }
        
        // Obtener el usuario actual usando la función segura
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id || currentUser.id === 'unknown') {
            throw new Error('No se pudo obtener la información del usuario actual.');
        }
        
        const userId = currentUser.id;
        
        // Asociar el vehículo al usuario actual
        const vehicleData = {
            ...data,
            Usuario: userId // Asociar el vehículo al usuario actual
        };
        
        const result = await makeAuthenticatedRequest('https://directus.bryanmedin4.com/items/Vehiculo', {
            method: 'POST',
            body: JSON.stringify(vehicleData)
        });
        return result.data;
    } catch (error) {
        console.error('Error creating vehiculo:', error);
        throw error;
    }
}

// Función para verificar si el usuario está autenticado
export async function isAuthenticated() {
    try {
        console.log('Verificando autenticación');
        const token = await directus.getToken();
        const isAuth = !!token;
        console.log('¿Usuario autenticado?', isAuth);
        return isAuth;
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        return false;
    }
}

// Exportar el cliente directus para uso directo si es necesario
export { directus };