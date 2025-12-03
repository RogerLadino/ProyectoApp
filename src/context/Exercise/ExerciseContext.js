import { createContext, useContext } from 'react';

export const ExerciseContext = createContext(undefined);

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  return context;
};
