import { StyleSheet } from 'react-native';

export const resetPasswordStyles = StyleSheet.create({
  // Fondo principal
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#1e1919',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Contenedor central
  container: {
    textAlign: 'center',
    maxWidth: 400,
    width: '90%',
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#2d2727',
    borderRadius: 8,
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
    marginRight: 8, // reemplazo de gap
  },
  logoText: {
    color: '#fff',
    fontSize: 14,
  },

  // Título
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Labels
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
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 15,
  },

  // Botón
  button: {
    backgroundColor: '#2d2727',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});