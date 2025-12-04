import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import ClassroomCard from "../../components/Classroom/ClassroomCard";
import JoinClassForm from "../../components/Classroom/JoinClassForm";
import TopBar from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";
import { getUserProfile } from "../../services/user.service";
import { AcademicCapIcon, PlusIcon, BookOpenIcon } from 'react-native-heroicons/solid';

export default function ClassroomListView() {
  const { classrooms, fetchClassrooms } = useContext(ClassroomContext);
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile();
        setUser(response);
        await fetchClassrooms();
      } catch (error) {
        console.error('Error al cargar datos:', error);
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.detail 
          || error.message 
          || "Error al cargar la información.";
        pushAlert("danger", errorMessage);
      }
    };

    fetchData();
  }, []);

  const isTeacher = user.appRoleId === 1;

  return (
    <View style={styles.wrapper}>
      {/* TopBar */}
      <TopBar
        onMenuPress={() => setSidebarOpen(true)}
        title="Mis Clases"
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ScrollView style={styles.container}>
        {/* Título y Botón en la misma línea */}
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            {isTeacher ? (
              <AcademicCapIcon size={24} color="#F97E72" />
            ) : (
              <BookOpenIcon size={24} color="#F97E72" />
            )}
            <Text style={styles.title}>
              {isTeacher ? "Clases que dictas" : "Clases en las que estás inscrito"}
            </Text>
          </View>

          {/* Botón Crear Clase solo para profesores */}
          {isTeacher && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate("CreateClassroom")}
            >
              <PlusIcon size={18} color="#FBFBFB" />
              <Text style={styles.createText}>Crear Clase</Text>
            </TouchableOpacity>
          )}
        </View>

      {/* Formulario para unirse a clase solo para estudiantes */}
      {!isTeacher && <JoinClassForm />}

      {/* Lista de clases */}
      {classrooms && classrooms.length > 0 ? (
        <View style={styles.classesGrid}>
          {classrooms.map((aula) => (
            <ClassroomCard key={aula.id || aula.idAula} aula={aula} />
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>
          {isTeacher
            ? "No tienes clases aún. Crea una para comenzar."
            : "No estás inscrito en ninguna clase."}
        </Text>
      )}
      </ScrollView>
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
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FBFBFB",
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
  classesGrid: {
    flexDirection: "column",
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
