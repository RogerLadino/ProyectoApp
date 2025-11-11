import axios from 'axios'; // Importa la librería Axios

// --- Configuración de la API ---
// ¡IMPORTANTE! Reemplaza esta URL por la URL base real de tu backend
const API_BASE_URL = "http://localhost:7206/api/"; 

// Crea una instancia de Axios con la URL base para simplificar futuras llamadas
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AUTH_ENDPOINTS = {
    login: "auth/login",     // Rutas relativas a API_BASE_URL
    register: "auth/register"
};
// ------------------------------

class AuthService {
    
    /**
     * @method login
     * Envía 'CorreoElectronico' y 'Clave' al servidor y almacena el 'Token'.
     * @param {string} correoElectronico 
     * @param {string} clave 
     * @returns {Promise<object>} Los datos de respuesta del servidor.
     */
    async login(correoElectronico, clave) {
        try {
            // Mapeo directo a los campos del Login.
            const loginData = {
                CorreoElectronico: correoElectronico, 
                Clave: clave
            };
            
            // Axios usa .post y envuelve los datos JSON automáticamente
            const response = await api.post(AUTH_ENDPOINTS.login, loginData);
            
            // La respuesta exitosa está en response.data.
            const data = response.data; // data es el LoginResponseDTO { Token: "..." }

            if (data.token) {
                // Almacena el token (o el objeto completo si incluye más datos)
                localStorage.setItem("userToken", data.token);
                // Si el backend devuelve más datos del usuario, puedes guardarlos:
                // localStorage.setItem("userData", JSON.stringify(data.userData));
            }

            return data;

        } catch (error) {
            // Axios envuelve los errores de respuesta en error.response
            if (error.response) {
                // El servidor respondió con un código de estado fuera de 2xx (ej: 401)
                console.error("Error de login:", error.response.data);
                // Lanza un error con el mensaje del backend o un mensaje por defecto
                throw new Error(error.response.data.message || "Credenciales inválidas.");
            } else {
                // Error de red, timeout, etc.
                console.error("Error de red o configuración:", error.message);
                throw new Error("No se pudo conectar con el servidor de autenticación.");
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
            // Envía el objeto userData, Axios lo serializa a JSON
            const response = await api.post(AUTH_ENDPOINTS.register, userData);
            
            return response.data; // Mensaje de éxito

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
     * Elimina el token del almacenamiento local para cerrar la sesión.
     */
    logout() {
        localStorage.removeItem("userToken");
    }

    /**
     * @method getCurrentToken
     * Recupera el token del usuario actualmente logueado.
     * @returns {string|null} El token JWT o null.
     */
    getCurrentToken() {
        return localStorage.getItem("userToken");
    }
}

export default new AuthService();

// --- Configuración Adicional de Axios (Recomendado) ---
// Opcionalmente, puedes configurar un interceptor para adjuntar el token 
// automáticamente a todas las peticiones que necesitan autenticación.

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("userToken");
        if (token) {
            // Adjunta el token en el encabezado 'Authorization' como 'Bearer [token]'
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);