import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { ClassroomContext } from '../../context/ClassroomProvider';
import { getClassroomSubmissions } from '../../services/reports.service';
import BackHeader from '../../components/Navigation/BackHeader';
import LoadingScreen from '../../components/Common/LoadingScreen';
import { colors, spacing, typography } from '../../constant/theme';
import PropTypes from 'prop-types';

// Helper: check submission status
const isSubmissionDelivered = (gradeData) =>
  gradeData?.submittedAt && gradeData.submittedAt !== '9999-12-31T23:59:59.997';

// Helper: check exercise resolved
const isExerciseResolved = (gradeData) => gradeData?.status === 1;

// Componente hijo extraído (CP42)
const GradeCell = ({ gradeData, isFirst, isLast }) => {
  const isSubmitted = isSubmissionDelivered(gradeData);
  const isResolved = isExerciseResolved(gradeData);

  return (
    <View style={styles.cellContent}>
      <View style={[styles.subCell, isFirst && styles.subCellFirst, isLast && styles.subCellLast]}>
        <Text style={styles.gradeText}>{gradeData.grade}/100</Text>
      </View>

      <View
        style={[
          styles.subCell,
          isFirst && styles.subCellFirst,
          isLast && styles.subCellLast,
          isSubmitted ? styles.subCellSuccess : styles.subCellError,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isSubmitted ? styles.statusTextSuccess : styles.statusTextError,
          ]}
        >
          {isSubmitted ? 'Entregado' : 'No entregado'}
        </Text>
      </View>

      <View
        style={[
          styles.subCell,
          isFirst && styles.subCellFirst,
          isLast && styles.subCellLast,
          isResolved ? styles.subCellSuccess : styles.subCellError,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isResolved ? styles.statusTextSuccess : styles.statusTextError,
          ]}
        >
          {isResolved ? 'Resuelto' : 'No resuelto'}
        </Text>
      </View>
    </View>
  );
};

// Validación de props (CP41)
GradeCell.propTypes = {
  gradeData: PropTypes.shape({
    grade: PropTypes.number.isRequired,
    status: PropTypes.number,
    submittedAt: PropTypes.string,
  }).isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

const ReportsView = () => {
  const { currentClassroomId } = useContext(ClassroomContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentClassroomId) {
          const response = await getClassroomSubmissions(currentClassroomId);
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentClassroomId]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Ejercicios
  const exercises = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  // Estudiantes únicos
  const studentsMap = new Map();
  data.forEach((exercise) => {
    exercise.submissions?.forEach((submission) => {
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

  // Nota de estudiante por ejercicio
  const getGradeForStudent = (studentId, exerciseId) => {
    const exercise = data.find((ex) => ex.id === exerciseId);
    if (!exercise) return null;

    const submission = exercise.submissions?.find((sub) => sub.appUserId === studentId);
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

            {/* Tabla */}
            <View style={styles.table}>
              {/* Encabezado */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.headerCell, styles.nameColumn]}>
                  <Text style={styles.headerText}>Nombre</Text>
                </View>
                {exercises.map((exercise) => (
                  <View key={exercise.id} style={[styles.tableCell, styles.headerCell]}>
                    <View style={styles.exerciseDot} />
                    <Text style={styles.headerText} numberOfLines={2}>
                      {exercise.name}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Filas */}
              {students.map((student) => (
                <View key={student.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.nameColumn]}>
                    <View style={styles.statusDot} />
                    <Text style={styles.cellText} numberOfLines={2}>
                      {student.name}
                    </Text>
                  </View>

                  {exercises.map((exercise, index) => {
                    const gradeData = getGradeForStudent(student.id, exercise.id);
                    const isFirst = index === 0;
                    const isLast = index === exercises.length - 1;

                    return (
                      <View key={`${student.id}-${exercise.id}`} style={styles.tableCell}>
                        {gradeData ? (
                          <GradeCell gradeData={gradeData} isFirst={isFirst} isLast={isLast} />
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
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  tableCell: {
    width: 280,
    minWidth: 280,
    maxWidth: 280,
    padding: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  nameColumn: {
    width: 200,
    minWidth: 200,
    maxWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.card,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  headerText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'left',
  },
  cellText: {
    ...typography.bodySmall,
    color: colors.text,
    textAlign: 'left',
  },
  cellContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.sm,
    flexWrap: 'nowrap',
    flex: 1,
    width: '100%',
  },
  subCell: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  subCellSuccess: {
    backgroundColor: 'rgba(50, 232, 117, 0.15)',
  },
  subCellError: {
    backgroundColor: 'rgba(249, 126, 114, 0.15)',
  },
  subCellFirst: {
    marginLeft: 0,
  },
  subCellLast: {
    marginRight: 0,
  },
  gradeText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusTextSuccess: {
    color: '#32E875',
  },
  statusTextError: {
    color: '#F97E72',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
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
  noDataText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default ReportsView;
