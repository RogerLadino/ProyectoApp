import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Pressable, 
    ActivityIndicator,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

// Importar estilos y constantes desde el archivo separado (RecoverPasswordStyles.js)
import { styles, COLORS, CODE_LENGTH } from './RecoverPasswordStyles';

// NOTA: Se ha simulado la navegación y las llamadas API ya que este entorno no soporta 
// @react-navigation/native ni Axios. En tu proyecto, reemplaza este mock.
const useNavigation = () => ({ 
    navigate: (screen, params) => console.log(`Navigating to ${screen} with:`, params) 
}); 

/**
 * Componente de pantalla para Recuperación de Contraseña (2 pasos: Enviar Código y Verificar Código).
 * Listo para ser usado como una pantalla en React Native.
 */
function RecoverPasswordPage() {
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(new Array(CODE_LENGTH).fill('')); // Estado para los 6 inputs
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('sendCode'); // 'sendCode' o 'verifyCode'

    // Ref para manejar el enfoque (focus) entre los inputs del código
    const inputRefs = useRef([]);

    // Combina los 6 inputs del array en una sola cadena de código
    const fullCode = verificationCode.join('');

    // --- Lógica de Foco Automático y Manejo de Input para OTP ---

    const handleCodeChange = (text, index) => {
        // Adaptamos tu lógica: solo permitir números y limitar a un dígito
        const value = text.replace(/[^0-9]/g, '').slice(0, 1);
        
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Mover el foco al siguiente input automáticamente
        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }, index) => {
        // Manejar el retroceso (Backspace) para moverse hacia atrás y borrar el campo anterior
        if (key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            
            // Borrar el contenido del campo anterior (Experiencia mejorada)
            const newCode = [...verificationCode];
            newCode[index - 1] = '';
            setVerificationCode(newCode);
        }
    };

    // Efecto para enfocar el primer campo OTP al cambiar de paso
    useEffect(() => {
        if (step === 'verifyCode' && inputRefs.current[0]) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [step]);
    
    // --- Lógica de la API (SIMULADA, reemplazar por Axios/Fetch en RN) ---

    const apiCallSimulated = async (endpoint, data) => {
        // Simulación de latencia
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        if (endpoint === 'sendCode') {
            if (data.email.toLowerCase().includes('error')) {
                throw new Error('Email no registrado en el sistema (Simulación).');
            }
            return { message: 'Código enviado. Revisa tu correo.' };
        }
        
        if (endpoint === 'verifyCode') {
            // Simulación de código correcto
            if (data.code !== '123456') { 
                throw new Error('Código incorrecto o expirado (Simulación).');
            }
            return { message: 'Verificación exitosa.', resetToken: 'mock-token-123' };
        }
        throw new Error('Error de servidor simulado desconocido.');
    };

    const handleSendCode = async () => {
        if (!email) {
            setMessage({ type: 'danger', text: 'Ingresa un correo electrónico.' });
            return;
        }
        
        setMessage(null);
        setLoading(true);

        try {
            // Reemplazar esta llamada simulada por tu lógica real de Axios o Fetch
            const response = await apiCallSimulated('sendCode', { email });
            setMessage({ type: 'success', text: response.message });
            setStep('verifyCode');

        } catch (error) {
            console.error('Error al enviar código (simulado):', error.message);
            setMessage({ type: 'danger', text: error.message || 'Error al enviar código.' });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (fullCode.length !== CODE_LENGTH) {
            setMessage({ type: 'danger', text: `El código debe tener ${CODE_LENGTH} dígitos.` });
            return;
        }

        setMessage(null);
        setLoading(true);

        try {
            // Reemplazar esta llamada simulada por tu lógica real de Axios o Fetch
            const response = await apiCallSimulated('verifyCode', { email, code: fullCode });
            
            setMessage({ type: 'success', text: 'Código verificado. Redirigiendo...' });
            
            // Redirigir al componente de restablecimiento
            setTimeout(() => {
                // Navegación simulada
                navigation.navigate('ResetPassword', { token: response.resetToken, email: email });
            }, 1500);

        } catch (error) {
            console.error('Error al verificar código (simulado):', error.message);
            setMessage({ type: 'danger', text: error.message || 'Código incorrecto o expirado.' });
        } finally {
            setLoading(false);
        }
    };
    
    // Componente nativo para mostrar mensajes de alerta
    const AlertMessage = ({ message }) => (
        <View style={[
            styles.alert, 
            message.type === 'success' ? styles.alertSuccess : styles.alertDanger
        ]}>
            <Text style={styles.alertText}>{message.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                style={styles.wrapper}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0} 
            >
                <View style={styles.container}>
                    
                    {/* Logo */}
                    <Pressable onPress={() => navigation.navigate('Home')} style={styles.logo}>
                        <View style={styles.circle}></View>
                        <Text style={styles.brandText}>Nombre</Text>
                    </Pressable>

                    <Text style={styles.title}>Recuperar Contraseña</Text>
                    <Text style={styles.description}>
                        Se te enviará un código de {CODE_LENGTH} dígitos a tu correo. Ingresa este código para recuperar tu cuenta.
                    </Text>

                    {/* Mensajes de Estado */}
                    {message && <AlertMessage message={message} />}

                    <View style={styles.form}>
                        
                        {/* Campo Email */}
                        <View style={styles.inputLabel}>
                            <View style={styles.circleEmpty}></View>
                            <Text style={styles.labelText}>Email</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={[styles.formControl, step === 'verifyCode' && styles.inputDisabled]}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                editable={step === 'sendCode' && !loading}
                                placeholder="ejemplo@correo.com"
                                placeholderTextColor="#a0a0a0"
                            />
                            {/* El botón de enviar del formulario web se ha movido al botón de Pressable principal */}
                        </View>

                        {/* Sección del Código de Verificación (OTP) */}
                        <View style={styles.codeSection}>
                            <View style={styles.inputLabel}>
                                <View style={styles.circleEmpty}></View>
                                <Text style={styles.labelText}>Código de verificación</Text>
                            </View>
                            <View style={styles.codeInputs}>
                                {verificationCode.map((digit, index) => (
                                    <TextInput 
                                        key={index}
                                        style={styles.codeInput}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        value={digit}
                                        onChangeText={(text) => handleCodeChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        editable={step === 'verifyCode' && !loading}
                                        ref={el => inputRefs.current[index] = el}
                                        // autoFocus={step === 'verifyCode' && index === 0} // Se maneja con useEffect
                                        placeholderTextColor="#a0a0a0"
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Botones de Acción */}
                        <View style={styles.buttonGroup}>
                            
                            {/* Botón ENVIAR CÓDIGO (Paso 1) */}
                            {step === 'sendCode' && (
                                <Pressable
                                    onPress={handleSendCode}
                                    style={({ pressed }) => [
                                        styles.submitBtn,
                                        (!email || loading) && styles.btnDisabled,
                                        pressed && { opacity: 0.8 }
                                    ]}
                                    disabled={!email || loading}
                                >
                                    {loading ? (
                                        <View style={styles.loadingContent}>
                                            <ActivityIndicator color={COLORS.TEXT_DARK} size="small" style={{ marginRight: 8 }} />
                                            <Text style={styles.submitBtnText}>Enviando...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.submitBtnText}>Enviar Código</Text>
                                    )}
                                </Pressable>
                            )}

                            {/* Botón VERIFICAR CÓDIGO (Paso 2) */}
                            {step === 'verifyCode' && (
                                <Pressable
                                    onPress={handleVerifyCode}
                                    style={({ pressed }) => [
                                        styles.verifyBtn,
                                        (fullCode.length !== CODE_LENGTH || loading) && styles.btnDisabled,
                                        pressed && { opacity: 0.8 }
                                    ]}
                                    disabled={fullCode.length !== CODE_LENGTH || loading}
                                >
                                    {loading ? (
                                        <View style={styles.loadingContent}>
                                            <ActivityIndicator color={COLORS.TEXT_WHITE} size="small" style={{ marginRight: 8 }} />
                                            <Text style={styles.verifyBtnText}>Verificando...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.verifyBtnText}>Verificar Código</Text>
                                    )}
                                </Pressable>
                            )}

                        </View>
                    </View>
                    
                    {/* Opción para re-enviar el código */}
                    {step === 'verifyCode' && !loading && (
                        <Pressable 
                            onPress={() => {
                                setStep('sendCode'); 
                                setMessage(null);
                                setVerificationCode(new Array(CODE_LENGTH).fill(''));
                            }}
                            style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.7 }]}
                        >
                            <Text style={styles.linkBtnText}>Cambiar Email o Re-enviar Código</Text>
                        </Pressable>
                    )}

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RecoverPasswordPage;