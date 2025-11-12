import axios from 'axios';
// *** CAMBIO CLAVE RN: Usamos AsyncStorage para persistencia en móvil ***
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Configuración de la API ---
// ¡IMPORTANTE! Reemplaza esta URL por la URL base real de tu backend
// NOTA RN: 'localhost' no funciona en emuladores/dispositivos. Usa tu IP local o dominio.
const API_BASE_URL = "http://localhost:7206/api/"; 

// Crea una instancia de Axios con la URL base
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AUTH_ENDPOINTS = {
    login: "auth/login", 
    register: "auth/register"
};
// ------------------------------

class AuthService {
    
    /**
     * @method login
     * Envía 'CorreoElectronico' y 'Clave' al servidor y almacena el 'Token' de forma asíncrona.
     * @param {string} correoElectronico 
     * @param {string} clave 
     * @returns {Promise<object>} Los datos de respuesta del servidor.
     */
    async login(correoElectronico, clave) {
        try {
            const loginData = {
                CorreoElectronico: correoElectronico, 
                Clave: clave
            };
            
            const response = await api.post(AUTH_ENDPOINTS.login, loginData);
            const data = response.data;

            if (data.token) {
                // *** CAMBIO CLAVE RN: AsyncStorage.setItem es asíncrono ***
                await AsyncStorage.setItem("userToken", data.token);
            }

            return data;

        } catch (error) {
            if (error.response) {
                console.error("Error de login:", error.response.data);
                throw new Error(error.response.data.message || "Credenciales inválidas.");
            } else {
                console.error("Error de red o configuración:", error.message);
                throw new Error("No se pudo conectar con el servidor de autenticación. Verifica la URL de la API.");
            }
        }
    }

    /**
     * @method register
     * Envía todos los campos del RegistroDTO al servidor.
     * @param {object} userData - Objeto que contiene todos los campos del RegistroDTO.
     * @returns {Promise<object>} Los datos de respuesta del servidor.
     */
    async register(userData) {
        try {
            const response = await api.post(AUTH_ENDPOINTS.register, userData);
            return response.data;

        } catch (error) {
            if (error.response) {
                console.error("Error de registro:", error.response.data);
                throw new Error(error.response.data.message || "Error al registrar el usuario.");
            } else {
                throw new Error("No se pudo completar el registro debido a un error de red.");
            }
        }
    }

    /**
     * @method logout
     * Elimina el token del almacenamiento local de forma asíncrona.
     */
    async logout() {
        // *** CAMBIO CLAVE RN: AsyncStorage.removeItem es asíncrono ***
        await AsyncStorage.removeItem("userToken");
    }

    /**
     * @method getCurrentToken
     * Recupera el token del usuario actualmente logueado de forma asíncrona.
     * @returns {Promise<string|null>} El token JWT o null.
     */
    async getCurrentToken() {
        // *** CAMBIO CLAVE RN: AsyncStorage.getItem es asíncrono ***
        return await AsyncStorage.getItem("userToken");
    }
}

const authService = new AuthService();
export default authService;

// --- Configuración Adicional de Axios (Adaptado) ---
// Interceptor para adjuntar el token automáticamente.
api.interceptors.request.use(
    async config => {
        // *** CAMBIO CLAVE RN: La obtención del token ahora es asíncrona ***
        const token = await authService.getCurrentToken(); 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);