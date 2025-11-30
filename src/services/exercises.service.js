import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constant/api.config";

export async function getExercisesByClassroom(classroomId) {
  console.log(classroomId)
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/classroom/${classroomId}/exercise`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('hello')
    console.error("Error fetching exercises:", error);
    throw error;
  }
}

export async function getExercisesById(classroomId, exerciseId) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/classroom/${classroomId}/exercise/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
}

export async function createExercise(classroomId, name, description, dueDate, testCases) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/api/classroom/${classroomId}/exercise`,
      {
        classroomId,
        name,
        description,
        dueDate,
        testCases,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating exercise:", error);
    throw error;
  }
}

export const updateExercise = async (
  classroomId,
  exerciseId,
  name,
  description,
  dueDate,
  testCases
) => {
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/api/classroom/${classroomId}/exercise/${exerciseId}`,
      {
        classroomId,
        id: exerciseId,
        name,
        description,
        dueDate,
        testCases,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el ejercicio:", error);
    throw error;
  }
};

export async function deleteExercise(classroomId, exerciseId) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/api/classroom/${classroomId}/exercise/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    throw error;
  }
}

AsyncStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMDAyIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6IlByb2Zlc29yIiwibmJmIjoxNzY0MDMwOTUxLCJleHAiOjE3NjQwNjY5NTEsImlhdCI6MTc2NDAzMDk1MSwiaXNzIjoiUHJveWVjdG8iLCJhdWQiOiJVc3VhcmlvcyJ9.9uTCDv2QmeWdmk1bpG52ISZ3OSRLvBydB3jaee5lGQs")
