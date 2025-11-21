import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos las vistas del módulo de usuarios
import HomePageView from '../views/HomePageView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import RecoverPasswordView from '../views/RecoverPasswordView';
import ResetPasswordView from '../views/ResetPasswordView';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // ocultamos headers para usar nuestros propios diseños
      }}
    >
      <Stack.Screen name="Home" component={HomePageView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordView} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;