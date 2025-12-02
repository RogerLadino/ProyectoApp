import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowRightIcon } from 'react-native-heroicons/solid';

export default function ClassroomCard({ aula }) {
  const navigation = useNavigation();
  const id = aula.id || aula.idAula;
  const nombre = aula.nombre || aula.name || "Sin nombre";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText} numberOfLines={2}>
          {nombre}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{nombre}</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ExerciseList", { classroomId: id })}
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
  button: {
    backgroundColor: "#F97E72",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
    height: 35,
    flexDirection: 'row',
    gap: 6,
  },
  buttonText: {
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: 14,
  },
});