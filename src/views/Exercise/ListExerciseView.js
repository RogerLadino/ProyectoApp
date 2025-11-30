import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { getClassroomById } from '../../services/classroom.service';
import { getUserProfile } from '../../services/user.service';
import {
  LoadingScreen,
  ExerciseCard,
  ClassroomCodeCard,
  TopBar,
  Sidebar,
  ActionButton,
  EmptyState,
} from '../components';
import { colors, spacing } from '../../constant/theme';
import { FloatingPlusButton } from '../../components/Buttons';

export const ListExerciseView = () => {
  const classroomId = 1; // Hardcoded for development
  const { exercises, loading: exerciseLoading, fetchExercisesByClassroom } = useExercise();
  const [classroom, setClassroom] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchExercisesByClassroom(classroomId);
        const fetchClassroom = await getClassroomById(classroomId);
        const fetchUser = await getUserProfile();

        setClassroom(fetchClassroom);
        setUser(fetchUser);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classroomId]);

  const isProfessor = user.appRoleId === 1;

  const handleExercisePress = (exerciseId) => {
    navigation.navigate('Exercise', { exerciseId });
  };

  const handleCreateExercise = () => {
    navigation.navigate('CreateExercise');
  };

  const handleViewGrades = () => {
    // Navegar a vista de calificaciones
    console.log('Ver calificaciones');
  };

  const handleEditClassroom = () => {
    // Navegar a vista de editar clase
    console.log('Editar clase');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <TopBar
        onMenuPress={() => setSidebarOpen(true)}
        title={classroom.name}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ScrollView style={styles.content}>
        {/* Código de clase (solo profesor) */}
        {isProfessor && (
          <View style={styles.codeSection}>
            <ClassroomCodeCard code={classroom.code} />

            {/* Botones de acción (solo profesor) */}
            <View style={styles.actionButtons}>
              <ActionButton
                icon="bar-chart"
                label="Calificaciones"
                onPress={handleViewGrades}
              />
              <ActionButton
                icon="pencil"
                label="Editar Clase"
                onPress={handleEditClassroom}
              />
            </View>
          </View>
        )}

        {/* Lista de ejercicios */}
        <View style={styles.exercisesSection}>
          {exercises.length === 0 ? (
            <EmptyState
              icon="document-text-outline"
              message="No hay ejercicios disponibles"
            />
          ) : (
            exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onPress={() => handleExercisePress(exercise.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
      <FloatingPlusButton onPress={handleCreateExercise} />
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
    padding: spacing.sm,
  },
  codeSection: {
    marginBottom: spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    flex: 1
  },
  exercisesSection: {
    marginBottom: spacing.xl,
  },
});

export default ListExerciseView;
