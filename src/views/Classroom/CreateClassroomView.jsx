import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import BackHeader from "../../components/Navigation/BackHeader";
import * as classroomService from "../../services/classroom.service.js";
import { PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/solid';

export default function CreateClassroomView() {
  const [nombre, setNombre] = useState("");
  const navigation = useNavigation();
  const { fetchClassrooms, pushAlert } = useContext(ClassroomContext);

  const handleSubmit = async () => {
    if (!nombre.trim()) return;

    try {
      await classroomService.createClassroom({ name: nombre.trim() });
      pushAlert("success", "Clase creada exitosamente.");
      fetchClassrooms();
      navigation.navigate("ClassroomList");
    } catch (error) {
      console.error(error);
      pushAlert("danger", "No se pudo crear la clase.");
    }
  };

  return (
    <View style={styles.wrapper}>
      <BackHeader title="Crear Clase" />
      
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de la clase</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Matemáticas"
            value={nombre}
            onChangeText={setNombre}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
              <PlusCircleIcon size={20} color="#FBFBFB" />
              <Text style={styles.buttonText}>Crear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <XCircleIcon size={20} color="#FBFBFB" />
              <Text style={styles.cancelText}>Cancelar</Text>
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
  card: {
    backgroundColor: "#363031",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 500,
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
  createButton: {
    backgroundColor: "#F97E72",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: "#363031",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    borderWidth: 2,
    borderColor: "#FBFBFB",
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