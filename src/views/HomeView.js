import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ClassroomContext } from '../context/ClassroomProvider';
import { useAuth } from '../context/AuthContext';
import { BookOpenIcon, UserIcon } from 'react-native-heroicons/solid';

export default function HomeView() {
  const { classrooms, fetchClassrooms } = useContext(ClassroomContext);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <BookOpenIcon size={28} color="#F97E72" />
          <Text style={styles.title}>Mis Aulas</Text>
        </View>
        
        {/* Solo mostrar botón Crear Clase si es profesor (appRoleId === 1) */}
        {user?.appRoleId === 1 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateClassroom')}
          >
            <Text style={styles.buttonText}>Crear Clase</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.manageButton}
          onPress={() => navigation.navigate('ListClassroom')}
        >
          <Text style={styles.manageButtonText}>Gestionar Clases</Text>
        </TouchableOpacity>

        {classrooms.length === 0 ? (
          <Text style={styles.empty}>No estás inscrito en ninguna clase.</Text>
        ) : (
          classrooms.map((classroom) => (
            <View key={classroom.id} style={styles.card}>
              <Text style={styles.className}>{classroom.name}</Text>
              <View style={styles.teacherContainer}>
                <UserIcon size={16} color="#F97E72" />
                <Text style={styles.teacher}>Profesor: {classroom.teacherName || 'Desconocido'}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#231F20',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FBFBFB',
  },
  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: '#F97E72',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FBFBFB',
    fontSize: 16,
    fontWeight: '600',
  },
  manageButton: {
    backgroundColor: '#F97E72',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#FBFBFB',
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    color: '#FBFBFB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.7,
  },
  card: {
    backgroundColor: '#363031',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FBFBFB',
    marginBottom: 8,
  },
  teacher: {
    fontSize: 14,
    color: '#FBFBFB',
    opacity: 0.8,
  },
});
