import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import BackHeader from "../../components/Navigation/BackHeader";
import * as classroomService from "../../services/classroom.service";
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/solid';

export default function EditClassroomView() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pushAlert, fetchClassrooms } = useContext(ClassroomContext);
  const { classroomId } = route.params;

  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClassroom = async () => {
      try {
        const classroom = await classroomService.getClassroomById(classroomId);
        setNombre(classroom.nombre || classroom.name || "");
      } catch (error) {
        console.error('Error al cargar clase:', error);
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.detail 
          || error.message 
          || "No se pudo cargar la información de la clase.";
        pushAlert("danger", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadClassroom();
  }, [classroomId]);

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      pushAlert("danger", "El nombre no puede estar vacío.");
      return;
    }

    try {
      await classroomService.updateClassroom(classroomId, { name: nombre.trim() });
      pushAlert("success", "Clase actualizada correctamente.");
      await fetchClassrooms();
      navigation.navigate("ListExercise", { classroomId });
    } catch (error) {
      console.error('Error al actualizar clase:', error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.detail 
        || error.message 
        || "No se pudo actualizar la clase.";
      pushAlert("danger", errorMessage);
    }
  };

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <BackHeader title="Editar Clase" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F97E72" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <BackHeader title="Editar Clase" />
      
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de la clase</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ejemplo: Matemáticas"
            placeholderTextColor="#888"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <XCircleIcon size={20} color="#FBFBFB" />
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <CheckCircleIcon size={20} color="#FBFBFB" />
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#231F20"
  },
  container: { 
    flex: 1, 
    padding: 20,
    alignItems: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#363031",
    padding: 20,
    borderRadius: 12,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  label: { 
    fontSize: 16, 
    marginBottom: 10,
    color: "#FBFBFB",
    fontWeight: "600"
  },
  input: {
    backgroundColor: "#231F20",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
    color: "#FBFBFB"
  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    gap: 12
  },
  cancelButton: {
    backgroundColor: "#363031",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    borderWidth: 2,
    borderColor: "#FBFBFB",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: "#F97E72",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: { 
    color: "#FBFBFB", 
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  cancelText: { 
    color: "#FBFBFB", 
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
});