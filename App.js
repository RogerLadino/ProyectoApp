
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';
import { ExerciseProvider } from './src/context/Exercise';
import { CodeProvider } from './src/context/Code';
import { NotificationProvider } from './src/context/NotificationContext';
import NotificationContainer from './src/components/Common/NotificationContainer';
import ClassroomProvider from './src/context/ClassroomProvider';

export default function App() {
  return (
    <NotificationProvider>
      <ExerciseProvider>
        <AuthProvider>
          <CodeProvider>
            <ClassroomProvider>
              <Navigation />
              <NotificationContainer />
              <StatusBar style="auto" />
            </ClassroomProvider>
          </CodeProvider>
        </AuthProvider>
      </ExerciseProvider>
    </NotificationProvider>
  );
}
