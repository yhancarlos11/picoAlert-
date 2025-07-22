/**
 * Store para manejar la autenticación
 * Utiliza Zustand para el manejo del estado
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAuthSession, setAuthSession, clearAuthSession } from './storage.js';
import { authenticateUser, logoutUser, isAuthenticated } from './api.js';

/**
 * Store para manejar la autenticación
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * Inicializa el store con los datos de sesión guardados
       */
      initialize: () => {
        const session = getAuthSession();
        if (session) {
          console.log('Inicializando store con sesión existente:', { 
            hasUser: !!session.user, 
            hasToken: !!session.token,
            hasRefreshToken: !!session.refreshToken
          });
          
          // Si tenemos un token válido, inicializamos como autenticado
          // La validación posterior confirmará si el token sigue siendo válido
          set({
            user: session.user,
            token: session.token,
            isAuthenticated: !!session.token // Inicializar como autenticado si hay token
          });
          
          const state = get();
          console.log('Store inicializado, estado completo:', { 
            hasUser: !!state.user, 
            hasToken: !!state.token, 
            isAuthenticated: state.isAuthenticated 
          });
        } else {
          console.log('No hay sesión guardada para inicializar el store');
        }
      },

      // Método para validar sesión con el servidor
      validateSession: async () => {
        const authStore = get();
        console.log('Estado inicial antes de validar:', { 
          hasToken: !!authStore.token, 
          isAuthenticated: authStore.isAuthenticated 
        });
        
        if (authStore.token) {
          try {
            console.log('Intentando validar sesión con el servidor');
            // Obtener el refresh token de la sesión si existe
            const session = getAuthSession();
            const refreshToken = session?.refreshToken;
            
            // Llamar a isAuthenticated con el refresh token para permitir renovación automática
            const result = await isAuthenticated(refreshToken);
            console.log('Resultado de validación:', result);
            
            // Si la validación fue exitosa
            if (result.isAuthenticated === true) {
              console.log('Sesión validada correctamente');
              
              // Si el token fue refrescado, actualizar el token en el store y en el almacenamiento
              if (result.tokenRefreshed) {
                console.log('Token refrescado automáticamente, actualizando sesión');
                // Actualizar el estado con el nuevo token
                set({ 
                  token: result.newToken,
                  isAuthenticated: true
                });
                
                // Verificar que el estado se haya actualizado correctamente
                const storeAfterRefresh = get();
                console.log('Estado después de refrescar token:', { 
                  hasNewToken: !!storeAfterRefresh.token, 
                  isAuthenticated: storeAfterRefresh.isAuthenticated 
                });
                
                // Actualizar el almacenamiento con el nuevo token
                const currentSession = getAuthSession();
                setAuthSession({
                  ...currentSession,
                  token: result.newToken,
                  refreshToken: result.newRefreshToken,
                  expires: result.expires
                });
              } else {
                // Solo actualizar el estado de autenticación
                console.log('Actualizando estado de autenticación a true');
                // Forzar la actualización del estado usando un objeto nuevo para garantizar la actualización
                set({ 
                  ...get(), // Mantener todos los valores actuales
                  isAuthenticated: true // Forzar este valor a true
                });
                
                // Verificar que el estado se haya actualizado correctamente
                const updatedStore = get();
                console.log('Estado de autenticación después de actualizar:', updatedStore.isAuthenticated);
              }
              
              // Verificar una vez más el estado antes de retornar
              const finalState = get();
              console.log('Estado final antes de retornar true:', { 
                hasToken: !!finalState.token, 
                isAuthenticated: finalState.isAuthenticated 
              });
              return true;
            } 
            // Si la validación falló explícitamente (token inválido o expirado)
            else if (result.isAuthenticated === false) {
              console.log('Sesión inválida, limpiando datos de autenticación');
              // Limpiar el estado
              set({ user: null, token: null, isAuthenticated: false });
              // Verificar que se haya limpiado correctamente
              const clearedState = get();
              console.log('Estado después de limpiar:', { 
                hasUser: !!clearedState.user, 
                hasToken: !!clearedState.token, 
                isAuthenticated: clearedState.isAuthenticated 
              });
              // Limpiar el almacenamiento
              clearAuthSession();
              return false;
            }
            // Si no pudimos verificar la autenticación (problemas de red, etc.)
            else {
              console.log('No se pudo verificar la autenticación, manteniendo sesión actual');
              // Mantenemos el estado actual, pero no marcamos como autenticado
              const currentState = get();
              console.log('Estado actual mantenido:', { 
                hasToken: !!currentState.token, 
                isAuthenticated: currentState.isAuthenticated 
              });
              return null;
            }
          } catch (error) {
            console.error('Error validando sesión:', error);
            // No limpiar la sesión automáticamente en caso de error
            // Podría ser un problema temporal de conexión
            return null;
          }
        }
        // Si no hay token, no hay sesión que validar
        return false;
      },

      /**
       * Inicia sesión con credenciales usando Directus
       * @param {string} email - Email del usuario
       * @param {string} password - Contraseña del usuario
       */
      login: async (email, password) => {
        console.log('Iniciando proceso de login en auth-store');
        set({ isLoading: true, error: null });
        
        try {
          console.log('Llamando a authenticateUser');
          // Llamar a la función de autenticación de Directus con un timeout
          const authPromise = authenticateUser(email, password);
          
          // Establecer un timeout para evitar que la operación se quede colgada
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Tiempo de espera agotado')), 15000);
          });
          
          // Usar Promise.race para limitar el tiempo de espera
          const result = await Promise.race([
            authPromise,
            timeoutPromise
          ]);
          
          const { success, user, token, error, data } = result;
          
          console.log('Resultado de authenticateUser:', { 
            success, 
            hasUser: !!user, 
            hasToken: !!token, 
            hasRefreshToken: !!data?.refresh_token,
            hasExpires: !!data?.expires
          });
          
          if (!success) {
            throw new Error(error || 'Error al iniciar sesión');
          }
          
          if (!token) {
            throw new Error('No se recibió un token de autenticación válido');
          }
          
          // Extraer refresh token y tiempo de expiración
          const refreshToken = data?.refresh_token;
          const expires = data?.expires;
          
          console.log('Información de autenticación:', { 
            hasToken: !!token, 
            hasRefreshToken: !!refreshToken,
            expires: expires
          });
          
          // Guardar en el store
          set({
            user: user || { email }, // Si no hay user, al menos guardamos el email
            token: token,
            isAuthenticated: true,
            isLoading: false
          });
          
          console.log('Guardando sesión en almacenamiento local');
          // Guardar en el almacenamiento local incluyendo refresh token y expiración
          setAuthSession({ 
            user: user || { email }, 
            token,
            refreshToken,
            expires
          });
          
          // Si el usuario no tiene ID pero tenemos token, intentar obtener el ID desde Directus
          if (user && !user.id && token) {
            try {
              console.log('Intentando obtener ID de usuario desde Directus después del login');
              // Importar dinámicamente para evitar errores en SSR
              const { directus } = await import('./api.js');
              
              // Obtener el usuario actual desde Directus usando el endpoint /users/me
              const userResponse = await directus.request(() => ({
                path: '/users/me',
                method: 'GET',
              }));
              
              if (userResponse && userResponse.id) {
                console.log('ID de usuario obtenido desde Directus:', userResponse.id);
                // Actualizar el usuario en el store con el ID
                const updatedUser = { ...user, id: userResponse.id };
                set({ user: updatedUser });
                
                // Actualizar también en el almacenamiento local
                const currentSession = getAuthSession();
                if (currentSession) {
                  setAuthSession({ 
                    ...currentSession,
                    user: updatedUser
                  });
                }
              }
            } catch (error) {
              console.warn('No se pudo obtener el ID del usuario desde Directus:', error);
            }
          }
          
          // Validar la sesión con el servidor inmediatamente después del login
          try {
            await get().validateSession();
          } catch (error) {
            console.error('Error validando sesión después de login:', error);
            // Si falla la validación, limpiar la sesión
            set({
              user: null,
              token: null,
              isAuthenticated: false
            });
            clearAuthSession();
            return { success: false, error: 'Error validando sesión con el servidor' };
          }
          
          return { success: true };
        } catch (error) {
          console.error('Error en proceso de login:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: error.message || 'Error al iniciar sesión',
            isLoading: false
          });
          return { success: false, error: error.message || 'Error al iniciar sesión' };
        }
      },

      /**
       * Cierra la sesión del usuario
       */
      logout: async () => {
        try {
          // Llamar a la API para cerrar sesión en Directus
          await logoutUser();
          
          // Limpiar el store
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });
          
          // Limpiar el almacenamiento local
          clearAuthSession();
          
          return { success: true };
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          
          // Aún así, limpiamos el estado local
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });
          
          clearAuthSession();
          
          return { success: false, error: error.message };
        }
      },

      /**
       * Verifica si el usuario está autenticado
       * @returns {Promise<boolean>} true si está autenticado, false en caso contrario
       */
      checkAuth: async () => {
        console.log('Verificando autenticación en auth-store');
        
        // Primero verificamos el estado local
        if (!get().isAuthenticated) {
          console.log('No autenticado según estado local');
          return false;
        }
        
        // Evitamos verificaciones frecuentes para prevenir bucles
        const lastCheck = get().lastAuthCheck || 0;
        const now = Date.now();
        const checkInterval = 60000; // 1 minuto entre verificaciones
        
        if (now - lastCheck < checkInterval) {
          console.log('Usando caché de autenticación local');
          return get().isAuthenticated;
        }
        
        // Actualizamos el timestamp de la última verificación
        set({ lastAuthCheck: now });
        
        // Luego verificamos con el servidor con un timeout
        try {
          console.log('Verificando autenticación con el servidor');
          const authResult = await isAuthenticated();
          console.log('Resultado de verificación:', authResult);
          
          // Si no está autenticado en el servidor pero sí localmente,
          // actualizamos el estado local
          if (!authResult.isAuthenticated && get().isAuthenticated) {
            console.log('Sesión expirada, limpiando estado local');
            set({
              user: null,
              token: null,
              isAuthenticated: false
            });
            clearAuthSession();
          }
          
          return authenticated;
        } catch (error) {
          console.error('Error al verificar autenticación:', error);
          // En caso de error de timeout u otro error de red, mantenemos el estado local
          // pero no actualizamos lastAuthCheck para que se intente de nuevo pronto
          set({ lastAuthCheck: 0 });
          return get().isAuthenticated;
        }
      }
    }),
    {
      name: 'auth-storage', // Nombre para el almacenamiento persistente
    }
  )
);

// Inicializar el store al cargar
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
}