import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Definimos la configuración para la cabecera JWT una sola vez
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  };
};

// 🔵 Obtener las clases del usuario actual
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

// 🟢 Unirse a una clase con código (POST)
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

// 🔵 Obtener una clase por ID (GET)
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

// 🟠 Actualizar clase (PUT)
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

// 🔴 Eliminar clase (DELETE)
export const deleteClassroom = async (id) => {
  try {
    // DELETE requiere (URL, config)
    await axios.delete(`${API_URL}/api/classroom/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`Error eliminando la clase con id ${id}:`, error);
    throw error;
  }
};