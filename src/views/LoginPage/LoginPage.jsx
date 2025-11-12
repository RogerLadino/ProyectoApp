import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert // Usamos Alert para la simulación, pero se recomienda un Modal nativo
} from 'react-native';
// Reemplazamos 'react-router-dom' por el hook de navegación de React Navigation
import { useNavigation } from '@react-navigation/native'; 
// Usaremos 'axios' real si estuviera disponible, pero lo simularemos aquí.

// Importa los estilos de la sección 2.
import { loginStyles } from './LoginStyles'; 

// --- Configuración (Reemplazar con tus variables de entorno y almacenamiento) ---
// const API_URL = import.meta.env.VITE_API_URL; // Reemplazado por una constante simulada
const SIMULATED_API_URL = 'http://simulated-api.com/v1'; 
// ---------------------------------------------------------------------------------

/**
 * Vista de Inicio de Sesión adaptada a React Native.
 */
function LoginPage() {
  const navigation = useNavigation(); 
  const [message, setMessage] = useState(null); 
  const [loading, setLoading] = useState(false);  

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async () => {
    setMessage(null); 
    setLoading(true); 

    try {
      // --- INICIO: LÓGICA DE API (Usar axios o fetch en tu entorno) ---
      
      // Simulamos la llamada a la API y el tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulación de respuesta real:
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        const simulatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_token_12345';
        
        // En React Native, reemplaza 'localStorage.setItem' por AsyncStorage o SecureStore
        // await AsyncStorage.setItem('token', simulatedToken); 
        console.log('Token guardado (simulado):', simulatedToken);

        setMessage({ type: 'success', text: '¡Inicio de sesión exitoso! Redirigiendo...' });
        
        setTimeout(() => {
            // Reemplaza 'navigate('/clases')' por el nombre de la ruta nativa
            navigation.navigate('Clases'); 
        }, 1500); 

      } else {
        // Simulación de error 401
        throw { 
            response: { 
                status: 401, 
                data: { message: 'Credenciales inválidas. Verifica tu email y contraseña.' } 
            } 
        };
      }
      // --- FIN: LÓGICA DE API ---

    } catch (error) {
      console.error('Error de inicio de sesión:', error);

      let errorMessage = 'Hubo un error de red o del servidor. Inténtalo de nuevo.';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; 
        }
      } else if (error.message) {
         // Captura errores lanzados directamente por la simulación
         errorMessage = error.message;
      }
      
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false); 
    }
  };

  // Componente de mensaje de alerta nativo
  const AlertMessage = ({ message }) => (
    <View style={[
        loginStyles.alert, 
        message.type === 'success' ? loginStyles.alertSuccess : loginStyles.alertDanger
    ]}>
        <Text style={loginStyles.alertText}>{message.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <KeyboardAvoidingView 
          style={loginStyles.loginWrapper}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.loginContainer}> 
          
          {/* Logo y Nombre */}
          <Pressable 
            onPress={() => navigation.navigate('Home')} // Navegación nativa
            style={loginStyles.logoLink}
          >
            <View style={loginStyles.circle}></View>
            <Text style={loginStyles.logoText}>Nombre</Text>
          </Pressable>

          <Text style={loginStyles.title}>Iniciar Sesión</Text>
          
          {/* Mensajes de Estado */}
          {message && <AlertMessage message={message} />}
          
          {/* Formulario (Manejado por Pressable) */} 
          <View> 
            
            {/* Campo Email */} 
            <View style={loginStyles.fieldContainer}>
              <View style={loginStyles.formLabel}>
                <View style={loginStyles.dot}></View>
                <Text style={loginStyles.labelText}>Email</Text>
              </View>
              <TextInput 
                style={loginStyles.formControl}
                keyboardType="email-address" 
                autoCapitalize="none"
                value={credentials.email} 
                onChangeText={(text) => handleChange('email', text)}
                placeholder="nombre@ejemplo.com"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
            
            {/* Campo Contraseña */}
            <View style={loginStyles.fieldContainer}> 
              <View style={loginStyles.formLabel}>
                <View style={loginStyles.dot}></View>
                <Text style={loginStyles.labelText}>Contraseña</Text>
              </View>
              <TextInput 
                style={loginStyles.formControl}
                secureTextEntry 
                value={credentials.password} 
                onChangeText={(text) => handleChange('password', text)}
                placeholder="••••••••"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
          
            {/* Botón de Submit */}
            <Pressable
              onPress={handleLoginSubmit}
              style={({ pressed }) => [
                loginStyles.btnPrimary,
                loading && loginStyles.btnDisabled,
                pressed && { opacity: 0.8 } // Efecto táctil
              ]}
              disabled={loading}
            >
              {loading ? (
                <View style={loginStyles.loadingContent}>
                  <ActivityIndicator color="#1f1a1a" size="small" style={{ marginRight: 8 }} />
                  <Text style={loginStyles.btnText}>Cargando...</Text>
                </View>
              ) : (
                <Text style={loginStyles.btnText}>Iniciar Sesión</Text>
              )}
            </Pressable>
          </View>
          
          {/* Enlaces de Pie de Página */} 
          <View style={loginStyles.footerLinks}> 
            <Text style={loginStyles.footerText}>
              ¿No tienes una cuenta? 
              <Text 
                onPress={() => navigation.navigate('Register')}
                style={loginStyles.footerLink}
              >
                {' '}¡Regístrate!
              </Text>
            </Text>
            <Text style={loginStyles.footerText}>
              ¿Olvidaste tu contraseña? 
              <Text 
                onPress={() => navigation.navigate('RecoverPassword')}
                style={loginStyles.footerLink}
              >
                {' '}¡Recupérala!
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginPage;