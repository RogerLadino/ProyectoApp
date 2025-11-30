import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { ExerciseProvider } from './src/context/Exercise';
import { CodeProvider } from './src/context/Code';

export default function App() {
  return (
    <ExerciseProvider>
      <CodeProvider>
        <Navigation />
        <StatusBar style="auto" />
      </CodeProvider>
    </ExerciseProvider>
  );
}
