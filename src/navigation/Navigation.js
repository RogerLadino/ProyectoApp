import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Views
import HomeView from '../views/HomeView';
import { CodeView } from '../views/Code';
import { 
  ExerciseView, 
  ExerciseStudentView, 
  ExerciseProfessorView, 
  CreateExerciseView, 
  EditExerciseView, 
  ListExerciseView 
} from '../views/Exercise';

const Stack = createNativeStackNavigator();

export default function Navigation() {
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
        <Stack.Screen 
          name="ListExercise" 
          component={ListExerciseView}
        />
        <Stack.Screen 
          name="Exercise" 
          component={ExerciseView}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeView}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
