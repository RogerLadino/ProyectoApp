import React, { useState, useCallback } from 'react';
import { ExerciseContext } from './ExerciseContext';
import { useNotification } from '../NotificationContext';
import {
  getExercisesByClassroom,
  getExercisesById,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../../services/exercises.service';

export const ExerciseProvider = ({ children }) => {
  const [currentExerciseId, setCurrentExerciseId] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(1000);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  const fetchExercisesByClassroom = useCallback(async (classroomId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExercisesByClassroom(classroomId);
      setExercises(data);
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al cargar los ejercicios');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchExerciseById = useCallback(async (classroomId, exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExercisesById(classroomId, exerciseId);
      setCurrentExercise(data);
      setCurrentExerciseId(exerciseId);
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al cargar el ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createNewExercise = useCallback(async (classroomId, name, description, dueDate, testCases) => {
    try {
      setLoading(true);
      setError(null);
      const data = await createExercise(classroomId, name, description, dueDate, testCases);
      setExercises((prev) => [...prev, data]);
      showSuccess('Ejercicio creado exitosamente');
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al crear el ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCurrentExercise = useCallback(async (classroomId, exerciseId, name, description, dueDate, testCases) => {
    try {
      setLoading(true);
      setError(null);
      
      await updateExercise(classroomId, exerciseId, name, description, dueDate, testCases);
      
      const updatedExercise = {
        ...currentExercise,
        id: exerciseId,
        name,
        description,
        dueDate,
        testCases,
      };
      
      setCurrentExercise(updatedExercise);
      
      setExercises((prev) => 
        prev.map((ex) => (ex.id === exerciseId ? updatedExercise : ex))
      );
      
      showSuccess('Ejercicio actualizado exitosamente');
      return updatedExercise;
    } catch (err) {
      setError(err.message);
      showError('Error al actualizar el ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentExercise, showSuccess, showError]);

  const removeExercise = useCallback(async (classroomId, exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteExercise(classroomId, exerciseId);
      setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
      if (currentExerciseId === exerciseId) {
        setCurrentExercise(null);
        setCurrentExerciseId(null);
      }
      showSuccess('Ejercicio eliminado exitosamente');
    } catch (err) {
      setError(err.message);
      showError('Error al eliminar el ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentExerciseId, showSuccess, showError]);

  const clearCurrentExercise = useCallback(() => {
    setCurrentExercise(null);
    setCurrentExerciseId(null);
  }, []);

  const value = {
    currentExerciseId,
    currentExercise,
    setCurrentExercise,
    exercises,
    loading,
    error,
    setCurrentExerciseId,
    fetchExercisesByClassroom,
    fetchExerciseById,
    createNewExercise,
    updateCurrentExercise,
    removeExercise,
    clearCurrentExercise,
  };

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
};
