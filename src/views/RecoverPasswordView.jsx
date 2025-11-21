import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async () => {
    setMessage(null);
    setLoading(true);

    try {
      // Simulación de envío de código
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ type: 'success', text: 'Código enviado. Revisa tu correo.' });
      setStep('verifyCode');
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al enviar código. Verifica el email.' });
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
      // Simulación de verificación
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ type: 'success', text: 'Código verificado. Redirigiendo...' });
      setTimeout(() => navigation.navigate('ResetPassword'), 2000);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Código incorrecto o expirado.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logo}>
          <View style={styles.circle} />
          <Text style={styles.logoText}>Nombre</Text>
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@ejemplo.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            editable={step === 'sendCode' && !loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Código */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código de verificación</Text>
          <View style={styles.codeInputs}>
            {verificationCode.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={value => handleCodeChange(value, index)}
                ref={el => (inputRefs.current[index] = el)}
                editable={step === 'verifyCode' && !loading}
              />
            ))}
          </View>
        </View>

        {/* Botones */}
        {step === 'sendCode' && (
          <Pressable style={styles.button} onPress={handleSendCode} disabled={loading || !email}>
            {loading ? <ActivityIndicator size="small" color="#1f1a1a" /> : <Text style={styles.buttonText}>Enviar Código</Text>}
          </Pressable>
        )}

        {step === 'verifyCode' && (
          <Pressable
            style={[styles.button, styles.verifyButton]}
            onPress={handleVerifyCode}
            disabled={loading || fullCode.length !== CODE_LENGTH}
          >
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Verificar Código</Text>}
          </Pressable>
        )}

        {/* Reenviar */}
        {step === 'verifyCode' && !loading && (
          <Pressable
            style={styles.linkButton}
            onPress={() => {
              setStep('sendCode');
              setMessage(null);
              setVerificationCode(new Array(CODE_LENGTH).fill(''));
            }}
          >
            <Text style={styles.linkText}>Cambiar Email o Re-enviar Código</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}