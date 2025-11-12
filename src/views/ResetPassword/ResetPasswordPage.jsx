import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Pressable, 
    ActivityIndicator,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, 
} from 'react-native';

// Importar estilos y constantes desde el archivo separado (asume que existe)
import { styles, COLORS, MIN_PASSWORD_LENGTH } from './ResetPasswordStyles';

// --- MOCK DE NAVEGACIÓN (Reemplazar con @react-navigation/native en tu proyecto) ---
const useNavigation = () => ({ 
    navigate: (screen, params) => console.log(`Navigating to ${screen} with:`, params),
    goBack: () => console.log('Going back'),
}); 

const useRoute = () => ({
    params: {
        // Valores mock: Asumimos que la página anterior pasó estos datos
        token: 'mock-token-123-valid', 
        email: 'usuario.demo@example.com', 
    }
}); 
// --- FIN MOCK DE NAVEGACIÓN ---


/**
 * Componente de pantalla para Restablecer Contraseña.
 * Requiere un token de verificación (pasado por navegación) para funcionar.
 */
function ResetPasswordPage() {
    const navigation = useNavigation();
    const route = useRoute();
    
    // Obtenemos el token y el email de la pantalla anterior
    const { token, email } = route.params || {};

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Chequeo de validez de formulario
    const isPasswordValid = newPassword.length >= MIN_PASSWORD_LENGTH;
    const doPasswordsMatch = newPassword === confirmPassword;
    
    const isFormValid = isPasswordValid && doPasswordsMatch && !loading;

    // 1. Verificación inicial del token (para redirigir si se intenta acceder directamente)
    useEffect(() => {
        if (!token) {
            setMessage({ type: 'warning', text: 'Token de restablecimiento no encontrado. Inicia el proceso de recuperación de nuevo.' });
            // Lógica de redirección aquí: setTimeout(() => navigation.navigate('RecoverPassword'), 3000); 
        }
    }, [token, navigation]);

    // Componente nativo para mostrar mensajes de alerta
    const AlertMessage = ({ message }) => (
        <View style={[
            styles.alert, 
            message.type === 'success' ? styles.alertSuccess : (message.type === 'warning' ? styles.alertWarning : styles.alertDanger)
        ]}>
            <Text style={[styles.alertText, message.type === 'warning' && {color: COLORS.ALERT_WARNING_TEXT}]}>{message.text}</Text>
        </View>
    );

    // --- Lógica de la API (SIMULADA) ---

    const apiCallSimulated = async (data) => {
        // Simulación de latencia
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // Simulación de validación
        if (!data.token || data.token === 'invalid-token') {
            throw new Error('Token de verificación inválido o expirado.');
        }

        if (data.newPassword.length < MIN_PASSWORD_LENGTH) {
            throw new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
        }
        
        // Simulación de éxito
        return { message: 'Tu contraseña ha sido restablecida con éxito.' };
    };

    const handleResetPassword = async () => {
        if (!isPasswordValid) {
            setMessage({ type: 'danger', text: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.` });
            return;
        }
        if (!doPasswordsMatch) {
            setMessage({ type: 'danger', text: 'Las contraseñas no coinciden.' });
            return;
        }
        if (!token) {
            setMessage({ type: 'danger', text: 'Error de seguridad: Falta el token. Intenta recuperar de nuevo.' });
            return;
        }

        setMessage(null);
        setLoading(true);

        try {
            // Reemplazar esta llamada simulada por tu lógica real de API (Axios/Fetch)
            const response = await apiCallSimulated({ 
                email,
                token, 
                newPassword, 
            });
            
            setMessage({ type: 'success', text: response.message + ' Redirigiendo...' });
            
            // Éxito: Redirigir a la pantalla de Login después de un pequeño retraso (simulado)
            setTimeout(() => {
                navigation.navigate('Login'); 
            }, 2000);

        } catch (error) {
            console.error('Error al restablecer contraseña (simulado):', error.message);
            setMessage({ type: 'danger', text: error.message || 'Error al restablecer la contraseña. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
        }
    };
    
    // Renderizado condicional si no hay token (mostrando mensaje de advertencia)
    if (!token && !message) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingVertical: 100 }]}>
                    <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                    <Text style={[styles.description, { marginTop: 20 }]}>Verificando token de seguridad...</Text>
                </View>
            </SafeAreaView>
        );
    }
    
    // Si el token es nulo y ya hay un mensaje de error (ej: 'warning' de useEffect)
    if (!token) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <Text style={[styles.title, { marginBottom: 20 }]}>Acceso Denegado</Text>
                    {message && <AlertMessage message={message} />}
                    <Pressable 
                        onPress={() => navigation.goBack()}
                        style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.7 }]}
                    >
                        <Text style={styles.linkBtnText}>Volver a Recuperación</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }


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

                    <Text style={styles.title}>Establecer Nueva Contraseña</Text>
                    <Text style={styles.description}>
                        Ingresa una nueva contraseña para tu cuenta asociada al email: 
                        <Text style={{fontWeight: 'bold', color: COLORS.PRIMARY}}>{email}</Text>
                    </Text>

                    {/* Mensajes de Estado */}
                    {message && <AlertMessage message={message} />}

                    <View style={styles.form}>
                        
                        {/* Campo Nueva Contraseña */}
                        <View style={styles.inputLabel}>
                            <View style={styles.circleEmpty}></View>
                            <Text style={styles.labelText}>Nueva Contraseña (mín. {MIN_PASSWORD_LENGTH} caracteres)</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={[styles.formControl, !isPasswordValid && newPassword.length > 0 && {borderColor: COLORS.ALERT_DANGER_BG}]}
                                secureTextEntry
                                autoCapitalize="none"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                editable={!loading}
                                placeholder="Tu nueva contraseña"
                                placeholderTextColor={COLORS.PLACEHOLDER}
                            />
                        </View>
                        
                        {/* Campo Confirmar Contraseña */}
                        <View style={styles.inputLabel}>
                            <View style={styles.circleEmpty}></View>
                            <Text style={styles.labelText}>Confirmar Contraseña</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={[styles.formControl, !doPasswordsMatch && confirmPassword.length > 0 && {borderColor: COLORS.ALERT_DANGER_BG}]}
                                secureTextEntry
                                autoCapitalize="none"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                editable={!loading}
                                placeholder="Confirma tu nueva contraseña"
                                placeholderTextColor={COLORS.PLACEHOLDER}
                            />
                        </View>

                        {/* Botón de Acción */}
                        <View style={styles.buttonGroup}>
                            <Pressable
                                onPress={handleResetPassword}
                                style={({ pressed }) => [
                                    styles.verifyBtn, 
                                    (!isFormValid || loading) && styles.btnDisabled,
                                    pressed && { opacity: 0.8 }
                                ]}
                                disabled={!isFormValid || loading}
                            >
                                {loading ? (
                                    <View style={styles.loadingContent}>
                                        <ActivityIndicator color={COLORS.TEXT_DARK} size="small" style={{ marginRight: 8 }} />
                                        <Text style={styles.verifyBtnText}>Guardando...</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.verifyBtnText}>Restablecer Contraseña</Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ResetPasswordPage;