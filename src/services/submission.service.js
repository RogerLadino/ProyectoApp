import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getSubmissionById(exerciseId) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/exercise/${exerciseId}/submission/user`, {
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

export async function getSubmissionByUserId(exerciseId, userId) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/exercise/${exerciseId}/submission/user/${userId}`, {
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



export async function getSubmissions(exerciseId) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/exercise/${exerciseId}/submission`, {
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

export const assignGrade = async (
  exerciseId,
  appUserId,
  grade,
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/api/exercise/${exerciseId}/submission`,
      {
        appUserId,
        grade
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al asignar nota:", error);
    throw error;
  }
};


