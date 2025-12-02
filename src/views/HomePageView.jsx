import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { homePageStyles as styles } from '../Styles/HomeStyles';

export default function HomePageView() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.wrapper}>
      {/* Topbar */}
      <View style={styles.topbar}>
        <View style={styles.topbarLeft}>
          <View style={styles.smallCircle} />
          <Text style={styles.topbarText}>Nombre</Text>
        </View>
        <View style={styles.topbarRight}>
          <Pressable style={styles.smallBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.smallBtnText}>Iniciar Sesión</Text>
          </Pressable>
          <Pressable style={styles.smallBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.smallBtnText}>Registrarse</Text>
          </Pressable>
        </View>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.headerText}>
          <Text style={styles.heroTitle}>
            Evalúa mejor,{'\n'}más rápido,{'\n'}más justo
          </Text>
          <Pressable style={styles.ctaBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.ctaBtnText}>Regístrate</Text>
          </Pressable>
        </View>
        <View style={styles.bigCircle} />
      </View>

      {/* Ventajas */}
      <View style={styles.advantages}>
        <Text style={styles.sectionTitle}>Ventajas</Text>
        <View style={styles.ventajaItems}>
          <View style={styles.ventajaItem}>
            <Text style={styles.icono}>✅</Text>
            <Text style={styles.ventajaText}>Asigna ejercicios rápidamente</Text>
          </View>
          <View style={styles.ventajaItem}>
            <Text style={styles.icono}>💻</Text>
            <Text style={styles.ventajaText}>Codifícalos directamente</Text>
          </View>
          <View style={styles.ventajaItem}>
            <Text style={styles.icono}>👀</Text>
            <Text style={styles.ventajaText}>Observa el código de tus alumnos</Text>
          </View>
        </View>
      </View>

      {/* Editor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Editor De Código</Text>
        <Image source={require('../../assets/img1.png')} style={styles.image} />
      </View>

      {/* Tareas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tareas</Text>
        <Image source={require('../../assets/img2.png')} style={styles.image} />
      </View>

      {/* Reportes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reportes</Text>
        <Image source={require('../../assets/img3.png')} style={styles.image} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Listo para empezar?</Text>
        <Pressable style={styles.registroBtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registroBtnText}>Regístrate</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
