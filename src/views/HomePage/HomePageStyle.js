import { StyleSheet, Dimensions } from 'react-native';
import { GLOBAL_CONSTANTS } from '../../../src/Styles/GlobalStyles';

const { width } = Dimensions.get('window');

const MAX_CONTENT_WIDTH = 1200; 
const TOPBAR_COMPENSATION = GLOBAL_CONSTANTS.TOPBAR_HEIGHT + 10; 

// Estilo condicional para centrar el contenido principal en pantallas grandes (web/desktop)
const scrollViewWidth = width > MAX_CONTENT_WIDTH ? MAX_CONTENT_WIDTH : '100%';

export default StyleSheet.create({
  // --- LAYOUT PRINCIPAL Y SCROLLVIEW ---
  scrollViewContent: {
    alignSelf: 'center', 
    width: scrollViewWidth, 
    paddingTop: TOPBAR_COMPENSATION, 
    flexGrow: 1, 
  },
  
  // Estilo para posicionar el Topbar de forma absoluta sobre el contenido
  topbarAbsolute: {
    position: 'absolute',
    top: 0,
    zIndex: 1001,
  },

  // --- HERO SECTION ---
  hero: {
    flexDirection: width > 768 ? 'row' : 'column', 
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32, 
    paddingTop: 10, 
    paddingBottom: 48,
  },
  headerText: { 
    flex: 1,
    minWidth: 260,
    maxWidth: 480,
    marginBottom: width > 768 ? 0 : 20, 
  },
  h1: {
    fontSize: width > 768 ? 64 : 48,
    fontWeight: '300',
    lineHeight: width > 768 ? 68 : 52,
    marginBottom: 16, 
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
  },
  // Círculo grande
  bigCircle: {
    width: 250,
    height: 250,
    backgroundColor: GLOBAL_CONSTANTS.COLOR_PRIMARY,
    borderRadius: 125,
  },
  ctaBtn: {
    backgroundColor: GLOBAL_CONSTANTS.COLOR_PRIMARY,
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderRadius: 5,
    marginTop: 10, 
    alignSelf: 'flex-start',
  },
  ctaBtnText: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 16, 
    fontWeight: '600',
  },

  // --- ADVANTAGES SECTION (Ventajas) ---
  advantages: {
    paddingVertical: 40,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  ventajasH2: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 32, 
    marginVertical: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  ventajaItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  ventajaItem: {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 150,
  },
  ventajaItemText: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  icono: {
    marginBottom: 8,
  },

  // --- IMAGE SECTIONS (EDITOR, TASKS, REPORTS) ---
  section: {
    paddingVertical: 32, 
    borderTopWidth: 1, 
    borderTopColor: '#333',
  },
  sectionH2: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 24, 
    marginBottom: 8, 
    fontWeight: '600',
  },
  imageBox: {
    borderRadius: 5,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a', 
  },
  sectionImage: {
    width: '100%',
    height: width * 0.5, // Altura relativa para móviles
    maxHeight: GLOBAL_CONSTANTS.MAX_EDITOR_IMG_HEIGHT, 
  },

  // --- FOOTER ---
  footer: {
    paddingVertical: 32, 
    marginTop: 'auto',
    alignItems: 'center',
  },
  footerText: {
    color: GLOBAL_CONSTANTS.COLOR_TEXT,
    fontSize: 18,
    marginBottom: 10,
  },
});