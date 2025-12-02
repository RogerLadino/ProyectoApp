import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { useTestCases } from '../../hooks/useTestCases';
import LoadingScreen from '../../components/Common/LoadingScreen';
import ExerciseHeader from '../../components/Exercise/ExerciseHeader';
import ExerciseFormField from '../../components/Exercise/ExerciseFormField';
import TestCaseItem from '../../components/TestCase/TestCaseItem';
import Button from '../../components/Common/Button';
import BackHeader from '../../components/Navigation/BackHeader';
import DateTimeInput from '../../components/Input/DateTimeInput';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { colors, spacing } from '../../constant/theme';

const EditExerciseView = () => {
  const { exerciseId } = useRoute().params;
  const classroomId = 1; // Hardcoded for development
  const { fetchExerciseById, updateCurrentExercise, removeExercise, loading } = useExercise();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigation = useNavigation();

  const {
    pruebas,
    setPruebas,
    agregarPrueba,
    eliminarPrueba,
    actualizarPrueba,
    agregarParametro,
    eliminarParametro,
    actualizarParametro,
    actualizarSalida,
    getParsedTestCases,
    parseTestCases,
  } = useTestCases();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exercise = await fetchExerciseById(classroomId, exerciseId);
        setNombre(exercise.name);
        setDescripcion(exercise.description);
        setFechaEntrega(exercise.dueDate);
        const testCases = parseTestCases(exercise.testCases);
        setPruebas(testCases);
      } catch (error) {
        console.error('Error fetching exercise:', error);
        Alert.alert('Error', 'No se pudo cargar el ejercicio');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classroomId, exerciseId]);

  const handleSubmit = async () => {
    if (!nombre || !descripcion || !fechaEntrega) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await updateCurrentExercise(
        classroomId,
        exerciseId,
        nombre,
        descripcion,
        fechaEntrega,
        getParsedTestCases(parseInt(exerciseId))
      );
      Alert.alert('Éxito', 'Ejercicio actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating exercise:', error);
      Alert.alert('Error', 'No se pudo actualizar el ejercicio');
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    try {
      await removeExercise(classroomId, exerciseId);
      Alert.alert('Éxito', 'Ejercicio eliminado correctamente');
      navigation.navigate('ListExercise');
    } catch (error) {
      console.error('Error deleting exercise:', error);
      Alert.alert('Error', 'No se pudo eliminar el ejercicio');
    }
  };

  if (isLoading || loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Editar Ejercicio" />
      
      <ScrollView style={styles.content}>

        <View style={styles.form}>
          {/* Nombre */}
          <ExerciseFormField
            label="Nombre del ejercicio"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del ejercicio"
          />

          {/* Descripción */}
          <ExerciseFormField
            label="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Descripción del ejercicio"
            multiline
          />

          {/* Fecha de entrega */}
          <DateTimeInput
            label="Fecha de entrega"
            value={fechaEntrega}
            onChange={setFechaEntrega}
            placeholder="Seleccionar fecha y hora"
          />

          {/* Pruebas */}
          <View style={styles.testsSection}>
            <View style={styles.testsHeader}>
              <View style={styles.labelContainer}>
                <Ionicons name="ellipse-outline" size={14} color={colors.accent} />
                <Text style={styles.label}>Pruebas</Text>
              </View>
              <TouchableOpacity onPress={agregarPrueba}>
                <Ionicons name="add-circle" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            {pruebas.map((prueba, index) => (
              <TestCaseItem
                key={index}
                testCase={prueba}
                index={index}
                onUpdate={actualizarPrueba}
                onDelete={eliminarPrueba}
                onAddParameter={agregarParametro}
                onDeleteParameter={eliminarParametro}
                onUpdateParameter={actualizarParametro}
                onUpdateOutput={actualizarSalida}
              />
            ))}
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <Button
              title="Guardar"
              onPress={handleSubmit}
              variant="primary"
              style={styles.button}
            />
            <Button
              title="Eliminar"
              onPress={() => setShowDeleteModal(true)}
              variant="secondary"
              style={[styles.button, styles.deleteButton]}
            />
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={showDeleteModal}
        title="¿Estás seguro?"
        message="Esta acción eliminará el ejercicio permanentemente y no se puede deshacer."
        onConfirm={handleDelete}
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
    padding: spacing.md,
  },
  form: {
    marginBottom: spacing.xl,
  },
  testsSection: {
    marginBottom: spacing.lg,
  },
  testsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: colors.warning,
  },
});

export default EditExerciseView;
