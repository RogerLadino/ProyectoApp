import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { recoverPasswordStyles as styles } from '../Styles/RecoverPasswordStyles'; 

const CODE_LENGTH = 6;

export default function RecoverPasswordView() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(new Array(CODE_LENGTH).fill(''));
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('sendCode'); // 'sendCode' o 'verifyCode'

  const inputRefs = useRef([]);

  const fullCode = verificationCode.join('');

  const handleCodeChange = (value, index) => {
    if (/[^0-9]/.test(value)) return; // Solo números

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Mover al siguiente input
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Retroceder si se borra
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async () => {
    setMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/recover/send-code`, { email });
      setMessage({ type: 'success', text: response.data.message || 'Código enviado. Revisa tu correo.' });
      setStep('verifyCode');
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      console.error('Error al enviar código:', error);
      const msg = error.response?.data?.message || 'Error al enviar código. Verifica el email.';
      setMessage({ type: 'danger', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (fullCode.length !== CODE_LENGTH) {
      setMessage({ type: 'danger', text: 'El código debe tener 6 dígitos.' });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/recover/verify-code`, {
        email,
        code: fullCode
      });

      setMessage({ type: 'success', text: 'Código verificado. Redirigiendo...' });
      navigation.navigate('ResetPassword', { token: response.data.resetToken });
    } catch (error) {
      console.error('Error al verificar código:', error);
      const msg = error.response?.data?.message || 'Código incorrecto o expirado.';
      setMessage({ type: 'danger', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.circle} />
          <Text style={styles.brand}>Nombre</Text>
        </View>

        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.description}>
          Se te enviará un código de {CODE_LENGTH} dígitos a tu correo. Ingresa este código para recuperar tu cuenta.
        </Text>

        {/* Mensajes */}
        {message && (
          <Text style={[styles.alert, message.type === 'success' ? styles.alertSuccess : styles.alertDanger]}>
            {message.text}
          </Text>
        )}

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={step === 'sendCode' && !loading}
        />

        {/* Código */}
        <View style={styles.codeContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(val) => handleCodeChange(val, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              editable={step === 'verifyCode' && !loading}
            />
          ))}
        </View>

        {/* Botón */}
        {step === 'sendCode' && (
          <Pressable style={styles.button} onPress={handleSendCode} disabled={loading || !email}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Enviar Código</Text>}
          </Pressable>
        )}

        {step === 'verifyCode' && (
          <Pressable style={styles.buttonSuccess} onPress={handleVerifyCode} disabled={loading || fullCode.length !== CODE_LENGTH}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Verificar Código</Text>}
          </Pressable>
        )}

        {/* Re-enviar */}
        {step === 'verifyCode' && !loading && (
          <Pressable
            style={styles.linkButton}
            onPress={() => {
              setStep('sendCode');
              setMessage(null);
              setVerificationCode(new Array(CODE_LENGTH).fill(''));
            }}
          >
            <Text style={styles.footerLink}>Cambiar Email o Re-enviar Código</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}