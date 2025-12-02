import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constant/theme';

const StudentStatsCard = ({ grade, isResolved, isOnTime }) => {
  return (
    <View style={styles.statsContainer}>
      {/* Grade Cell */}
      <View style={styles.statCell}>
        <Text style={styles.statLabel}>Nota</Text>
        <Text style={styles.gradeText}>{grade || 0}/100</Text>
      </View>

      {/* Resolved Status Cell */}
      <View style={[
        styles.statCell,
        isResolved ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={styles.statLabel}>Resuelto</Text>
        <Text style={[styles.statusText, isResolved ? styles.statusTextSuccess : styles.statusTextError]}>
          {isResolved ? 'Resuelto' : 'No resuelto'}
        </Text>
      </View>

      {/* On Time Status Cell */}
      <View style={[
        styles.statCell,
        isOnTime ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={styles.statLabel}>A tiempo</Text>
        <Text style={[styles.statusText, isOnTime ? styles.statusTextSuccess : styles.statusTextError]}>
          {isOnTime ? 'A tiempo' : 'Fuera de tiempo'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCell: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  gradeText: {
    fontSize: 18,
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

export default StudentStatsCard;
