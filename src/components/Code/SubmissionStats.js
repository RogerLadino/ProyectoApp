import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const SubmissionStats = ({ currentSubmission }) => {
  const isResolved = currentSubmission?.status === 1;
  const isOnTime = currentSubmission?.submittedAt && currentSubmission.submittedAt !== '9999-12-31T23:59:59.997';
  const grade = currentSubmission?.grade || 0;
  const attempts = currentSubmission?.attempts || 0;

  return (
    <View style={styles.statsContainer}>
      {/* Resolved Cell */}
      <View style={[
        styles.statCell,
        isResolved ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={styles.statLabel}>Resuelto</Text>
        <Text style={[styles.statusText, isResolved ? styles.statusTextSuccess : styles.statusTextError]}>
          {isResolved ? 'Sí' : 'No'}
        </Text>
      </View>

      {/* Attempts Cell */}
      <View style={styles.statCell}>
        <Text style={styles.statLabel}>Intentos</Text>
        <Text style={styles.statValue}>{attempts}</Text>
      </View>

      {/* Grade Cell */}
      <View style={styles.statCell}>
        <Text style={styles.statLabel}>Nota</Text>
        <Text style={styles.gradeText}>{grade}/100</Text>
      </View>

      {/* On Time Cell */}
      <View style={[
        styles.statCell,
        isOnTime ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={styles.statLabel}>A tiempo</Text>
        <Text style={[styles.statusText, isOnTime ? styles.statusTextSuccess : styles.statusTextError]}>
          {isOnTime ? 'Sí' : 'No'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  statCell: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  gradeText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  cellSuccess: {
    backgroundColor: 'rgba(50, 232, 117, 0.15)',
  },
  cellError: {
    backgroundColor: 'rgba(249, 126, 114, 0.15)',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusTextSuccess: {
    color: '#32E875',
  },
  statusTextError: {
    color: '#F97E72',
  },
});

SubmissionStats.propTypes = {
  currentSubmission: PropTypes.shape({
    status: PropTypes.number,
    submittedAt: PropTypes.string,
    grade: PropTypes.number,
    attempts: PropTypes.number,
  }),
};

export default SubmissionStats;
