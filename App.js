
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import ClassroomProvider from './src/context/ClassroomProvider';
import { AuthProvider } from './src/context/AuthContext'; // Si tienes autenticación

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
