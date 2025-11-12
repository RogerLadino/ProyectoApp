import React from 'react';
import { View, Text, ScrollView, Image, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Asegúrate de tener 'react-native-svg' instalado y vinculado para los íconos
import Svg, { Rect, Polyline, Circle, Line } from 'react-native-svg'; 

// Estilos
import HomePageStyles from './HomePageStyle';
import GlobalStyles, { GLOBAL_CONSTANTS } from '../../../src/Styles/GlobalStyles'; 

// ----------------------------------------------------
// Componentes de Íconos SVG (requieren react-native-svg)
const CheckmarkIcon = () => (
    <View style={HomePageStyles.icono}>
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GLOBAL_CONSTANTS.COLOR_PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="1" y="1" width="22" height="22" rx="5" ry="5" />
            <Polyline points="9 11 12 14 22 4" />
        </Svg>
    </View>
);

const CodeIcon = () => (
    <View style={HomePageStyles.icono}>
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GLOBAL_CONSTANTS.COLOR_PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="16 18 22 12 16 6" />
            <Polyline points="8 6 2 12 8 18" />
        </Svg>
    </View>
);

const ShareIcon = () => (
    <View style={HomePageStyles.icono}>
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GLOBAL_CONSTANTS.COLOR_PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="18" cy="5" r="3" />
            <Circle cx="6" cy="12" r="3" />
            <Circle cx="18" cy="19" r="3" />
            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </Svg>
    </View>
);


/**
 * Representa la página de inicio (landing page).
 * Implementada con la estructura y componentes de React Native/Expo.
 */
function HomePage() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };
  
  return (
    <SafeAreaView style={GlobalStyles.appContainer}>
      {/* Topbar: Posicionado absolutamente sobre el ScrollView */}
      <View style={[GlobalStyles.topbar, HomePageStyles.topbarAbsolute]}>
        <View style={GlobalStyles.topbarLeft}>
          <View style={GlobalStyles.smallCircle} />
          <Text style={{ color: GLOBAL_CONSTANTS.COLOR_TEXT, fontSize: 18, fontWeight: 'bold' }}>Nombre</Text>
        </View>
        <View style={GlobalStyles.topbarRight}>
          <Pressable 
            onPress={() => handleNavigate('Login')} 
            style={GlobalStyles.smallBtn}
          >
            <Text style={GlobalStyles.smallBtnText}>Iniciar Sesión</Text>
          </Pressable>
          <Pressable 
            onPress={() => handleNavigate('Register')} 
            style={[GlobalStyles.smallBtn, { marginLeft: 8 }]}
          >
            <Text style={GlobalStyles.smallBtnText}>Registrarse</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content: ScrollView */}
      <ScrollView contentContainerStyle={HomePageStyles.scrollViewContent} style={GlobalStyles.container}>
        
        {/* === HERO SECTION === */}
        <View style={HomePageStyles.hero}>
          <View style={HomePageStyles.headerText}>
            <Text style={HomePageStyles.h1}>
              Evalúa mejor,{'\n'} 
              más rápido,{'\n'} 
              más justo
            </Text>
            <Pressable 
                onPress={() => handleNavigate('Register')} 
                style={HomePageStyles.ctaBtn}
            >
              <Text style={HomePageStyles.ctaBtnText}>Regístrate</Text>
            </Pressable>
          </View>
          {width > 350 && <View style={HomePageStyles.bigCircle} />}
        </View>

        {/* === ADVANTAGES SECTION (Ventajas) === */}
        <View style={HomePageStyles.advantages}>
          <Text style={HomePageStyles.ventajasH2}>Ventajas</Text>
          <View style={HomePageStyles.ventajaItems}>
            
            {/* Ventaja 1 */}
            <View style={HomePageStyles.ventajaItem}>
              <CheckmarkIcon />
              <Text style={HomePageStyles.ventajaItemText}>Asigna ejercicios rápidamente</Text>
            </View>

            {/* Ventaja 2 */}
            <View style={HomePageStyles.ventajaItem}>
              <CodeIcon />
              <Text style={HomePageStyles.ventajaItemText}>Codificalos directamente</Text>
            </View>

            {/* Ventaja 3 */}
            <View style={HomePageStyles.ventajaItem}>
              <ShareIcon />
              <Text style={HomePageStyles.ventajaItemText}>Observa el código de tus alumnos</Text>
            </View>

          </View>
        </View>

        {/* === IMAGE SECTIONS (Usando Placeholders) === */}
        {/* Editor */}
        <View style={HomePageStyles.section}>
          <Text style={HomePageStyles.sectionH2}>Editor De Código</Text>
          <View style={HomePageStyles.imageBox}>
            <Image 
              source={{ uri: 'https://placehold.co/800x400/231f20/fff?text=Editor+de+C%C3%B3digo' }} 
              style={HomePageStyles.sectionImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Tareas */}
        <View style={HomePageStyles.section}>
          <Text style={HomePageStyles.sectionH2}>Tareas</Text>
          <View style={HomePageStyles.imageBox}>
            <Image 
              source={{ uri: 'https://placehold.co/800x400/231f20/fff?text=Vista+de+Tareas' }} 
              style={HomePageStyles.sectionImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Reportes */}
        <View style={HomePageStyles.section}> 
          <Text style={HomePageStyles.sectionH2}>Reportes</Text>
          <View style={HomePageStyles.imageBox}>
            <Image 
              source={{ uri: 'https://placehold.co/800x400/231f20/fff?text=Reportes+de+Alumnos' }} 
              style={HomePageStyles.sectionImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        {/* === FOOTER === */}
        <View style={HomePageStyles.footer}>
          <Text style={HomePageStyles.footerText}>¿Listo para empezar?</Text>
          <Pressable 
            onPress={() => handleNavigate('Register')} 
            style={HomePageStyles.ctaBtn}
          >
            <Text style={HomePageStyles.ctaBtnText}>Regístrate</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;