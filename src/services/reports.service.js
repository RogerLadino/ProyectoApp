import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constant/api.config";

export async function getClassroomSubmissions(classroomId) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/classroom/${classroomId}/submissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}