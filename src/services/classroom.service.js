import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constant/api.config";

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
    const config = await getAuthHeaders();
    const response = await axios.get(
      `${API_URL}/api/classroom/my-classrooms`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mis clases:", error);
    return [];
  }
};

export const createClassroom = async (data) => {
  try {
    const config = await getAuthHeaders();
    const response = await axios.post(
      `${API_URL}/api/classroom`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creando la clase:", error);
    throw error;
  }
};

export const joinClassroom = async (code) => {
  try {
    const config = await getAuthHeaders();
    const response = await axios.post(
      `${API_URL}/api/classroom/join/${code}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error uniéndose a la clase:", error);
    throw error;
  }
};

export const getClassroomById = async (id) => {
  try {
    const config = await getAuthHeaders();
    const response = await axios.get(
      `${API_URL}/api/classroom/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la clase con id ${id}:`, error);
    throw error;
  }
};

export const updateClassroom = async (id, data) => {
  try {
    const config = await getAuthHeaders();
    const response = await axios.put(
      `${API_URL}/api/classroom/${id}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la clase con id ${id}:`, error);
    throw error;
  }
};

export const deleteClassroom = async (id) => {
  try {
    const config = await getAuthHeaders();
    await axios.delete(`${API_URL}/api/classroom/${id}`, config);
  } catch (error) {
    console.error(`Error eliminando la clase con id ${id}:`, error);
    throw error;
  }
};
