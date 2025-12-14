import React, { useState, useCallback, useMemo } from 'react';
import { CodeContext } from './CodeContext';
import { useNotification } from '../NotificationContext';
import {
  getSubmissionById,
  getSubmissionByUserId,
  getSubmissions,
  assignGrade,
} from '../../services/submission.service';

export const CodeProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  const fetchSubmissionById = useCallback(async (exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissionById(exerciseId);
      setCurrentSubmission(data);
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al cargar la entrega');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchSubmissionByUserId = useCallback(async (exerciseId, userId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissionByUserId(exerciseId, userId);
      setCurrentSubmission(data);
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al cargar la entrega del usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchSubmissions = useCallback(async (exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissions(exerciseId);
      setSubmissions(data);
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al cargar las entregas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const updateGrade = useCallback(async (exerciseId, appUserId, grade) => {
    try {
      setLoading(true);
      setError(null);
      const data = await assignGrade(exerciseId, appUserId, grade);
      setSubmissions((prev) =>
        prev.map((sub) => (sub.appUserId === appUserId ? { ...sub, grade } : sub))
      );
      showSuccess('Nota actualizada exitosamente');
      return data;
    } catch (err) {
      setError(err.message);
      showError('Error al actualizar la nota');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const clearCurrentSubmission = useCallback(() => {
    setCurrentSubmission(null);
  }, []);

  const value = useMemo(() => ({
    currentUserId,
    setCurrentUserId,
    currentSubmission,
    submissions,
    loading,
    error,
    fetchSubmissionById,
    fetchSubmissionByUserId,
    fetchSubmissions,
    updateGrade,
    clearCurrentSubmission,
  }), [currentUserId, submissions, error, loading, currentSubmission]);

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};

CodeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};