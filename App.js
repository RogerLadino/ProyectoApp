import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/Authcontext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
    </AuthProvider>
  );
}
