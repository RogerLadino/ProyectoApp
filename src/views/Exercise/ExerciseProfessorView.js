import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import {
  LoadingScreen,
  ProfessorHeader,
  SubmissionTableHeader,
  SubmissionRow,
  BackHeader,
} from '../components';
import { colors, spacing } from '../../constant/theme';

const ExerciseProfessorView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exerciseId } = route.params;
  const classroomId = 1; // Hardcoded for development
  const { currentExercise, loading: exerciseLoading, fetchExerciseById } = useExercise();
  const { submissions, loading: submissionsLoading, fetchSubmissions, updateGrade, setCurrentUserId } = useCode();
  const [loading, setLoading] = useState(true);
  const [localSubmissions, setLocalSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchExerciseById(classroomId, exerciseId);
        await fetchSubmissions(exerciseId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [classroomId, exerciseId]);

  useEffect(() => {
    setLocalSubmissions(submissions);
  }, [submissions]);

  const handleGradeChange = (userId, value) => {
    setLocalSubmissions((prev) =>
      prev.map((submission) =>
        submission.appUserId === userId
          ? { ...submission, grade: value }
          : submission
      )
    );
  };

  const handleSave = async () => {
    try {
      for (const submission of localSubmissions) {
        const grade = Number(submission.grade);
        if (grade && grade !== 0) {
          await updateGrade(exerciseId, submission.appUserId, grade);
        }
      }
      Alert.alert('Éxito', 'Notas actualizadas correctamente');
    } catch (error) {
      console.error('Error saving grades:', error);
      Alert.alert('Error', 'No se pudieron guardar las notas');
    }
  };

  const handleEditExercise = () => {
    navigation.navigate('EditExercise', { exerciseId });
  };

  const handleViewCode = (userId) => {
    setCurrentUserId(userId);
    navigation.navigate('Code', { exerciseId, userId });
  };

  if (loading || exerciseLoading || submissionsLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <BackHeader title={currentExercise?.name} />
      
      <View style={styles.content}>
        <ProfessorHeader
          title={currentExercise?.name}
          onEdit={handleEditExercise}
          onSave={handleSave}
        />

        <SubmissionTableHeader />

        <ScrollView style={styles.tableBody}>
          {localSubmissions.map((submission) => (
            <SubmissionRow
              key={submission.appUserId}
              submission={submission}
              onGradeChange={handleGradeChange}
              onViewCode={handleViewCode}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  tableBody: {
    flex: 1,
  },
});

export default ExerciseProfessorView;

