import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Se asume que @react-navigation/native y native-stack están instalados
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- VISTAS TEMPORALES (PLACEHOLDERS) ---
// Estas vistas reemplazan temporalmente a los componentes reales (que causaron errores)
// y serán eliminadas a medida que las vistas reales sean convertidas y creadas.
const EmptyView = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Vista Pendiente: {name}</Text>
    <Text style={styles.subText}>Comenzaremos la adaptación de esta pantalla en breve.</Text>
  </View>
);

// Las importaciones de vistas originales se reemplazan por estas referencias
const HomeView = () => <EmptyView name="HomeView" />;
const HomePage = () => <EmptyView name="HomePage" />;
const LoginPage = () => <EmptyView name="Login" />;
const RegisterPage = () => <EmptyView name="Register" />;
const RecoverPasswordPage = () => <EmptyView name="Recover Password" />;
const ResetPasswordPage = () => <EmptyView name="Reset Password" />;
const ListExerciseView = () => <EmptyView name="List Exercise" />;
const CreateExerciseView = () => <EmptyView name="Create Exercise" />;
const EditExerciseView = () => <EmptyView name="Edit Exercise" />;
const ExerciseView = () => <EmptyView name="Exercise Detail" />;
const CreateClassroomView = () => <EmptyView name="Create Classroom" />;
const EditClassroomView = () => <EmptyView name="Edit Classroom" />;
const ListClassroomView = () => <EmptyView name="List Classroom" />;
const CodeView = () => <EmptyView name="Code View" />;

const Stack = createNativeStackNavigator();

/**
 * Componente principal de navegación para React Native usando Stack Navigator.
 * Reemplaza <BrowserRouter> y <Routes> de React Web.
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Ocultamos la cabecera por defecto para tener control total
        screenOptions={{ headerShown: false }}
      >
        {/* --- RUTAS DE AUTENTICACIÓN / PÚBLICAS --- */}
        <Stack.Screen name="HomeBase" component={HomeView} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="RecoverPassword" component={RecoverPasswordPage} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />

        {/* --- RUTAS DINÁMICAS Y PRIVADAS --- */}
        <Stack.Screen name="ListExercise" component={ListExerciseView} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseView} />
        <Stack.Screen name="CreateExercise" component={CreateExerciseView} />
        <Stack.Screen name="EditExercise" component={EditExerciseView} />
        <Stack.Screen name="ListClassroom" component={ListClassroomView} />
        <Stack.Screen name="CreateClassroom" component={CreateClassroomView} />
        <Stack.Screen name="EditClassroom" component={EditClassroomView} />
        <Stack.Screen name="CodeView" component={CodeView} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff7e73',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    }
});
