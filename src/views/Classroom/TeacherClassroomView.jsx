import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import TeacherClassroomCard from "../../components/Classroom/TeacherClassroomCard";
import { AcademicCapIcon, PlusIcon } from 'react-native-heroicons/solid';

export default function TeacherClassroomView() {
  const { classrooms, fetchClassrooms } = useContext(ClassroomContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const renderItem = ({ item }) => (
    <TeacherClassroomCard key={item.idAula || item.id} aula={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("CreateClassroom")}
        >
          <PlusIcon size={18} color="#FBFBFB" />
          <Text style={styles.createText}>Crear Clase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.classesContainer}>
        <View style={styles.titleContainer}>
          <AcademicCapIcon size={24} color="#F97E72" />
          <Text style={styles.title}>Clases que dictas</Text>
        </View>

        {classrooms && classrooms.length > 0 ? (
          <FlatList
            data={classrooms}
            keyExtractor={(item) => item.idAula?.toString() || item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.empty}>No tienes clases aún. Crea una para comenzar.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#231F20" 
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    alignItems: "center", 
    marginBottom: 16 
  },
  createButton: { 
    backgroundColor: "#363031", 
    paddingVertical: 12,
    paddingHorizontal: 18, 
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  createText: { 
    color: "#FBFBFB", 
    fontWeight: "bold",
    fontSize: 16
  },
  classesContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#FBFBFB",
  },
  list: { 
    paddingBottom: 20,
  },
  row: {
    justifyContent: "flex-start",
  },
  empty: { 
    textAlign: "center", 
    marginTop: 40, 
    fontSize: 16, 
    color: "#FBFBFB",
    opacity: 0.6
  },
});