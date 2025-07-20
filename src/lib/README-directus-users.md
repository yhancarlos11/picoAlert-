# Implementación de Usuarios con Directus SDK

Este documento explica cómo se implementa la creación y gestión de usuarios utilizando el SDK de Directus en PicoAlert+.

## Funciones Disponibles

El proyecto implementa dos funciones principales para la creación de usuarios:

### 1. createUsuario

Función que crea usuarios en la colección personalizada 'Usuario' de Directus:

```javascript
export async function createUsuario(userData) {
  // Crea un usuario en la colección personalizada 'Usuario'
  // userData debe contener: Nombre, Correo, Telefono, Clave, Ciudad
}
```

### 2. createDirectusUser

Función que utiliza la API específica de usuarios de Directus para crear usuarios en el sistema:

```javascript
export async function createDirectusUser(userData) {
  // Crea un usuario utilizando la API específica de Directus
  // userData debe contener: email, password, first_name, last_name, role, status
}
```

## ¿Cuál función usar?

- **createUsuario**: Usar cuando necesites crear un usuario en la colección personalizada 'Usuario' con campos específicos del proyecto.
- **createDirectusUser**: Usar cuando necesites crear un usuario en el sistema de Directus con los campos estándar de Directus.

## Ejemplo de Uso

```javascript
import { createDirectusUser } from '../lib/api.js';

// Datos del usuario
const userData = {
  email: 'usuario@ejemplo.com',
  password: 'contraseña123',
  first_name: 'Nombre',
  last_name: 'Apellido',
  role: '3', // ID del rol (3 suele ser el rol de usuario normal)
  status: 'active' // Estado del usuario (active, invited, draft, etc.)
};

// Crear usuario
const result = await createDirectusUser(userData);

if (result.success) {
  console.log('Usuario creado exitosamente:', result.data);
} else {
  console.error('Error al crear usuario:', result.error);
}
```

## Manejo de Errores

Ambas funciones implementan un manejo de errores robusto:

- Errores de duplicación (email ya registrado)
- Errores de validación de datos
- Errores de timeout
- Errores de red

Cada función devuelve un objeto con la siguiente estructura:

```javascript
// Éxito
{
  success: true,
  data: { ... } // Datos del usuario creado
}

// Error
{
  success: false,
  error: 'Mensaje de error'
}
```

## Consideraciones Importantes

1. **Roles de Usuario**: Asegúrate de usar el ID de rol correcto según la configuración de tu instancia de Directus.
2. **Campos Personalizados**: Si necesitas guardar campos personalizados, debes configurarlos primero en tu instancia de Directus.
3. **Seguridad**: Nunca almacenes contraseñas en texto plano ni las muestres en logs.

## Referencias

- [Documentación oficial de Directus sobre Usuarios](https://directus.io/docs/api/users)
- [SDK de Directus](https://directus.io/docs/sdk)