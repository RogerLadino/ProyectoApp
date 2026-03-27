import { useEffect, useRef, useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as signalR from '@microsoft/signalr';
import { useExercise } from '../../context/Exercise';
import { useCode } from '../../context/Code';
import { ClassroomContext } from '../../context/ClassroomProvider';
import TopBar from '../../components/Navigation/TopBar';
import Sidebar from '../../components/Navigation/Sidebar';
import UserList from '../../components/Code/UserList';
import StudentInfo from '../../components/Code/StudentInfo';
import SubmissionStats from '../../components/Code/SubmissionStats';
import CodeEditor from '../../components/Code/CodeEditor';
import TabSection from '../../components/Code/TabSection';
import { API_URL } from '../../constant/api.config';
import { getUserProfile } from '../../services/user.service';

const CodeView = () => {
  const { currentClassroomId } = useContext(ClassroomContext);
  const { currentExercise, currentExerciseId, fetchExerciseById } = useExercise();
  const { currentSubmission, currentUserId, setCurrentUserId, submissions, fetchSubmissions, fetchSubmissionByUserId } = useCode();

  const [activeTab, setActiveTab] = useState('ejercicio');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [isProfessor, setIsProfessor] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const connectionRef = useRef(null);

  // Handler para inicializar código
  const handleCodeInitialized = (initialCode) => {
    if (initialCode?.sourceCode) setCode(initialCode.sourceCode);
  };

  // Handler para actualizar código
  const handleCodeUpdated = (updatedCode) => {
    if (updatedCode?.sourceCode) setCode(updatedCode.sourceCode);
  };

  // Función para iniciar la conexión SignalR
  const startSignalRConnection = async (connection) => {
    try {
      await connection.start();
      connection.on('CodeInitialized', handleCodeInitialized);
      connection.on('CodeUpdated', handleCodeUpdated);
      await connection.invoke('JoinExerciseGroup', currentExerciseId, currentUserId);
    } catch (err) {
      console.error('Error al conectar:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserProfile();

        setIsProfessor(user.appRoleId == 1)
        if(currentUserId == null)
          setCurrentUserId(user.id);

        if (currentClassroomId) {
          await fetchExerciseById(currentClassroomId, currentExerciseId);
        }
        if (isProfessor) {
          await fetchSubmissions(currentExerciseId);
        }
        if (currentUserId) {
          await fetchSubmissionByUserId(currentExerciseId, currentUserId);
        }

        console.log(currentSubmission, currentUserId)

        // Establecer conexión SignalR después de obtener el ejercicio y userId
        if (currentExerciseId && currentUserId) {
          const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_URL}/hubs/code`)
            .withAutomaticReconnect()
            .build();

          await startSignalRConnection(connection);
          connectionRef.current = connection;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
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
