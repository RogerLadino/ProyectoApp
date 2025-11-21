import { StyleSheet } from 'react-native';

export const recoverPasswordStyles = StyleSheet.create({
  // Fondo y wrapper principal
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#1e1919',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Contenedor central
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    alignSelf: 'center',
  },

  // Logo
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  circle: {
    backgroundColor: '#f47c7c',
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 14,
  },

  // Título y descripción
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Mensajes de alerta
  alert: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 14,
  },
  alertSuccess: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  alertDanger: {
    backgroundColor: '#f47c7c',
    color: '#fff',
  },

  // Labels
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
  },
  circleEmpty: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
  },

  // Inputs
  input: {
    padding: 10,
    backgroundColor: '#2d2727',
    borderRadius: 5,
    color: '#fff',
    fontSize: 14,
  },

  // Inputs de código
  codeInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 5,
  },

  // Botones
  button: {
    backgroundColor: '#efefef',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  verifyButton: {
    backgroundColor: '#2d2727',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // Botón de enlace (reenviar código)
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#f47c7c',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});