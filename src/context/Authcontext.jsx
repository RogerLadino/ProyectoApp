import React, { createContext, useState, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import * as authService from '../services/auth.service';
import { getUserProfile } from '../services/user.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { token } = await authService.login(email, password); // ✅ userData eliminado
      await AsyncStorage.setItem('token', token);

      // Obtener el perfil completo del usuario después del login
      const profile = await getUserProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error en login:', error);
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      await authService.register(userData);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ CP46: Memoizar objeto value
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      register,
    }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ CP43: Validación de children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
