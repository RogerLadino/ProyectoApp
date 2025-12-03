import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { loginStyles as styles } from '../Styles/LoginStyles';

export default function LoginView() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async () => {
    setMessage(null);
    setLoading(true);

    try {
      await login(credentials.email, credentials.password);
      setMessage({ type: 'success', text: '¡Inicio de sesión exitoso!' });
    } catch (error) {
      const errorMsg = error.message || 'Credenciales inválidas. Inténtalo de nuevo.';
      setMessage({ type: 'danger', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        {/* Logo */}
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.logo}>
          <View style={styles.circle} />
          <Text style={styles.logoText}>Nombre</Text>
        </Pressable>

        <Text style={styles.title}>Iniciar Sesión</Text>

        {/* Mensaje */}
        {message && (
          <Text style={[styles.alert, message.type === 'success' ? styles.alertSuccess : styles.alertDanger]}>
            {message.text}
          </Text>
        )}

        {/* Email */}
        <View style={styles.inputGroup}>
          <View style={styles.label}>
            <View style={styles.dot} />
            <Text style={styles.labelText}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="nombre@ejemplo.com"
            placeholderTextColor="#aaa"
            value={credentials.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Contraseña */}
        <View style={styles.inputGroup}>
          <View style={styles.label}>
            <View style={styles.dot} />
            <Text style={styles.labelText}>Contraseña</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            value={credentials.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry
          />
        </View>

        {/* Botón */}
        <Pressable style={styles.button} onPress={handleLoginSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#1f1a1a" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </Pressable>

        {/* Enlaces */}
        <View style={styles.footerLinks}>
          <Text style={styles.footerText}>
            ¿No tienes una cuenta?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
              ¡Regístrate!
            </Text>
          </Text>
          <Text style={styles.footerText}>
            ¿Olvidaste tu contraseña?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('RecoverPassword')}>
              ¡Recupérala!
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}