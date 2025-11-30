import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import { getUserProfile } from '../../services/user.service';
import {
  LoadingScreen,
  ExerciseHeader,
  ExerciseInfo,
  StudentStatsCard,
  Button,
  BackHeader,
} from '../components';
import { colors, spacing } from '../../constant/theme';

const ExerciseStudentView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exerciseId } = route.params;
  const classroomId = 1; // Hardcoded for development
  const { currentExercise, loading: exerciseLoading, fetchExerciseById } = useExercise();
  const { currentSubmission, loading: submissionLoading, fetchSubmissionById, setCurrentUserId } = useCode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile();
        setCurrentUserId(userProfile.id);
        await fetchExerciseById(classroomId, exerciseId);
        await fetchSubmissionById(exerciseId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classroomId, exerciseId]);

  const handleVerCodigo = () => {
    navigation.navigate('Code', {
      exerciseId,
      userId: currentSubmission.appUserId,
    });
  };

  if (loading || exerciseLoading || submissionLoading) {
    return <LoadingScreen />;
  }

  const isResolved = currentSubmission?.status === 1;
  const isOnTime = currentSubmission?.submittedAt <= currentExercise?.dueDate;

  return (
    <>
      <BackHeader title={currentExercise?.name} />
      <ScrollView style={styles.container}>
      
      <ExerciseInfo 
        dueDate={currentExercise?.dueDate} 
        description={currentExercise?.description} 
      />

      <StudentStatsCard
        grade={currentSubmission?.grade}
        isResolved={isResolved}
        isOnTime={isOnTime}
      />

      <Button 
        title="Ver código" 
        onPress={handleVerCodigo}
        variant="primary"
      />
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
});

export default ExerciseStudentView;

