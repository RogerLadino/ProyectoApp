import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import JoinClassForm from "../../components/Classroom/JoinClassForm";
import ClassroomCard from "../../components/Classroom/ClassroomCard";
import { BookOpenIcon } from 'react-native-heroicons/solid';

export default function StudentClassroomView() {
  const { classrooms, fetchClassrooms } = useContext(ClassroomContext);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <BookOpenIcon size={24} color="#F97E72" />
        <Text style={styles.title}>Clases en las que estás inscrito</Text>
      </View>

      <JoinClassForm />

      {classrooms && classrooms.length > 0 ? (
        <View style={styles.classesGrid}>
          {classrooms.map((aula) => (
            <ClassroomCard key={aula.id || aula.idAula} aula={aula} />
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>No estás inscrito en ninguna clase.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#231F20" 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#FBFBFB",
  },
  classesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
  empty: { 
    marginTop: 40, 
    fontSize: 16, 
    color: "#FBFBFB",
    opacity: 0.6,
    textAlign: "center" 
  },
});