import { describe, it, expect, vi, beforeEach } from 'vitest';

// Importa las funciones a probar
import * as api from '../src/lib/api.js';

// Mock de directus y sus métodos
vi.mock('@directus/sdk', () => {
  // Funciones simuladas
  const readItems = (...args) => {
    if (args[0] === 'Vehiculo') return [{ Placa: 'ABC123', Tipo: 'Carro' }];
    return [];
  };
  const createItem = (...args) => {
    if (args[0] === 'Vehiculo') return { id: 1, Placa: args[1].Placa, Tipo: args[1].Tipo };
    return {};
  };
  const refresh = () => ({
    access_token: 'token456',
    refresh_token: 'refresh456',
    expires: Date.now() + 10000
  });

  return {
    createDirectus: vi.fn(() => ({
      with: vi.fn().mockReturnThis(),
      login: vi.fn(async ({ email, password }) => {
        if (email === 'fail@test.com') throw new Error('Credenciales inválidas');
        return {
          access_token: 'token123',
          refresh_token: 'refresh123',
          expires: Date.now() + 10000,
          user: { email }
        };
      }),
      request: vi.fn(async (action, params) => {
        // Detecta la función y retorna el mock adecuado
        if (action && action.name === 'readItems') {
          return readItems(...(params ? [params.collection] : ['Vehiculo']));
        }
        if (action && action.name === 'createItem') {
          return createItem(...(params ? [params.collection, params.item] : ['Vehiculo', { Placa: 'XYZ789', Tipo: 'Moto' }]));
        }
        if (action && action.name === 'refresh') {
          return refresh();
        }
        return [];
      }),
      logout: vi.fn(async () => true)
    })),
    authentication: vi.fn(),
    rest: vi.fn(),
    readItems: vi.fn(() => ({ name: 'readItems', arguments: ['Vehiculo'] })),
    createItem: vi.fn((collection, item) => ({ name: 'createItem', arguments: [collection, item] })),
    login: vi.fn(),
    refresh: vi.fn(() => ({ name: 'refresh' }))
  };
});
describe('authenticateUser', () => {
  it('autentica correctamente', async () => {
    const res = await api.authenticateUser('test@test.com', '1234');
    expect(res.success).toBe(true);
    expect(res.data.access_token).toBe('token123');
    expect(res.user.email).toBe('test@test.com');
  });

  it('falla con credenciales incorrectas', async () => {
    const res = await api.authenticateUser('fail@test.com', 'bad');
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});

describe('getVehiculos', () => {
  it('devuelve vehículos', async () => {
    const res = await api.getVehiculos();
    expect(Array.isArray(res)).toBe(true);
    expect(res[0]).toHaveProperty('Placa');
  });
});

describe('getReglasPicoYPlaca', () => {
  it('devuelve reglas por defecto', async () => {
    const reglas = await api.getReglasPicoYPlaca();
    expect(reglas.item1).toEqual(['6', '7', '8', '9', '0']);
    expect(reglas.item2).toEqual(['1', '2', '3', '4', '5']);
  });
});

describe('refreshToken', () => {
  it('refresca el token correctamente', async () => {
    const res = await api.refreshToken('refresh123');
    expect(res.success).toBe(true);
    expect(res.token).toBe('token456');
  });
});

describe('logoutUser', () => {
  it('cierra sesión correctamente', async () => {
    const res = await api.logoutUser();
    expect(res.success).toBe(true);
  });
});

describe('createVehiculo', () => {
  it('crea un vehículo correctamente', async () => {
    const res = await api.createVehiculo('XYZ789', 'Moto');
    expect(res.success).toBe(true);
    expect(res.data).toHaveProperty('id');
  });
});

describe('isAuthenticated', () => {
  it('devuelve autenticado', async () => {
    const res = await api.isAuthenticated();
    expect(res.isAuthenticated).toBe(true);
  });
});