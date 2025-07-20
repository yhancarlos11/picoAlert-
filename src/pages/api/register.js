/**
 * Endpoint de API para registro de usuarios
 * Este endpoint permite crear usuarios a través de una API REST
 */

import { createDirectusUser } from '../../lib/api.js';

export async function post({ request }) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const userData = await request.json();
    
    // Validar datos requeridos
    if (!userData.email || !userData.password) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El email y la contraseña son obligatorios'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El formato del email no es válido'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Validar contraseña
    if (userData.password.length < 6) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'La contraseña debe tener al menos 6 caracteres'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Crear usuario - solo con los campos necesarios
    const result = await createDirectusUser({
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name || ''
    });
    
    // Verificar resultado
    if (result.success) {
      // Eliminar datos sensibles antes de devolver la respuesta
      const safeUserData = { ...result.data };
      delete safeUserData.password;
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Usuario creado exitosamente',
          data: safeUserData
        }),
        {
          status: 201, // Created
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } else {
      // Devolver error
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error || 'Error al crear usuario'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (error) {
    console.error('Error en endpoint de registro:', error);
    
    // Devolver error genérico
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}