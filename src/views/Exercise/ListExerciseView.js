import { useEffect, useState, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { ClassroomContext } from '../../context/ClassroomProvider';
import { deleteClassroom } from '../../services/classroom.service';
import { getUserProfile } from '../../services/user.service';
import LoadingScreen from '../../components/Common/LoadingScreen';
import ExerciseCard from '../../components/Exercise/ExerciseCard';
import ClassroomInfoCard from '../../components/Classroom/ClassroomInfoCard';
import ClassroomCodeCard from '../../components/Classroom/ClassroomCodeCard';
import TopBar from '../../components/Navigation/TopBar';
import Sidebar from '../../components/Navigation/Sidebar';
import ActionButton from '../../components/Classroom/ActionButton';
import EmptyState from '../../components/Common/EmptyState';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { colors, spacing } from '../../constant/theme';

const ListExerciseView = () => {
  const { exercises, fetchExercisesByClassroom, setCurrentExerciseId, setCurrentExercise } = useExercise();
  const { currentClassroomId, currentClassroom, fetchClassrooms, pushAlert } = useContext(ClassroomContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomId = currentClassroomId || currentClassroom?.id;
        if (classroomId) {
          await fetchExercisesByClassroom(classroomId);
        }
        const fetchUser = await getUserProfile();
        setUser(fetchUser);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentClassroomId, currentClassroom]);

  const isProfessor = user.appRoleId === 1;

  const handleExercisePress = (exercise) => {
    setCurrentExercise(exercise)
    setCurrentExerciseId(exercise.id)
    navigation.navigate('Exercise');
  };

  const handleCreateExercise = () => {
    navigation.navigate('CreateExercise');
  };

  const handleViewGrades = () => {
    navigation.navigate('Reports');
  };

  const handleEditClassroom = () => {
    navigation.navigate('EditClassroom', { classroomId: currentClassroom.id });
  };

  const handleDeleteClassroom = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteClassroom = async () => {
    try {
      await deleteClassroom(currentClassroom.id);
      pushAlert('success', 'Clase eliminada correctamente.');
      await fetchClassrooms();
      setShowDeleteModal(false);
      navigation.navigate('ClassroomList');
    } catch (error) {
      console.error('Error al eliminar clase:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.detail 
        || error.message 
        || 'No se pudo eliminar la clase.';
      pushAlert('danger', errorMessage);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <TopBar
        onMenuPress={() => setSidebarOpen(true)}
        title={currentClassroom?.name || 'Clase'}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ScrollView style={styles.content}>
        {/* Información de clase (solo profesor) */}
        {isProfessor && (
          <View style={styles.classroomSection}>
            <ClassroomInfoCard 
              className={currentClassroom?.name || 'Nombre de la clase'}
              teacherName={currentClassroom?.teacherName || 'Nombre del profesor'}
            />
            
            {/* Código de clase */}
            <ClassroomCodeCard code={currentClassroom?.code || '------'} />
            
            {/* Botones de gestión de clase */}
            <View style={styles.actionButtons}>
              <ActionButton
                icon="pencil"
                label="Editar clase"
                onPress={handleEditClassroom}
              />
              <ActionButton
                icon="trash"
                label="Eliminar clase"
                onPress={handleDeleteClassroom}
              />
            </View>

            {/* Línea divisora */}
            <View style={styles.divider} />

            {/* Botones de acciones de ejercicios */}
            <View style={styles.actionButtons}>
              <ActionButton
                icon="add-circle"
                label="Nuevo ejercicio"
                onPress={handleCreateExercise}
              />
              <ActionButton
                icon="bar-chart"
                label="Calificaciones"
                onPress={handleViewGrades}
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
                onPress={() => handleExercisePress(exercise)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de confirmación para eliminar clase */}
      <ConfirmModal
        visible={showDeleteModal}
        title="Eliminar clase"
        message="¿Estás seguro de que deseas eliminar esta clase? Esta acción no se puede deshacer."
        onConfirm={confirmDeleteClassroom}
        onCancel={() => setShowDeleteModal(false)}
      />
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
  classroomSection: {
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.card,
    marginVertical: spacing.md,
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