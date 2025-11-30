import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constant/api.config";

export async function getUserProfile() {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/Auth/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching classroom:", error);
    throw error;
  }
}

