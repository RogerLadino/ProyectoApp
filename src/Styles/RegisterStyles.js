import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
  // Fondo y centrado vertical
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#1e1919',
    justifyContent: 'center',
    padding: 20,
  },

  // Contenedor principal (emula width: 60%)
  container: {
    width: '100%',
    maxWidth: 700, // ajusta según diseño
    alignSelf: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#2d2727',
  },

  // Header con círculo y marca
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    width: 28,
    height: 28,
    backgroundColor: '#ff6e6e',
    borderRadius: 14,
    marginRight: 10, // reemplaza gap
  },
  brand: {
    fontSize: 13,
    color: '#fff',
  },

  // Título
  title: {
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '500',
    fontSize: 22,
    color: '#fff',
  },

  // Alertas
  alert: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 14,
    overflow: 'hidden',
  },
  alertSuccess: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  alertDanger: {
    backgroundColor: '#ff6e6e',
    color: '#fff',
  },

  // Grupo de input
  inputGroup: {
    marginBottom: 15,
  },

  // Etiqueta con punto
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 6, // reemplaza gap
  },
  labelText: {
    fontSize: 12,
    color: '#fff',
  },

  // Inputs
  input: {
    backgroundColor: '#2d2727',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ff6e6e',
  },

  // Filas y columnas
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  col: {
    flex: 1,
  },
  // Separación entre columnas (reemplazo de gap)
  colLeft: {
    marginRight: 5,
  },
  colRight: {
    marginLeft: 5,
  },

  // Botón
  button: {
    backgroundColor: '#ff6e6e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Footer
  footer: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 15,
    color: '#fff',
  },
  footerLink: {
    fontWeight: 'bold',
    color: '#ff6e6e',
    textDecorationLine: 'underline',
  },
});