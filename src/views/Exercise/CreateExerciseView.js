import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/Exercise';
import { ClassroomContext } from '../../context/ClassroomProvider';
import { useTestCases } from '../../hooks/useTestCases';
import { useNotification } from '../../context/NotificationContext';
import LoadingScreen from '../../components/Common/LoadingScreen';
import ExerciseHeader from '../../components/Exercise/ExerciseHeader';
import ExerciseFormField from '../../components/Exercise/ExerciseFormField';
import TestCaseItem from '../../components/TestCase/TestCaseItem';
import Button from '../../components/Common/Button';
import BackHeader from '../../components/Navigation/BackHeader';
import DateTimeInput from '../../components/Input/DateTimeInput';
import { colors, spacing } from '../../constant/theme';

const CreateExerciseView = () => {
  const { currentClassroomId } = useContext(ClassroomContext);
  const { createNewExercise, loading } = useExercise();
  const { showWarning } = useNotification();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const navigation = useNavigation();

  const {
    pruebas,
    agregarPrueba,
    eliminarPrueba,
    actualizarPrueba,
    agregarParametro,
    eliminarParametro,
    actualizarParametro,
    actualizarSalida,
    getParsedTestCases,
  } = useTestCases();

  const handleSubmit = async () => {
    if (!nombre || !descripcion || !fechaEntrega) {
      showWarning('Por favor completa todos los campos');
      return;
    }

    try {
      await createNewExercise(
        currentClassroomId,
        nombre,
        descripcion,
        fechaEntrega,
        getParsedTestCases()
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error creating exercise:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Crear Ejercicio" />
      
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

          {/* Botón Guardar */}
          <Button
            title="Guardar"
            onPress={handleSubmit}
            variant="primary"
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  form: {
    marginBottom: spacing.xl,
  },
  testsSection: {
    marginTop: spacing.md,
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
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});

export default CreateExerciseView;
