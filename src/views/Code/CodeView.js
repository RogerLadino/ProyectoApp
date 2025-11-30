import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as signalR from '@microsoft/signalr';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import { TopBar, Sidebar } from '../../components';
import { 
  UserList, 
  StudentInfo, 
  SubmissionStats, 
  CodeEditor, 
  TabSection 
} from '../../components/Code';
import { API_URL } from '../../constant/api.config';

export function CodeView() {
  const [activeTab, setActiveTab] = useState('ejercicio');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [isProfessor, setIsProfessor] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const classroomId = 1; // Hardcoded for development
  const { currentExercise, currentExerciseId, fetchExerciseById } = useExercise();
  const { currentSubmission, currentUserId, setCurrentUserId, submissions, fetchSubmissions, fetchSubmissionByUserId } = useCode();

  const connectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchExerciseById(classroomId, currentExerciseId);
        if (isProfessor) {
          await fetchSubmissions(currentExerciseId);
        }
        await fetchSubmissionByUserId(currentExerciseId, currentUserId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentExerciseId, currentUserId, isProfessor]);

  useEffect(() => {
    if (currentExerciseId == null || currentUserId == null) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/hubs/code`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(async () => {
        connection.on('CodeInitialized', (initialCode) => {
          if (initialCode?.sourceCode) setCode(initialCode.sourceCode);
        });

        connection.on('CodeUpdated', (updatedCode) => {
          if (updatedCode?.sourceCode) setCode(updatedCode.sourceCode);
        });

        await connection.invoke('JoinExerciseGroup', parseInt(currentExerciseId), parseInt(currentUserId));
      })
      .catch((err) => console.error('Error al conectar:', err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [currentExerciseId, currentUserId]);

  const handleCodeChange = (newValue) => {
    setCode(newValue);

    if (connectionRef.current) {
      const codeDto = {
        appUserId: currentUserId,
        exerciseId: currentExerciseId,
        sourceCode: newValue,
      };

      connectionRef.current
        .invoke('UpdateCode', codeDto)
        .catch((err) => console.error('Error enviando UpdateCode:', err));
    }
  };

  const handleSelectUser = (userId) => {
    setCurrentUserId(userId);
  };

  const handleRunCode = () => {
    console.log('Ejecutar código');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97E72" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <TopBar
        onMenuPress={() => setSidebarOpen(true)}
        title={currentExercise?.name}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ScrollView style={styles.content}>
        <View style={styles.studentInfo}>
          {isProfessor ? (
            <UserList 
              submissions={submissions}
              currentUserId={currentUserId}
              onSelectUser={handleSelectUser}
            />
          ) : (
            <StudentInfo currentSubmission={currentSubmission} />
          )}

          {isProfessor && <SubmissionStats currentSubmission={currentSubmission} />}
        </View>

        <CodeEditor 
          code={code}
          language={language}
          onCodeChange={handleCodeChange}
          onLanguageChange={setLanguage}
          onRunCode={handleRunCode}
        />

        <TabSection 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          exerciseDescription={currentExercise?.description}
          isProfessor={isProfessor}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231F20',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#231F20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  studentInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#363031',
  },
});

export default CodeView;
