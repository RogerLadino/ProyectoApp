import { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import { ClassroomContext } from '../../context/ClassroomProvider';
import { getUserProfile } from '../../services/user.service';
import LoadingScreen from '../../components/Common/LoadingScreen';
import ExerciseInfo from '../../components/Exercise/ExerciseInfo';
import StudentStatsCard from '../../components/Exercise/StudentStatsCard';
import Button from '../../components/Common/Button';
import BackHeader from '../../components/Navigation/BackHeader';
import { colors, spacing } from '../../constant/theme';

const ExerciseStudentView = () => {
  const navigation = useNavigation();
  const { currentClassroomId } = useContext(ClassroomContext);
  const { currentExercise, currentExerciseId, loading: exerciseLoading, fetchExerciseById } = useExercise();
  const { currentSubmission, loading: submissionLoading, fetchSubmissionById, setCurrentUserId } = useCode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile();
        setCurrentUserId(userProfile.id);
        if (currentClassroomId && currentExerciseId) {
          await fetchExerciseById(currentClassroomId, currentExerciseId);
        }
        if (currentExerciseId) {
          await fetchSubmissionById(currentExerciseId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentExerciseId]);

  const handleVerCodigo = () => {
    navigation.navigate('Code');
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

