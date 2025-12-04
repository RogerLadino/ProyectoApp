import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import { useNotification } from '../../context/NotificationContext';
import { ClassroomContext } from '../../context/ClassroomProvider';
import LoadingScreen from '../../components/Common/LoadingScreen';
import ProfessorHeader from '../../components/Layout/ProfessorHeader';
import SubmissionTableHeader from '../../components/Exercise/SubmissionTableHeader';
import SubmissionRow from '../../components/Exercise/SubmissionRow';
import BackHeader from '../../components/Navigation/BackHeader';
import { colors, spacing } from '../../constant/theme';

const ExerciseProfessorView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentClassroomId } = useContext(ClassroomContext);
  const { currentExercise, currentExerciseId, loading: exerciseLoading, fetchExerciseById } = useExercise();
  const { submissions, loading: submissionsLoading, fetchSubmissions, updateGrade, setCurrentUserId } = useCode();
  const { showWarning } = useNotification();
  const [loading, setLoading] = useState(true);
  const [localSubmissions, setLocalSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentClassroomId && currentExerciseId) {
          await fetchExerciseById(currentClassroomId, currentExerciseId);
        }
        if (currentExerciseId) {
          await fetchSubmissions(currentExerciseId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentClassroomId, currentExerciseId]);

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
    } catch (error) {
      console.error('Error saving grades:', error);
    }
  };

  const handleEditExercise = () => {
    console.log('hola')
    navigation.navigate('EditExercise');
  };

  const handleViewCode = (userId) => {
    setCurrentUserId(userId);
    navigation.navigate('Code');
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

