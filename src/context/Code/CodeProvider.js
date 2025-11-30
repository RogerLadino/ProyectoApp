import React, { useState, useCallback } from 'react';
import { CodeContext } from './CodeContext';
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

  const fetchSubmissionById = useCallback(async (exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissionById(exerciseId);
      setCurrentSubmission(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmissionByUserId = useCallback(async (exerciseId, userId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissionByUserId(exerciseId, userId);
      setCurrentSubmission(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmissions = useCallback(async (exerciseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubmissions(exerciseId);
      setSubmissions(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGrade = useCallback(async (exerciseId, appUserId, grade) => {
    try {
      setLoading(true);
      setError(null);
      const data = await assignGrade(exerciseId, appUserId, grade);
      setSubmissions((prev) =>
        prev.map((sub) => (sub.appUserId === appUserId ? { ...sub, grade } : sub))
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCurrentSubmission = useCallback(() => {
    setCurrentSubmission(null);
  }, []);

  const value = {
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
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
