import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import * as classroomService from "../../services/classroom.service";
import { PencilIcon, TrashIcon, ArrowRightIcon } from 'react-native-heroicons/solid';

export default function TeacherClassroomCard({ aula }) {
  const navigation = useNavigation();
  const { fetchClassrooms, pushAlert } = useContext(ClassroomContext);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    console.log("🔴 handleDelete llamado para aula:", aula);
    
    // En web, usar confirm de JavaScript; en móvil, usar Alert nativo
    if (Platform.OS === 'web') {
      const confirmed = globalThis.confirm('¿Seguro de eliminar esta clase?');
      console.log("🔴 Confirmación web:", confirmed);
      if (!confirmed) {
        console.log("❌ Usuario canceló la eliminación");
        return;
      }
    } else {
      Alert.alert(
        "Eliminar Clase",
        "¿Seguro de eliminar esta clase?",
        [
          { 
            text: "Cancelar", 
            style: "cancel",
            onPress: () => console.log("❌ Usuario canceló la eliminación")
          },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              await executeDelete();
            },
          },
        ]
      );
      return; // Salir porque Alert es asíncrono en móvil
    }
    
    // Si llegamos aquí, es web y el usuario confirmó
    await executeDelete();
  };

  const executeDelete = async () => {
    console.log("⚠️ Usuario confirmó eliminación");
    setDeleting(true);
    try {
      const id = aula.idAula || aula.id;
      console.log("🔴 Intentando eliminar classroom con ID:", id);
      await classroomService.deleteClassroom(id);
      console.log("✅ Classroom eliminado exitosamente");
      pushAlert("success", "Clase eliminada correctamente.");
      fetchClassrooms();
    } catch (error) {
      console.error("❌ Error eliminando classroom:", error);
      console.error("❌ Respuesta del error:", error.response?.data);
      pushAlert("danger", "No se pudo eliminar la clase.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>{aula.nombre}</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{aula.name}</Text>
        <Text style={styles.cardText}>Código: {aula.code}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonWarning]}
            onPress={() => navigation.navigate("EditClassroom", { classroomId: aula.idAula || aula.id })}
          >
            <PencilIcon size={16} color="#FBFBFB" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={handleDelete}
            disabled={deleting}
          >
            <TrashIcon size={16} color="#FBFBFB" />
            <Text style={styles.buttonText}>{deleting ? "Eliminando..." : "Eliminar"}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary, styles.buttonFull]}
          onPress={() => navigation.navigate("ExerciseList", { classroomId: aula.id })}
        >
          <ArrowRightIcon size={18} color="#FBFBFB" />
          <Text style={styles.buttonText}>Ir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "#363031",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  cardHeader: {
    backgroundColor: "#F97E72",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardHeaderText: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  cardBody: {
    padding: 12,
  },
  cardText: {
    color: "#FBFBFB",
    fontSize: 14,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    gap: 6,
  },
  buttonWarning: {
    backgroundColor: "#F97E72",
    flex: 1,
  },
  buttonDanger: {
    backgroundColor: "#F15152",
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: "#F97E72",
  },
  buttonFull: {
    width: "100%",
    height: 35,
  },
  buttonText: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 14,
  },
});
