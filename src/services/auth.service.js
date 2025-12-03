import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base de tu API
const API_URL = 'https://localhost:7206';

export const login = async (email, password) => {
  try {
    console.log('Intentando login con:', { email });
    // Backend espera correoElectronico y clave
    const res = await axios.post(`${API_URL}/api/Auth/login`, { 
      correoElectronico: email, 
      clave: password 
    });
    console.log('Respuesta login:', res.data);
    
    const token = res.data.token || res.data.Token || res.data;
    const user = res.data.user || res.data.User || null;

    // Guardamos token en almacenamiento seguro
    await AsyncStorage.setItem('token', token);

    return { token, user };
  } catch (error) {
    console.error('Error detallado login:', error.response?.data);
    console.error('Errores de validación:', error.response?.data?.errors);
    throw error;
  }
};

export const register = async (data) => {
  try {
    console.log('Intentando registro con:', data);
    const res = await axios.post(`${API_URL}/api/Auth/registro`, data);
    console.log('Respuesta registro:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error detallado registro:', error.response?.data);
    console.error('Errores de validación:', error.response?.data?.errors);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`${API_URL}/Auth/forgot-password`, { email });
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await axios.post(`${API_URL}/Auth/reset-password`, data);
  return res.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};