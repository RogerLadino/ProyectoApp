import axios from "axios";
// Importamos el servicio de autenticación para acceder al token de forma asíncrona
import authService from './auth.service';

// Dado que el servicio original usaba VITE_API_URL, 
// usaremos una URL base hardcodeada temporalmente para RN.
// En un proyecto real, esto se manejaría con 'react-native-dotenv' o 'expo-constants'.
const API_BASE_URL = "http://localhost:7206"; // Asumiendo que esta es la base antes de /api/Auth

/**
 * @method getUserProfile
 * Obtiene el perfil del usuario utilizando el token JWT almacenado.
 * @returns {Promise<object>} Los datos del perfil del usuario.
 */
export async function getUserProfile() {
  try {
    // *** CAMBIO CLAVE RN: Obtenemos el token de forma asíncrona desde el servicio ***
    const token = await authService.getCurrentToken(); 
    
    // Verificación de token antes de la llamada (práctica recomendada)
    if (!token) {
        throw new Error("Usuario no autenticado. Token no encontrado.");
    }
    
    // El endpoint es: [API_BASE_URL]/api/Auth/perfil
    const response = await axios.get(`${API_BASE_URL}/api/Auth/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    // Si es un 401 (Unauthorized), podríamos forzar el logout aquí
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Si el token expiró o es inválido, forzamos el cierre de sesión
        // await authService.logout(); 
    }
    throw error;
  }
}

