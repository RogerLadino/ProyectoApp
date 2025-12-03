import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../views/HomeView';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigation';
import ReportsView from '../views/Reports/ReportsView';
import CodeView from '../views/Code/CodeView';
import ExerciseView from '../views/Exercise/ExerciseView';
import ExerciseStudentView from '../views/Exercise/ExerciseStudentView';
import ExerciseProfessorView from '../views/Exercise/ExerciseProfessorView';
import CreateExerciseView from '../views/Exercise/CreateExerciseView';
import EditExerciseView from '../views/Exercise/EditExerciseView';
import ListExerciseView from '../views/Exercise/ListExerciseView';
import CreateClassroomView from '../views/Classroom/CreateClassroomView';
import EditClassroomView from '../views/Classroom/EditClassroomView';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#231F20',
          },
        }}
      >
        {!isAuthenticated ? (
          /* Rutas de autenticación */
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          /* Rutas de la aplicación */
          <>
            <Stack.Screen
              name="Home"
              component={HomeView}
              options={{ title: 'Inicio' }}
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
            <Stack.Screen
              name="ListExercise"
              component={ListExerciseView}
            />
            <Stack.Screen
              name="Exercise"
              component={ExerciseView}
            />
            <Stack.Screen
              name="ExerciseStudent"
              component={ExerciseStudentView}
            />
            <Stack.Screen
              name="ExerciseProfessor"
              component={ExerciseProfessorView}
            />
            <Stack.Screen
              name="Code"
              component={CodeView}
            />
            <Stack.Screen
              name="CreateExercise"
              component={CreateExerciseView}
            />
            <Stack.Screen
              name="EditExercise"
              component={EditExerciseView}
            />
            <Stack.Screen
              name="Reports"
              component={ReportsView}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
