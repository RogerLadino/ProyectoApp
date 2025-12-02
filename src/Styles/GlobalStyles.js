import { StyleSheet, Dimensions } from 'react-native';

// --- 1. Variables Globales (Constantes JS) ---
// Adaptadas para su uso en RN, usando números (unidades de densidad)
const { width, height } = Dimensions.get('window');

export const GLOBAL_CONSTANTS = {
  TOPBAR_HEIGHT: 80,
  PAGE_H_PADDING: 20, // 2rem convertido a 20 (aprox. 1rem = 10)
  MAX_HERO_IMG_HEIGHT: 420,
  MAX_EDITOR_IMG_HEIGHT: 520,
  // Colores principales
  COLOR_BACKGROUND: '#231f20',
  COLOR_PRIMARY: '#f77f72',
  COLOR_TEXT: '#fff',
  COLOR_TEXT_DARK: '#231f20',
};

// --- 2. StyleSheet Global ---
export default StyleSheet.create({
  // Equivalente a html, body, #root, .App (Layout Raíz)
  appContainer: {
    flex: 1, // CLAVE: Asegura 100% altura y ancho para que el contenido se ajuste
    backgroundColor: GLOBAL_CONSTANTS.COLOR_BACKGROUND,
    // La fuente y color se aplican en componentes <Text> individuales en RN
  },

  // Contenedor principal para el contenido de la pantalla, aplica padding horizontal
  container: {
    flex: 1,
    paddingHorizontal: GLOBAL_CONSTANTS.PAGE_H_PADDING,
    backgroundColor: GLOBAL_CONSTANTS.COLOR_BACKGROUND, // Fondo asegurado
  },

  // --- 3. Estilos de Utilidad y Componentes Recurrentes ---
  
  // Botón Pequeño (.small-btn)
  smallBtn: {
    backgroundColor: GLOBAL_CONSTANTS.COLOR_PRIMARY,
    paddingVertical: 8, // 0.5rem
    paddingHorizontal: 16, // 1rem
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBtnText: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 14, // 0.85rem
    fontWeight: '600',
  },

  // Círculo Pequeño (.small-circle)
  smallCircle: {
    width: 30,
    height: 30,
    backgroundColor: GLOBAL_CONSTANTS.COLOR_PRIMARY,
    borderRadius: 15, // 50%
  },
  
  // --- 4. Estilos para la Barra Superior (TopBar) ---
  // NOTA: En React Native, el TopBar se maneja usualmente con React Navigation Headers
  // o con un componente custom *dentro* de la vista, no con 'position: fixed'.
  topbar: {
    height: GLOBAL_CONSTANTS.TOPBAR_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GLOBAL_CONSTANTS.PAGE_H_PADDING, // Usamos el padding global
    backgroundColor: GLOBAL_CONSTANTS.COLOR_BACKGROUND,
    zIndex: 1000,
    // Se recomienda usar SafeAreaView en la vista principal para evitar la muesca (notch)
  },
  topbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // 0.5rem
  },
  topbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // La regla 'topbar-right button { margin-left: 0.5rem; }' se aplica con gap o margin en JSX
  },
});