
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/Authcontext';
import Navigation from './src/navigation/Navigation';
import ClassroomProvider from './src/context/ClassroomProvider';

export default function App() {
  return (
    <AuthProvider>
      <ClassroomProvider>
        <Navigation />
        <StatusBar style="auto" />
      </ClassroomProvider>
    </AuthProvider>
  );
}
