import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#1f1a1a',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#2e2828',
    alignSelf: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#ff7e70',
    borderRadius: 15,
    marginRight: 10,
  },
  logoText: {
    fontSize: 14,
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
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
    backgroundColor: '#ff7e70',
    color: '#1f1a1a',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  labelText: {
    fontSize: 13,
    color: '#fff',
  },
  input: {
    backgroundColor: '#2e2828',
    borderRadius: 5,
    color: '#fff',
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ff7e70',
  },
  button: {
    backgroundColor: '#ff7e70',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1f1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerLinks: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#fff',
    marginVertical: 6,
    textAlign: 'center',
  },
  footerLink: {
    color: '#ff7e70',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});