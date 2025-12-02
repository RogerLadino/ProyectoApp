import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigation';
import HomeView from '../views/HomeView';
import ListClassroomView from '../views/Classroom/ListClassroomView';
import CreateClassroomView from '../views/Classroom/CreateClassroomView';
import EditClassroomView from '../views/Classroom/EditClassroomView';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#231F20' },
          headerTintColor: '#FBFBFB',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Rutas de autenticación */}
        <Stack.Screen 
          name="Auth" 
          component={AuthNavigator} 
          options={{ headerShown: false }}
        />
        
        {/* Rutas de la aplicación */}
        <Stack.Screen 
          name="Home" 
          component={HomeView} 
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen 
          name="ListClassroom" 
          component={ListClassroomView} 
          options={{ title: 'Mis Clases' }}
        />
        <Stack.Screen 
          name="CreateClassroom" 
          component={CreateClassroomView} 
          options={{ title: 'Crear Clase' }}
        />
        <Stack.Screen 
          name="EditClassroom" 
          component={EditClassroomView} 
          options={{ title: 'Editar Clase' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
