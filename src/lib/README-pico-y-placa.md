# Implementación de Pico y Placa

Este módulo implementa el algoritmo de pico y placa para la aplicación PicoAlert, utilizando reglas locales definidas directamente en el código.

## Archivos principales

- `pico-y-placa.js`: Contiene las funciones principales para determinar si un vehículo puede circular según las reglas de pico y placa.
- `api/pico-y-placa.js`: Endpoint de API para verificar el estado de pico y placa de un vehículo.
- `components/PicoPlacaStatus.astro`: Componente para mostrar el estado de pico y placa en la interfaz de usuario.
- `pages/pico-y-placa-demo.astro`: Página de demostración que muestra cómo funciona el algoritmo.

## Funciones principales

### `puedeCircular(placa, fecha, tipoVehiculoExento)`

Determina si un vehículo puede circular según las reglas de pico y placa.

- **Parámetros**:
  - `placa` (string): Placa del vehículo
  - `fecha` (Date, opcional): Fecha y hora para verificar (por defecto: fecha actual)
  - `tipoVehiculoExento` (boolean, opcional): Si el vehículo está exento de la restricción

- **Retorna**: Promise con un objeto que contiene:
  - `puedeCircular` (boolean): Si el vehículo puede circular
  - `mensaje` (string): Mensaje descriptivo
  - `reglaAplicada` (object|null): La regla que se aplicó

### `getEstadoPicoYPlaca(placa, tipoVehiculoExento)`

Obtiene el estado actual de pico y placa para una placa.

- **Parámetros**:
  - `placa` (string): Placa del vehículo
  - `tipoVehiculoExento` (boolean, opcional): Si el vehículo está exento de la restricción

- **Retorna**: Promise con un objeto que contiene:
  - `estado` (string): 'PERMITIDO', 'RESTRINGIDO' o 'ERROR'
  - `color` (string): 'green', 'red' o 'yellow'
  - `mensaje` (string): Mensaje descriptivo
  - `detalles` (object): Detalles adicionales

### `verificarFechaFutura(placa, fecha, tipoVehiculoExento)`

Verifica si un vehículo puede circular en una fecha futura.

- **Parámetros**:
  - `placa` (string): Placa del vehículo
  - `fecha` (Date): Fecha futura para verificar
  - `tipoVehiculoExento` (boolean, opcional): Si el vehículo está exento de la restricción

- **Retorna**: Promise con el mismo formato que `puedeCircular`

## Reglas de Pico y Placa

Las reglas de pico y placa se obtienen dinámicamente desde un endpoint y funcionan de la siguiente manera:

1. Si el día actual es par (2, 4, 6, etc.), el pico y placa aplica para las placas terminadas en los dígitos definidos en el endpoint (ID 2).
2. Si el día actual es impar (1, 3, 5, etc.), el pico y placa aplica para las placas terminadas en los dígitos definidos en el endpoint (ID 1).
3. Si el día actual es sábado o domingo, no aplica el pico y placa (todos los vehículos pueden circular).

Estas reglas están implementadas en la función `puedeCircular` del archivo `pico-y-placa.js`, que obtiene los dígitos restringidos desde el endpoint utilizando la función `getReglasPicoYPlaca` del archivo `api.js`.

## Ejemplo de uso

```javascript
// Importar las funciones
import { puedeCircular, getEstadoPicoYPlaca } from '../lib/pico-y-placa.js';

// Verificar si puede circular
const resultado = await puedeCircular('ABC123', new Date(), false);
console.log(resultado.puedeCircular ? 'Puede circular' : 'No puede circular');

// Obtener el estado completo
const estado = await getEstadoPicoYPlaca('ABC123');
console.log(`Estado: ${estado.estado}, Mensaje: ${estado.mensaje}`);
```

## Componente PicoPlacaStatus

El componente `PicoPlacaStatus.astro` muestra el estado de pico y placa de un vehículo en la interfaz de usuario.

```astro
<PicoPlacaStatus 
  placa="ABC123" 
  tipoVehiculoExento={false} 
  showDetails={true} 
/>
```

- **Props**:
  - `placa` (string): Placa del vehículo
  - `tipoVehiculoExento` (boolean, opcional): Si el vehículo está exento de la restricción
  - `showDetails` (boolean, opcional): Si se deben mostrar detalles adicionales

## Endpoint de API

El endpoint `/api/pico-y-placa` permite verificar el estado de pico y placa de un vehículo desde el cliente.

```javascript
// Ejemplo de uso desde el cliente
async function verificarPicoYPlaca(placa, tipoVehiculoExento = false) {
  const response = await fetch('/api/pico-y-placa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ placa, tipoVehiculoExento })
  });
  
  return await response.json();
}

// Uso
const estado = await verificarPicoYPlaca('ABC123', false);
console.log(estado);
```

## Notas importantes

- Las reglas se obtienen dinámicamente desde un endpoint, lo que permite actualizar las restricciones sin necesidad de modificar el código.
- El algoritmo verifica primero si es fin de semana, festivo, fuera de horario o si el vehículo está exento antes de aplicar las reglas.
- Si el día es par, se restringe la circulación de vehículos con placas terminadas en los dígitos definidos en el endpoint (ID 2).
- Si el día es impar, se restringe la circulación de vehículos con placas terminadas en los dígitos definidos en el endpoint (ID 1).
- Los sábados y domingos no hay restricción de circulación.
- Se registran logs detallados de todo el proceso para facilitar la depuración.