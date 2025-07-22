# PicoAlert+ - Tu Aliado contra el Pico y Placa

![PicoAlert+ Logo](./public/logo/logo.png)

PicoAlert+ es una aplicación web diseñada para ayudar a los conductores a mantenerse informados sobre las restricciones de Pico y Placa en Bogotá, evitando multas y facilitando la planificación de viajes.

## 🚀 Características Principales

- **Notificaciones en Tiempo Real**: Recibe alertas instantáneas sobre las restricciones de Pico y Placa para tu vehículo.
- **Calendario Interactivo**: Consulta el Pico y Placa para cualquier día y planifica tus viajes con anticipación.
- **Verificación de Placas**: Comprueba rápidamente si tu vehículo puede circular en un momento específico.
- **Interfaz Intuitiva**: Diseño moderno y fácil de usar, adaptado a dispositivos móviles y de escritorio.
- **Modo Oscuro**: Interfaz adaptable que se ajusta a tus preferencias de visualización.

## 🔍 Reglas de Pico y Placa Implementadas

La aplicación implementa las siguientes reglas para determinar si un vehículo puede circular:

### Reglas Principales
1. **Días Pares**: Si el día del mes es par (2, 4, 6, etc.), el pico y placa aplica para las placas terminadas en los dígitos definidos en el endpoint (ID 2).
2. **Días Impares**: Si el día del mes es impar (1, 3, 5, etc.), el pico y placa aplica para las placas terminadas en los dígitos definidos en el endpoint (ID 1).
3. **Fines de Semana**: Los sábados y domingos no hay restricción de circulación.
4. **Horario de Restricción**: Las restricciones aplican de 6:00 AM a 9:00 PM en días hábiles.
5. **Vehículos Exentos**: Algunos vehículos pueden estar exentos de las restricciones (servicios públicos, emergencias, etc.).
6. **Días Festivos**: No hay restricción en días festivos (ej: 20 de julio, 25 de diciembre).

### Lógica de Aplicación
- **Validación de Placa**: Debe tener al menos 5 caracteres
- **Último Dígito**: Se evalúa el último dígito de la placa
- **Días Pares/Impares**: Se determina según el día del mes (no día de la semana)
- **Horario**: Restricción activa entre 6:00 AM y 9:00 PM
- **Excepciones**: Fines de semana, festivos y vehículos exentos pueden circular libremente

Las reglas específicas de los dígitos restringidos se obtienen dinámicamente desde un endpoint externo, lo que permite actualizar las restricciones sin necesidad de modificar el código.

## 🌐 Estructura de APIs

La aplicación expone los siguientes endpoints REST para interactuar con el sistema:

### POST `/api/pico-y-placa`
Verifica el estado de pico y placa para una placa específica.

**Request Body:**
```json
{
  "placa": "ABC123",
  "tipoVehiculoExento": false
}
```

**Response (Éxito):**
```json
{
  "estado": "PERMITIDO|RESTRINGIDO|ERROR",
  "color": "green|red|yellow",
  "mensaje": "Descripción del estado",
  "detalles": {
    "placa": "ABC123",
    "fecha": "2023-12-01T10:30:00.000Z",
    "tipoVehiculoExento": false,
    "reglaAplicada": {
      "id": 1,
      "Ultimo_Digito": ["1", "2"],
      "tipo": "Restricción"
    }
  }
}
```

**Códigos de Estado:**
- `200`: Verificación exitosa
- `400`: Placa inválida o datos incorrectos
- `500`: Error interno del servidor

### POST `/api/register`
Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "first_name": "Nombre"
}
```

**Response (Éxito):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "first_name": "Nombre"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

**Validaciones:**
- Email debe tener formato válido
- Contraseña mínimo 6 caracteres
- Email y contraseña son obligatorios

**Códigos de Estado:**
- `201`: Usuario creado exitosamente
- `400`: Datos inválidos o usuario ya existe
- `500`: Error interno del servidor

## 💻 Tecnologías Utilizadas

- **[Astro](https://astro.build/)**: Framework web para crear sitios estáticos de alto rendimiento
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS para diseño rápido y responsivo
- **[Svelte](https://svelte.dev/)**: Framework para componentes interactivos
- **[Flowbite](https://flowbite.com/)**: Biblioteca de componentes UI basada en Tailwind
- **[Vercel](https://vercel.com/)**: Plataforma para despliegue y hosting

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala dependencias                            |
| `npm run dev`             | Inicia servidor local en `localhost:4321`       |
| `npm run build`           | Construye el sitio para producción en `./dist/` |
| `npm run preview`         | Previsualiza la build antes de desplegar        |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check` |

## 🚀 Despliegue en Vercel

Para desplegar este proyecto en Vercel, sigue estos pasos:

1. **Instala el adaptador de Vercel para Astro:**
   ```bash
   npm install @astrojs/vercel
   ```

2. **Configura `astro.config.mjs`:**
   Asegúrate de que tu archivo `astro.config.mjs` esté configurado para usar el adaptador de Vercel.

3. **Despliega en Vercel:**
   * Asegúrate de que tu proyecto esté en un repositorio de Git (GitHub, GitLab, Bitbucket).
   * Ve a tu [Vercel Dashboard](https://vercel.com/dashboard).
   * Haz clic en "Add New..." -> "Project".
   * Importa tu repositorio de Git.

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos (imágenes, estilos globales)
│   ├── logo/           # Logo de la aplicación
│   └── img_tipo_vehiculo/  # Imágenes de tipos de vehículos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── PicoPlacaStatus.astro  # Componente para mostrar estado de Pico y Placa
│   │   ├── Sidebar.astro          # Barra lateral de navegación
│   │   ├── ThemeSwitcher.svelte   # Componente para cambiar tema
│   │   └── ...
│   ├── layout/          # Layouts de la aplicación
│   │   ├── base.astro   # Layout base
│   │   ├── user.astro   # Layout para usuarios autenticados
│   │   └── ...
│   ├── lib/             # Lógica de negocio y utilidades
│   │   ├── pico-y-placa.js  # Implementación de reglas de Pico y Placa
│   │   ├── api.js           # Funciones para comunicación con APIs externas
│   │   ├── auth-store.js    # Manejo de autenticación
│   │   └── ...
│   ├── pages/           # Páginas de la aplicación
│   │   ├── api/         # Endpoints de la API REST
│   │   │   ├── pico-y-placa.js  # API para verificar estado de Pico y Placa
│   │   │   └── register.js      # API para registro de usuarios
│   │   ├── user/        # Páginas para usuarios registrados
│   │   │   ├── dashboard.astro       # Panel principal del usuario
│   │   │   ├── vehicles.astro        # Gestión de vehículos
│   │   │   ├── vehicle-details/      # Detalles de vehículos
│   │   │   │   └── [id].astro        # Página dinámica de detalles
│   │   │   ├── calendar.astro        # Calendario interactivo de Pico y Placa
│   │   │   └── ...
│   │   ├── index.astro       # Página principal
│   │   ├── login.astro       # Página de inicio de sesión
│   │   └── ...
│   └── styles/          # Estilos adicionales
└── package.json         # Dependencias y scripts
```

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ para ayudar a los conductores de Bogotá.