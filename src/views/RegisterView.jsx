import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';   // ✅ corregido casing
import { Dropdown } from 'react-native-element-dropdown';
import { registerStyles as styles } from '../Styles/RegisterStyles';

export default function RegisterView() {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rol: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: '',
  });

  const items = [
    { label: 'Profesor', value: '1' },
    { label: 'Alumno', value: '2' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const registroData = {
        primerNombre: formData.nombre1,
        segundoNombre: formData.nombre2 || '',
        primerApellido: formData.apellido1,
        segundoApellido: formData.apellido2 || '',
        correoElectronico: formData.email,
        clave: formData.password,
        rolId: Number.parseInt(formData.rol) || 2, // ✅ corregido según SonarQube S7773
      };

      await register(registroData);
      setMessage({ type: 'success', text: '¡Registro exitoso! Serás redirigido al inicio de sesión.' });
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || 'Ocurrió un error. Inténtalo de nuevo.';
      setMessage({ type: 'danger', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.circle} />
          <Text style={styles.brand}>Nombre</Text>
        </View>

        <Text style={styles.title}>Registrarse</Text>

        {/* Mensaje */}
        {message && (
          <Text style={[styles.alert, message.type === 'success' ? styles.alertSuccess : styles.alertDanger]}>
            {message.text}
          </Text>
        )}

        {/* Rol con Dropdown */}
        <View style={styles.inputGroup}>
          <View style={styles.label}>
            <View style={styles.dot} />
            <Text style={styles.labelText}>Rol</Text>
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            dropdownStyle={styles.dropdownMenu}
            data={items}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Selecciona tu rol..."
            value={formData.rol}
            onChange={item => handleChange('rol', item.value)}
          />
        </View>

        {/* Primer nombre */}
        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <View style={styles.label}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Primer nombre</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.nombre1}
              onChangeText={text => handleChange('nombre1', text)}
              placeholder="Ej: Juan"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={[styles.col, styles.colRight]}>
            <View style={styles.label}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Segundo nombre</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.nombre2}
              onChangeText={text => handleChange('nombre2', text)}
              placeholder="Ej: Carlos"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        {/* Apellidos */}
        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <View style={styles.label}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Primer apellido</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.apellido1}
              onChangeText={text => handleChange('apellido1', text)}
              placeholder="Ej: Pérez"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={[styles.col, styles.colRight]}>
            <View style={styles.label}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Segundo apellido</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.apellido2}
              onChangeText={text => handleChange('apellido2', text)}
              placeholder="Ej: Gómez"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <View style={styles.label}>
            <View style={styles.dot} />
            <Text style={styles.labelText}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="nombre@ejemplo.com"
            placeholderTextColor="#aaa"
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
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>

        {/* Botón */}
        <Pressable style={styles.button} onPress={handleRegisterSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </Pressable>

        {/* Footer */}
        <Text style={styles.footer}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}