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
  Picker // Usamos Picker para el selector de rol (iOS/Android)
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

// Importa los estilos de la sección 2.
import { registerStyles, COLORS } from './RegisterStyles'; 

// --- Configuración (Reemplazar con tus variables de entorno) ---
// const API_URL = import.meta.env.VITE_API_URL; // Reemplazado por una constante simulada
const SIMULATED_API_URL = 'http://simulated-api.com/v1'; 
// ---------------------------------------------------------------------------------


/**
 * Vista de Registro de Usuario adaptada a React Native.
 */
function RegisterPage() {
  const navigation = useNavigation();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Incluye todos los campos de tu formulario web original
  const [formData, setFormData] = useState({
    rol: '', // Debe ser el ID numérico (1 o 2)
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: ''
  });

  // Maneja el cambio de valor para TextInput y Picker
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async () => {
    setLoading(true);
    setMessage(null);

    // Mapeo del payload de tu API
    const payload = {
      rolId: parseInt(formData.rol), // Convertir a número para la API
      primerNombre: formData.nombre1,
      segundoNombre: formData.nombre2,
      primerApellido: formData.apellido1,
      segundoApellido: formData.apellido2,
      correoElectronico: formData.email,
      clave: formData.password
    };
    
    // Validación simple de campos obligatorios
    if (!payload.rolId || !payload.primerNombre || !payload.primerApellido || !payload.correoElectronico || !payload.clave) {
        setMessage({ type: 'danger', text: 'Por favor, completa todos los campos obligatorios.' });
        setLoading(false);
        return;
    }

    try {
      // --- INICIO: LÓGICA DE API (Usar axios o fetch en tu entorno) ---
      
      // Simulación de la llamada a la API y el tiempo de respuesta
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulación de respuesta real:
      if (payload.correoElectronico.includes('error')) {
         throw { 
            response: { 
                status: 400, 
                data: { message: 'El correo electrónico ya está en uso. Intenta con otro.' } 
            } 
        };
      }
      
      // Simulación de registro exitoso
      setMessage({ type: 'success', text: '¡Registro exitoso! Serás redirigido al inicio de sesión.' });
      
      setTimeout(() => {
        // Navega a la vista de login
        navigation.navigate('Login'); 
      }, 2000);
      
      // --- FIN: LÓGICA DE API ---

    } catch (error) {
      console.error('Error en el registro:', error);
      
      let errorMessage = 'Ocurrió un error. Inténtalo de nuevo.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Componente de mensaje de alerta nativo
  const AlertMessage = ({ message }) => (
    <View style={[
        registerStyles.alert, 
        message.type === 'success' ? registerStyles.alertSuccess : registerStyles.alertDanger
    ]}>
        <Text style={registerStyles.alertText}>{message.text}</Text>
    </View>
  );


  return (
    <SafeAreaView style={registerStyles.safeArea}>
        <KeyboardAvoidingView 
            style={registerStyles.registerWrapper}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50} // Ajuste para Android si es necesario
        >
            <View style={registerStyles.registerContainer}>
                
                <View style={registerStyles.header}>
                    <View style={registerStyles.circle}></View>
                    <Text style={registerStyles.brand}>Nombre</Text>
                </View>
                
                <Text style={registerStyles.title}>Registrarse</Text>
                
                {message && <AlertMessage message={message} />}

                {/* Formulario */}
                <View style={registerStyles.form}>
                    
                    {/* Campo Rol (Select/Picker) */}
                    <View style={registerStyles.fieldContainer}>
                        <View style={registerStyles.formLabel}>
                            <View style={registerStyles.dot}></View>
                            <Text style={registerStyles.labelText}>Rol</Text>
                        </View>
                        <View style={registerStyles.pickerWrapper}>
                            <Picker
                                selectedValue={formData.rol}
                                onValueChange={(itemValue) => handleChange('rol', itemValue)}
                                style={registerStyles.picker}
                                itemStyle={registerStyles.pickerItem}
                                enabled={!loading}
                            >
                                <Picker.Item label="Selecciona tu rol..." value="" style={{ color: '#a0a0a0' }} />
                                <Picker.Item label="Profesor" value="1" />
                                <Picker.Item label="Alumno" value="2" />
                            </Picker>
                        </View>
                    </View>

                    {/* Nombres (Row/2 Columnas) */}
                    <View style={registerStyles.row}>
                        <View style={registerStyles.col}>
                            <View style={registerStyles.formLabel}>
                                <View style={registerStyles.dot}></View>
                                <Text style={registerStyles.labelText}>Primer nombre</Text>
                            </View>
                            <TextInput 
                                style={registerStyles.formControl}
                                value={formData.nombre1}
                                onChangeText={(text) => handleChange('nombre1', text)}
                                editable={!loading}
                                required
                            />
                        </View>
                        <View style={registerStyles.col}>
                            <View style={registerStyles.formLabel}>
                                <View style={registerStyles.dot}></View>
                                <Text style={registerStyles.labelText}>Segundo nombre</Text>
                            </View>
                            <TextInput 
                                style={registerStyles.formControl}
                                value={formData.nombre2}
                                onChangeText={(text) => handleChange('nombre2', text)}
                                editable={!loading}
                            />
                        </View>
                    </View>

                    {/* Apellidos (Row/2 Columnas) */}
                    <View style={registerStyles.row}>
                        <View style={registerStyles.col}>
                            <View style={registerStyles.formLabel}>
                                <View style={registerStyles.dot}></View>
                                <Text style={registerStyles.labelText}>Primer apellido</Text>
                            </View>
                            <TextInput 
                                style={registerStyles.formControl}
                                value={formData.apellido1}
                                onChangeText={(text) => handleChange('apellido1', text)}
                                editable={!loading}
                                required
                            />
                        </View>
                        <View style={registerStyles.col}>
                            <View style={registerStyles.formLabel}>
                                <View style={registerStyles.dot}></View>
                                <Text style={registerStyles.labelText}>Segundo apellido</Text>
                            </View>
                            <TextInput 
                                style={registerStyles.formControl}
                                value={formData.apellido2}
                                onChangeText={(text) => handleChange('apellido2', text)}
                                editable={!loading}
                            />
                        </View>
                    </View>

                    {/* Campo Email */}
                    <View style={registerStyles.fieldContainer}>
                        <View style={registerStyles.formLabel}>
                            <View style={registerStyles.dot}></View>
                            <Text style={registerStyles.labelText}>Email</Text>
                        </View>
                        <TextInput 
                            style={registerStyles.formControl}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            editable={!loading}
                            required
                        />
                    </View>

                    {/* Campo Contraseña */}
                    <View style={registerStyles.fieldContainer}>
                        <View style={registerStyles.formLabel}>
                            <View style={registerStyles.dot}></View>
                            <Text style={registerStyles.labelText}>Contraseña</Text>
                        </View>
                        <TextInput 
                            style={registerStyles.formControl}
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            editable={!loading}
                            required
                        />
                    </View>

                    {/* Botón de Submit */}
                    <Pressable
                        onPress={handleRegisterSubmit}
                        style={({ pressed }) => [
                            registerStyles.submitBtn,
                            loading && registerStyles.btnDisabled,
                            pressed && { opacity: 0.8 }
                        ]}
                        disabled={loading}
                    >
                        {loading ? (
                            <View style={registerStyles.loadingContent}>
                                <ActivityIndicator color={COLORS.TEXT} size="small" style={{ marginRight: 8 }} />
                                <Text style={registerStyles.submitBtnText}>Registrando...</Text>
                            </View>
                        ) : (
                            <Text style={registerStyles.submitBtnText}>Registrarse</Text>
                        )}
                    </Pressable>

                    {/* Enlace a Iniciar Sesión */}
                    <Text style={registerStyles.footer}>
                        ¿Ya tienes una cuenta? 
                        <Text 
                            onPress={() => navigation.navigate('Login')}
                            style={registerStyles.footerLink}
                        >
                            {' '}Inicia sesión
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterPage;