import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getClassroomSubmissions } from '../services/reports.service';
import BackHeader from '../components/Navigation/BackHeader';
import LoadingScreen from '../components/Common/LoadingScreen';
import { colors, spacing, typography } from '../constant/theme';

const ReportsView = () => {
  const navigation = useNavigation();
  const classroomId = 1; // Hardcoded for development
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassroomSubmissions(classroomId);
        setData(response);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [classroomId]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Procesar datos para obtener ejercicios únicos y estudiantes
  const exercises = data.map(item => ({
    id: item.id,
    name: item.name,
  }));

  // Obtener todos los estudiantes únicos
  const studentsMap = new Map();
  data.forEach(exercise => {
    exercise.submissions?.forEach(submission => {
      if (submission.appUser) {
        const userId = submission.appUser.id;
        if (!studentsMap.has(userId)) {
          studentsMap.set(userId, {
            id: userId,
            name: `${submission.appUser.firstName} ${submission.appUser.lastName}`,
            email: submission.appUser.email,
          });
        }
      }
    });
  });

  const students = Array.from(studentsMap.values());

  // Crear matriz de calificaciones
  const getGradeForStudent = (studentId, exerciseId) => {
    const exercise = data.find(ex => ex.id === exerciseId);
    if (!exercise) return null;
    
    const submission = exercise.submissions?.find(sub => sub.appUserId === studentId);
    if (!submission) return null;

    return {
      grade: submission.grade || 0,
      status: submission.status,
      submittedAt: submission.submittedAt,
    };
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Reportes" />
      
      <ScrollView horizontal style={styles.horizontalScroll}>
        <ScrollView style={styles.verticalScroll}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.statsHeader}>
              <View style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Estadísticas</Text>
            </View>

            {/* Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.headerCell, styles.nameColumn]}>
                  <Text style={styles.headerText}>Nombre</Text>
                </View>
                {exercises.map(exercise => (
                  <View key={exercise.id} style={[styles.tableCell, styles.headerCell]}>
                    <View style={styles.exerciseDot} />
                    <Text style={styles.headerText} numberOfLines={2}>
                      {exercise.name}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Table Rows */}
              {students.map(student => (
                <View key={student.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.nameColumn]}>
                    <View style={styles.statusDot} />
                    <Text style={styles.cellText} numberOfLines={2}>
                      {student.name}
                    </Text>
                  </View>
                  {exercises.map(exercise => {
                    const gradeData = getGradeForStudent(student.id, exercise.id);
                    return (
                      <View key={`${student.id}-${exercise.id}`} style={styles.tableCell}>
                        {gradeData ? (
                          <>
                            <View style={styles.scoreWrapper}>
                              <Text style={styles.scoreInput}>{gradeData.grade}</Text>
                              <Text style={styles.scoreSuffix}>/100</Text>
                            </View>
                            <View style={styles.statsIcons}>
                              <Text style={styles.iconText}>✓</Text>
                              {gradeData.submittedAt && gradeData.submittedAt !== '9999-12-31T23:59:59.997' && (
                                <Text style={styles.iconText}>⏱</Text>
                              )}
                            </View>
                          </>
                        ) : (
                          <Text style={styles.noDataText}>-</Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  horizontalScroll: {
    flex: 1,
  },
  verticalScroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  titleIcon: {
    width: 28,
    height: 28,
    borderWidth: 3,
    borderColor: colors.accent,
    borderRadius: 14,
  },
  headerTitle: {
    ...typography.h2,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: colors.text,
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
  },
  tableCell: {
    minWidth: 150,
    padding: spacing.md,
    borderRightWidth: 1,
    borderRightColor: colors.text,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nameColumn: {
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
  },
  cellText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  exerciseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.accent,
    flexShrink: 0,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    flexShrink: 0,
  },
  scoreWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginBottom: spacing.xs,
  },
  scoreInput: {
    fontWeight: '500',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    paddingBottom: 2,
    minWidth: 25,
    textAlign: 'center',
  },
  scoreSuffix: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconText: {
    color: colors.text,
    fontSize: 14,
  },
  noDataText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default ReportsView;
