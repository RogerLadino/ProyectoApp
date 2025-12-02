import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Views - Direct imports
import HomeView from '../views/HomeView';
import ReportsView from '../views/Reports/ReportsView';
import CodeView from '../views/Code/CodeView';
import ExerciseView from '../views/Exercise/ExerciseView';
import ExerciseStudentView from '../views/Exercise/ExerciseStudentView';
import ExerciseProfessorView from '../views/Exercise/ExerciseProfessorView';
import CreateExerciseView from '../views/Exercise/CreateExerciseView';
import EditExerciseView from '../views/Exercise/EditExerciseView';
import ListExerciseView from '../views/Exercise/ListExerciseView';

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
        <Stack.Screen 
          name="Reports" 
          component={ReportsView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
