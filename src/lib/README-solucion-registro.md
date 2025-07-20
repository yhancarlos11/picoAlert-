# Solución al Problema de Registro de Usuarios en PicoAlert+

## Problema Identificado

Se detectó un error 500 (Internal Server Error) al intentar registrar usuarios utilizando la función `createDirectusUser`, que intentaba crear usuarios directamente en la colección estándar de usuarios de Directus (`directus_users`) a través del endpoint `/users`.

El error específico era:

```
api.js:337   POST `https://directus.bryanmedin4.com/users`  500 (Internal Server Error)
```

Este error ocurría porque la aplicación no tenía permisos suficientes para crear usuarios directamente en la colección `directus_users` de Directus. Esto es común en instalaciones de Directus donde, por razones de seguridad, solo los administradores pueden crear usuarios directamente en esta colección.

## Solución Implementada

Se modificó el formulario de registro (`register-user.astro`) para utilizar la función `createUsuario` en lugar de `createDirectusUser`. Esta función crea usuarios en una colección personalizada llamada `Usuario` en lugar de intentar crearlos directamente en la colección estándar de Directus.

### Cambios realizados:

1. **Modificación de la importación**:
   ```javascript
   // Antes
   import { createDirectusUser } from '../lib/api.js';
   
   // Después
   import { createUsuario } from '../lib/api.js';
   ```

2. **Adaptación del formato de datos**:
   ```javascript
   // Antes - Formato para createDirectusUser
   const userData = {
       email: email,
       password: password,
       first_name: firstName,
       last_name: lastName,
       telefono: telefono,
       role: '3',
       status: 'active'
   };
   
   // Después - Formato para createUsuario
   const userData = {
       Nombre: nombre,
       Correo: email,
       Telefono: telefono,
       Clave: password,
       Ciudad: '',
       Role: '3',
       status: 'active'
   };
   ```

3. **Actualización de las llamadas a funciones y mensajes de log**:
   ```javascript
   // Antes
   console.log('Llamando a createDirectusUser');
   const result = await createDirectusUser(userData);
   console.log('Resultado de createDirectusUser:', result);
   
   // Después
   console.log('Llamando a createUsuario');
   const result = await createUsuario(userData);
   console.log('Resultado de createUsuario:', result);
   ```

## Ventajas de esta Solución

1. **Permisos simplificados**: La colección personalizada `Usuario` probablemente tiene permisos más permisivos que la colección estándar de usuarios de Directus.

2. **Flexibilidad en la estructura de datos**: La colección personalizada puede tener campos adaptados específicamente a las necesidades de la aplicación.

3. **Seguridad mejorada**: Mantiene la integridad del sistema de usuarios de Directus mientras permite que la aplicación gestione sus propios usuarios.

## Consideraciones Futuras

1. **Sincronización de usuarios**: Si en el futuro se necesita que los usuarios creados en la colección personalizada también tengan acceso al panel de Directus, se deberá implementar un mecanismo de sincronización.

2. **Autenticación**: Asegurarse de que las funciones de autenticación estén correctamente configuradas para trabajar con la colección personalizada de usuarios.

3. **Migración**: Si se desea migrar a la API estándar de usuarios de Directus en el futuro, se deberán ajustar los permisos en Directus y volver a implementar la función `createDirectusUser` con los permisos adecuados.