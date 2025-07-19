import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login, logout, getCurrentUser, isAuthenticated } from './api.js';
import { setAuthSession, getAuthSession, clearAuthSession, hasAuthSession } from './storage.js';
import logger from './logger.js';

// Store de autenticación con persistencia
logger.info('auth-store', 'Inicializando store de autenticación');
export const useAuthStore = create(
    persist(
        (set, get) => ({
            // Estado
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Acciones
            login: async (email, password) => {
                logger.info('auth-store', 'Iniciando proceso de login', { email });
                set({ isLoading: true, error: null });
                try {
                    logger.debug('auth-store', 'Llamando a función login de api.js');
                    const result = await login(email, password);
                    logger.debug('auth-store', 'Resultado de login', { success: result.success });
                    if (result.success) {
                        logger.info('auth-store', 'Login exitoso, obteniendo información del usuario');
                        // Obtener el usuario actual después de iniciar sesión
                        const userInfo = await getCurrentUser();
                        logger.debug('auth-store', 'Información del usuario obtenida', { 
                            userId: userInfo?.id,
                            email: userInfo?.email
                        });
                        
                        // Guardar en el store y en sessionStorage
                        const authData = { 
                            user: userInfo, 
                            isAuthenticated: true 
                        };
                        
                        set({ 
                            ...authData,
                            isLoading: false,
                            error: null 
                        });
                        
                        // Guardar en sessionStorage para persistencia entre páginas
                        setAuthSession(authData);
                        
                        logger.info('auth-store', 'Estado de autenticación actualizado en store y sessionStorage');
                        return { success: true };
                    } else {
                        // Limpiar datos de autenticación
                        clearAuthSession();
                        logger.warn('auth-store', 'Login fallido', { error: result.error });
                        
                        set({ 
                            error: result.error, 
                            isLoading: false,
                            isAuthenticated: false,
                            user: null 
                        });
                        return { success: false, error: result.error };
                    }
                } catch (error) {
                    logger.error('auth-store', 'Error en proceso de login', { 
                        message: error.message,
                        name: error.name,
                        stack: error.stack
                    });
                    set({ 
                        error: error.message, 
                        isLoading: false,
                        isAuthenticated: false,
                        user: null 
                    });
                    return { success: false, error: error.message };
                }
            },

            logout: async () => {
                logger.info('auth-store', 'Iniciando proceso de logout');
                set({ isLoading: true });
                try {
                    logger.debug('auth-store', 'Llamando a función logout de api.js');
                    await logout();
                    logger.info('auth-store', 'Logout exitoso, limpiando estado de usuario');
                    
                    // Limpiar sessionStorage
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: null 
                    });
                    logger.info('auth-store', 'Estado de autenticación actualizado en store y sessionStorage (sesión cerrada)');
                } catch (error) {
                    logger.error('auth-store', 'Error durante logout', { 
                        message: error.message,
                        name: error.name,
                        stack: error.stack
                    });
                    // Limpiar el estado local incluso si hay error en el servidor
                    logger.info('auth-store', 'Limpiando estado local a pesar del error');
                    
                    // Limpiar sessionStorage incluso si hay error
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: null 
                    });
                    logger.info('auth-store', 'Estado de autenticación actualizado en store y sessionStorage (sesión cerrada a pesar del error)');
                }
            },

            checkAuth: async () => {
                logger.info('auth-store', 'Verificando estado de autenticación');
                set({ isLoading: true });
                
                // Primero verificar si hay sesión en sessionStorage
                const sessionData = getAuthSession();
                if (sessionData && sessionData.isAuthenticated && sessionData.user) {
                    logger.info('auth-store', 'Sesión encontrada en sessionStorage, restaurando estado', {
                        userId: sessionData.user?.id
                    });
                    set({
                        user: sessionData.user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                    logger.info('auth-store', 'Estado de autenticación restaurado desde sessionStorage');
                    return;
                }
                
                // Si no hay sesión en sessionStorage, verificar con el servidor
                try {
                    logger.debug('auth-store', 'Llamando a función isAuthenticated de api.js');
                    const authenticated = await isAuthenticated();
                    logger.debug('auth-store', 'Resultado de verificación de autenticación', { authenticated });
                    if (authenticated) {
                        logger.info('auth-store', 'Usuario autenticado, obteniendo información del usuario');
                        const userInfo = await getCurrentUser();
                        logger.debug('auth-store', 'Información del usuario obtenida', { 
                            userId: userInfo?.id,
                            email: userInfo?.email
                        });
                        
                        // Guardar en el store y en sessionStorage
                        const authData = {
                            user: userInfo,
                            isAuthenticated: true
                        };
                        
                        set({ 
                            ...authData,
                            isLoading: false,
                            error: null
                        });
                        
                        // Guardar en sessionStorage
                        setAuthSession(authData);
                        
                        logger.info('auth-store', 'Estado de autenticación actualizado en store y sessionStorage (autenticado)');
                    } else {
                        logger.info('auth-store', 'Usuario no autenticado, limpiando estado');
                        
                        // Limpiar sessionStorage
                        clearAuthSession();
                        
                        set({ 
                            user: null, 
                            isAuthenticated: false, 
                            isLoading: false,
                            error: null
                        });
                        logger.info('auth-store', 'Estado de autenticación actualizado en store y sessionStorage (no autenticado)');
                    }
                } catch (error) {
                    logger.error('auth-store', 'Error checking auth', { 
                        message: error.message,
                        name: error.name,
                        stack: error.stack
                    });
                    
                    // Limpiar sessionStorage en caso de error
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: error.message 
                    });
                    
                    logger.warn('auth-store', 'Error en verificación de autenticación, sesión limpiada');
                }
            },

            clearError: () => set({ error: null }),

            // Función para inicializar el store
            initialize: async () => {
                const { checkAuth } = get();
                await checkAuth();
            }
        }),
        {
            name: 'picoalert-auth', // nombre para localStorage
            partialize: (state) => ({ 
                // Solo persistir estos campos
                isAuthenticated: state.isAuthenticated,
                user: state.user 
            })
        }
    )
);

// Hook para usar en componentes
export const useAuth = () => {
    const store = useAuthStore();
    return {
        user: store.user,
        isAuthenticated: store.isAuthenticated,
        isLoading: store.isLoading,
        error: store.error,
        login: store.login,
        logout: store.logout,
        checkAuth: store.checkAuth,
        clearError: store.clearError,
        initialize: store.initialize
    };
};