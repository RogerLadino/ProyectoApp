import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://localhost:7206";

// Configurar timeout
axios.defaults.timeout = 10000;

// Definimos la configuración para la cabecera JWT
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// 🔵 Obtener las clases del usuario actual
export const getMyClassrooms = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/api/classroom/my-classrooms`, headers);
    console.log("Clases obtenidas:", response.data);
    
    // El backend ya incluye el objeto teacher con firstName y lastName
    const classroomsWithTeacher = response.data.map(classroom => {
      const firstName = classroom.teacher?.firstName || '';
      const lastName = classroom.teacher?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Desconocido';
      
      return {
        ...classroom,
        teacherName: fullName
      };
    });
    
    return classroomsWithTeacher;
  } catch (error) {
    console.error("Error obteniendo mis clases:", error);
    return [];
  }
};

// 🟢 Crear una nueva clase (POST)
export const createClassroom = async (data) => {
  try {
    const headers = await getAuthHeaders();
    // POST requiere (URL, data, config)
    const response = await axios.post(`${API_URL}/api/classroom`, data, headers);
    return response.data;
  } catch (error) {
    console.error("Error creando la clase:", error);
    throw error;
  }
};

// 🟢 Unirse a una clase con código (POST)
export const joinClassroom = async (code) => {
  try {
    const headers = await getAuthHeaders();
    // POST requiere (URL, data, config) -> data es {} en este caso
    const response = await axios.post(`${API_URL}/api/classroom/join/${code}`, {}, headers);
    return response.data;
  } catch (error) {
    console.error("Error uniéndose a la clase:", error);
    throw error;
  }
};

// 🔵 Obtener una clase por ID (GET)
export const getClassroomById = async (id) => {
  try {
    const headers = await getAuthHeaders();
    // GET requiere (URL, config)
    const response = await axios.get(`${API_URL}/api/classroom/${id}`, headers);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la clase con id ${id}:`, error);
    throw error;
  }
};

// 🟠 Actualizar clase (PUT)
export const updateClassroom = async (id, data) => {
  try {
    const headers = await getAuthHeaders();
    // PUT requiere (URL, data, config)
    const response = await axios.put(`${API_URL}/api/classroom/${id}`, data, headers);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la clase con id ${id}:`, error);
    throw error;
  }
};

// 🔴 Eliminar clase (DELETE)
export const deleteClassroom = async (id) => {
  try {
    console.log("🗑️ deleteClassroom llamado con ID:", id);
    const headers = await getAuthHeaders();
    console.log("🗑️ Headers para DELETE:", headers);
    const response = await axios.delete(`${API_URL}/api/classroom/${id}`, headers);
    console.log("🗑️ Respuesta DELETE:", response);
    return response.data;
  } catch (error) {
    console.error(`❌ Error eliminando la clase con id ${id}:`, error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);
    throw error;
  }
};