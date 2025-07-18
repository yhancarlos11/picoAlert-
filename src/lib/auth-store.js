import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login, logout, getCurrentUser, isAuthenticated } from './api.js';
import { setAuthSession, getAuthSession, clearAuthSession, hasAuthSession } from './storage.js';

// Store de autenticación con persistencia
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
                console.log('Iniciando proceso de login en auth-store con email:', email);
                set({ isLoading: true, error: null });
                try {
                    console.log('Llamando a función login de api.js');
                    const result = await login(email, password);
                    console.log('Resultado de login:', result);
                    if (result.success) {
                        console.log('Login exitoso, obteniendo información del usuario');
                        // Obtener el usuario actual después de iniciar sesión
                        const userInfo = await getCurrentUser();
                        console.log('Información del usuario obtenida:', userInfo);
                        
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
                        
                        console.log('Estado de autenticación actualizado en store y sessionStorage');
                        return { success: true };
                    } else {
                        // Limpiar datos de autenticación
                        clearAuthSession();
                        
                        set({ 
                            error: result.error, 
                            isLoading: false,
                            isAuthenticated: false,
                            user: null 
                        });
                        return { success: false, error: result.error };
                    }
                } catch (error) {
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
                console.log('Iniciando proceso de logout en auth-store');
                set({ isLoading: true });
                try {
                    console.log('Llamando a función logout de api.js');
                    await logout();
                    console.log('Logout exitoso, limpiando estado de usuario');
                    
                    // Limpiar sessionStorage
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: null 
                    });
                    console.log('Estado de autenticación actualizado en store y sessionStorage (sesión cerrada)');
                } catch (error) {
                    console.error('Error durante logout:', error);
                    // Limpiar el estado local incluso si hay error en el servidor
                    console.log('Limpiando estado local a pesar del error');
                    
                    // Limpiar sessionStorage incluso si hay error
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: null 
                    });
                    console.log('Estado de autenticación actualizado en store y sessionStorage (sesión cerrada a pesar del error)');
                }
            },

            checkAuth: async () => {
                console.log('Verificando estado de autenticación en auth-store');
                set({ isLoading: true });
                
                // Primero verificar si hay sesión en sessionStorage
                const sessionData = getAuthSession();
                if (sessionData && sessionData.isAuthenticated && sessionData.user) {
                    console.log('Sesión encontrada en sessionStorage, restaurando estado');
                    set({
                        user: sessionData.user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                    console.log('Estado de autenticación restaurado desde sessionStorage');
                    return;
                }
                
                // Si no hay sesión en sessionStorage, verificar con el servidor
                try {
                    console.log('Llamando a función isAuthenticated de api.js');
                    const authenticated = await isAuthenticated();
                    console.log('Resultado de verificación de autenticación:', authenticated);
                    if (authenticated) {
                        console.log('Usuario autenticado, obteniendo información del usuario');
                        const userInfo = await getCurrentUser();
                        console.log('Información del usuario obtenida:', userInfo);
                        
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
                        
                        console.log('Estado de autenticación actualizado en store y sessionStorage (autenticado)');
                    } else {
                        console.log('Usuario no autenticado, limpiando estado');
                        
                        // Limpiar sessionStorage
                        clearAuthSession();
                        
                        set({ 
                            user: null, 
                            isAuthenticated: false, 
                            isLoading: false,
                            error: null
                        });
                        console.log('Estado de autenticación actualizado en store y sessionStorage (no autenticado)');
                    }
                } catch (error) {
                    console.error('Error checking auth:', error);
                    
                    // Limpiar sessionStorage en caso de error
                    clearAuthSession();
                    
                    set({ 
                        user: null, 
                        isAuthenticated: false, 
                        isLoading: false,
                        error: error.message 
                    });
                    
                    console.log('Error en verificación de autenticación, sesión limpiada');
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