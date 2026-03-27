import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetPasswordStyles as styles } from '../Styles/ResetPasswordStyles';

export default function RecoverPasswordView() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSendCode = async () => {
    setMessage(null);
    if (!email) {
      setMessage({ type: 'danger', text: 'Ingresa tu email.' });
      return;
    }
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1200));
      setMessage({ type: 'success', text: 'Código enviado. Revisa tu correo.' });
    } catch {
      setMessage({ type: 'danger', text: 'No se pudo enviar el código. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const isComplete = code.length === 6;

  // ✅ CP34 — Extraer ternaria anidada
  let alertStyle;

  if (message?.type === 'success') {
  alertStyle = styles.alertSuccess;
  } else if (message?.type === 'danger') {
  alertStyle = styles.alertDanger;
  } else {
  alertStyle = styles.alertWarning;
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <View style={styles.circle} />
          <Text style={styles.logoText}>Nombre</Text>
        </View>

        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.description}>
          Se te enviará un código de 6 dígitos a tu correo. Ingresa este código para recuperar tu cuenta.
        </Text>

        {message && (
          <Text style={[styles.alert, alertStyle]}>
            {message.text}
          </Text>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="nombre@ejemplo.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código</Text>
          <TextInput
            style={styles.otpInline}
            value={code}
            onChangeText={(t) =>
              setCode(t.replaceAll(/\D/g, '').slice(0, 6)) // ✅ CP35 y CP36: replaceAll + \D
            }
            keyboardType="numeric"
            maxLength={6}
            placeholder="••••••"
            placeholderTextColor="#aaa"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSendCode} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#1e1919" />
          ) : (
            <Text style={styles.buttonText}>Enviar Código</Text>
          )}
        </Pressable>

        {isComplete && (
          <Pressable
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => navigation.navigate('ResetPassword', { token: code })}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}