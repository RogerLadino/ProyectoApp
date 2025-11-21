import { StyleSheet } from 'react-native';

export const homePageStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1f1a1a',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topbarText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff7e70',
  },
  topbarRight: {
    flexDirection: 'row',
    gap: 10,
  },
  smallBtn: {
    backgroundColor: '#ff7e70',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  smallBtnText: {
    color: '#1f1a1a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 30,
  },
  headerText: {
    flex: 1,
    minWidth: 260,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 40,
    color: '#fff',
    marginBottom: 16,
  },
  ctaBtn: {
    backgroundColor: '#f77f72',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bigCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#f77f72',
  },
  advantages: {
    paddingVertical: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  ventajaItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 40,
  },
  ventajaItem: {
    alignItems: 'center',
    maxWidth: 150,
  },
  icono: {
    fontSize: 32,
    marginBottom: 8,
    color: '#ff7e70',
  },
  ventajaText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    paddingVertical: 32,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
  },
  registroBtn: {
    backgroundColor: '#f77f72',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  registroBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});