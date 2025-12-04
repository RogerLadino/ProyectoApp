import { StyleSheet } from 'react-native';

export const resetPasswordStyles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#1e1919',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  container: {
    width: '95%',
    maxWidth: 420,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#2d2727',
    borderRadius: 8,
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 18,
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#2d2727',
    borderRadius: 6,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ff6e6e',
  },

  // OTP inline: garantiza disposición horizontal sin depender de flex
  otpInline: {
    width: 270,            // ancho para 6 dígitos con espaciado
    height: 46,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 12,     // separa los dígitos horizontalmente
    color: '#fff',
    backgroundColor: '#1e1919',
  },

  alert: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 14,
  },
  alertSuccess: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  alertDanger: {
    backgroundColor: '#ff6e6e',
    color: '#fff',
  },
  alertWarning: {
    backgroundColor: '#ff9800',
    color: '#fff',
  },

  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#1e1919',
    fontSize: 16,
    fontWeight: 'bold',
  },
});