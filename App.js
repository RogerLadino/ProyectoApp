import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { ExerciseProvider } from './src/context/Exercise';
import { CodeProvider } from './src/context/Code';
import { NotificationProvider } from './src/context/NotificationContext';
import NotificationContainer from './src/components/Common/NotificationContainer';

export default function App() {
  return (
    <NotificationProvider>
      <ExerciseProvider>
        <CodeProvider>
          <Navigation />
          <NotificationContainer />
          <StatusBar style="auto" />
        </CodeProvider>
      </ExerciseProvider>
    </NotificationProvider>
  );
}
