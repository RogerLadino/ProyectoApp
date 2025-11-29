import { useContext } from 'react';
import { ClassroomContext } from '../context/ClassroomProvider';

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  
  if (!context) {
    throw new Error('useClassroom debe usarse dentro de ClassroomProvider');
  }
  
  return context;
};
