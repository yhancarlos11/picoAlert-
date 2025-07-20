# Solución al Problema de Registro de Usuarios con Directus SDK

## Problema Identificado

Se detectó un error 500 (Internal Server Error) al intentar registrar usuarios utilizando la función `createDirectusUser`, que intentaba crear usuarios en la colección estándar de usuarios de Directus (`directus_users`) a través del endpoint `/users`. El problema se debía a que se estaba utilizando una colección personalizada `Usuario` en lugar de utilizar correctamente el SDK de Directus para crear usuarios en la colección estándar `directus_users`.

## Solución Implementada

Se ha modificado el código para utilizar correctamente el SDK de Directus para crear usuarios en la colección estándar `directus_users`. Los cambios realizados son:

### 1. Actualización de la función `createDirectusUser`

Se ha actualizado la función `createDirectusUser` en `api.js` para utilizar correctamente el SDK de Directus:

```javascript
export async function createDirectusUser(userData) {
  try {
    console.log('Creando usuario con SDK de Directus:', { 
      ...userData, 
      password: '***OCULTA***' 
    });
    
    // Validar campos requeridos
    if (!userData.email || !userData.password) {
      throw new Error('El email y la contraseña son obligatorios');
    }
    
    // Preparar datos para la API de Directus
    const userPayload = {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      role: userData.role || '3', // ID del rol por defecto
      status: userData.status || 'active'
    };
    
    // Usar el SDK de Directus para crear el usuario
    const createPromise = directus.request(createUser(userPayload));
    
    // Resto del código para manejar la respuesta y los errores
    // ...
  } catch (error) {
    // Manejo de errores mejorado
    // ...
  }
}
```

### 2. Actualización del formulario de registro

Se ha modificado el archivo `register-user.astro` para utilizar la función `createDirectusUser` en lugar de `createUsuario`:

```javascript
// Cambio en la importación
import { createDirectusUser } from '../lib/api.js';

// Cambio en la preparación de datos
const userData = {
  email: email,
  password: password,
  first_name: firstName,
  last_name: lastName,
  telefono: telefono, // Campo personalizado
  role: '3', // ID del rol de usuario normal
  status: 'active' // Usuario activo por defecto
};

// Cambio en la llamada a la función
const result = await createDirectusUser(userData);
```

## Ventajas de esta Solución

1. **Uso correcto del SDK**: Se utiliza el SDK de Directus según la documentación oficial, lo que garantiza compatibilidad y soporte.

2. **Gestión centralizada de usuarios**: Los usuarios se crean directamente en la colección estándar `directus_users`, lo que permite utilizar todas las funcionalidades de gestión de usuarios de Directus.

3. **Mejor manejo de errores**: Se ha mejorado el manejo de errores para detectar problemas de permisos y otros errores comunes.

4. **Mantenimiento simplificado**: Al seguir las prácticas recomendadas por Directus, el código será más fácil de mantener y actualizar en el futuro.

## Consideraciones Futuras

1. **Permisos de Directus**: Asegúrate de que el rol utilizado para crear usuarios tenga los permisos necesarios en la colección `directus_users`.

2. **Campos personalizados**: Si necesitas campos personalizados adicionales, debes configurarlos en la colección `directus_users` en tu instancia de Directus.

3. **Actualización del SDK**: Mantén actualizado el SDK de Directus para aprovechar las últimas funcionalidades y correcciones de seguridad.

## Referencias

- [Documentación oficial de Directus sobre Usuarios](https://directus.io/docs/api/users)
- [SDK de Directus - Función createUser](https://docs.directus.io/packages/@directus/sdk/rest/functions/createuser)