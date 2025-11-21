import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { resetPasswordStyles as styles } from '../Styles/ResetPasswordStyles';

export default function ResetPasswordView() {
  const navigation = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtenemos el token desde la navegación
  const resetToken = route.params?.token;

  useEffect(() => {
    if (!resetToken) {
      setMessage({
        type: 'warning',
        text: 'Token de restablecimiento no encontrado. Inicia el proceso de recuperación de nuevo.',
      });
      setTimeout(() => navigation.navigate('RecoverPassword'), 3000);
    }
  }, [resetToken, navigation]);

  const handleSubmit = async () => {
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'danger', text: 'Las contraseñas no coinciden.' });
      return;
    }

    if (!resetToken) {
      setMessage({ type: 'danger', text: 'Error de seguridad: Falta el token.' });
      return;
    }

    setLoading(true);

    try {
      // Simulación de petición a la API
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({
        type: 'success',
        text: 'Contraseña restablecida con éxito. Redirigiendo a iniciar sesión.',
      });

      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Hubo un error al intentar restablecer la contraseña.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.warningTitle}>Verificando seguridad...</Text>
        {message && (
          <Text style={[styles.alert, styles.alertWarning]}>{message.text}</Text>
        )}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logo}>
          <View style={styles.circle} />
          <Text style={styles.logoText}>Nombre</Text>
        </View>

        <Text style={styles.title}>Restablecer Contraseña</Text>

        {/* Mensajes */}
        {message && (
          <Text
            style={[
              styles.alert,
              message.type === 'success'
                ? styles.alertSuccess
                : message.type === 'danger'
                ? styles.alertDanger
                : styles.alertWarning,
            ]}
          >
            {message.text}
          </Text>
        )}

        {/* Nueva contraseña */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Confirmar contraseña */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Repetir Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Botón */}
        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading || !password || password !== confirmPassword}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1f1a1a" />
          ) : (
            <Text style={styles.buttonText}>Restablecer Contraseña</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}