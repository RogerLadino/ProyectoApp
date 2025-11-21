import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base de tu API (ajústala según tu backend)
const API_URL = 'http://localhost:7206/api/';

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  const { token, user } = res.data;

  // Guardamos token en almacenamiento seguro
  await AsyncStorage.setItem('token', token);

  return { token, user };
};

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_URL}/forgot-password`, { email });
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await axios.post(`${API_URL}/reset-password`, data);
  return res.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};