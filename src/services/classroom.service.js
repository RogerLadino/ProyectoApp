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

export const getMyClassrooms = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/classroom/my-classrooms`, getAuthHeaders()
    );
    console.log(response)
    
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mis clases:", error);
    return [];
  }
};


// 🟢 Crear una nueva clase (POST)
export const createClassroom = async (data) => {
  try {
    // POST requiere (URL, data, config)
    const response = await axios.post(`${API_URL}/api/classroom`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creando la clase:", error);
    throw error;
  }
};

export const joinClassroom = async (code) => {
  try {
    // POST requiere (URL, data, config) -> data es null o {} en este caso
    const response = await axios.post(`${API_URL}/api/classroom/join/${code}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error uniéndose a la clase:", error);
    throw error;
  }
};

export const getClassroomById = async (id) => {
  try {
    // GET requiere (URL, config)
    const response = await axios.get(`${API_URL}/api/classroom/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la clase con id ${id}:`, error);
    throw error;
  }
};

export const updateClassroom = async (id, data) => {
  try {
    // PUT requiere (URL, data, config)
    const response = await axios.put(`${API_URL}/api/classroom/${id}`, data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la clase con id ${id}:`, error);
    throw error;
  }
};

export const deleteClassroom = async (id) => {
  try {
    // DELETE requiere (URL, config)
    await axios.delete(`${API_URL}/api/classroom/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`❌ Error eliminando la clase con id ${id}:`, error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);
    throw error;
  }
};
