import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserIcon } from 'react-native-heroicons/solid';
import { ClassroomContext } from "../../context/ClassroomProvider";

export default function ClassroomCard({ aula }) {
  const navigation = useNavigation();
  const { selectClassroom } = useContext(ClassroomContext);
  const id = aula.id || aula.idAula;
  const nombre = aula.nombre || aula.name || "Sin nombre";

  const handleCardPress = () => {
    console.log("hello")
    selectClassroom(aula);
    navigation.navigate("ListExercise", { classroomId: id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.7}>
      <Text style={styles.className}>{aula.name}</Text>
      <View style={styles.teacherContainer}>
        <UserIcon size={16} color="#F97E72" />
        <Text style={styles.teacher}>Profesor: {aula.teacherName || 'Desconocido'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#363031",
    borderRadius: 12,
    padding: 16,
    width: '100%',
    flex: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  className: {
    color: "#FBFBFB",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  teacherContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  teacher: {
    color: "#FBFBFB",
    fontSize: 14,
  },
});