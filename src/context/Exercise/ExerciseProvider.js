import React, { useState, useCallback } from 'react';
import { ExerciseContext } from './ExerciseContext';
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

  const fetchExercisesByClassroom = useCallback(async (classroomId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExercisesByClassroom(classroomId);
      setExercises(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewExercise = useCallback(async (classroomId, name, description, dueDate, testCases) => {
    try {
      setLoading(true);
      setError(null);
      const data = await createExercise(classroomId, name, description, dueDate, testCases);
      setExercises((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
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
      
      return updatedExercise;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentExercise]);

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
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentExerciseId]);

  const clearCurrentExercise = useCallback(() => {
    setCurrentExercise(null);
    setCurrentExerciseId(null);
  }, []);

  const value = {
    currentExerciseId,
    currentExercise,
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
