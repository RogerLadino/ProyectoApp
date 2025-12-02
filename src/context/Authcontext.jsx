import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Revisamos si hay token guardado al iniciar la app
    const loadSession = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
          // Aquí podrías llamar a tu API para obtener datos del usuario
        }
      } catch (error) {
        console.log('Error cargando sesión', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (userData) => {
    setUser(userData.user);
    setToken(userData.token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};