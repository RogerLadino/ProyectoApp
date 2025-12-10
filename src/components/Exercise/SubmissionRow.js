import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const SubmissionRow = ({
  submission,
  onGradeChange,
  onViewCode
}) => {
  const isResolved = submission.status === 1;
  const isOnTime = submission.submittedAt && submission.submittedAt !== '9999-12-31T23:59:59.997';

  return (
    <View style={styles.tableRow}>
      {/* Student Name Cell */}
      <View style={[styles.tableCell, styles.nameColumn]}>
        <Ionicons name="ellipse" size={12} color={colors.accent} />
        <Text style={styles.studentName}>
          {submission.appUser.firstName} {submission.appUser.lastName}
        </Text>
      </View>

      {/* Grade Cell */}
      <View style={styles.tableCell}>
        <View style={styles.gradeContainer}>
          <TextInput
            style={styles.gradeInput}
            keyboardType="numeric"
            value={submission.grade?.toString() || ''}
            onChangeText={(value) => onGradeChange(submission.appUserId, value)}
            maxLength={3}
            placeholderTextColor={colors.textSecondary}
            placeholder="0"
          />
          <Text style={styles.gradeText}>/100</Text>
        </View>
      </View>

      {/* Resolved Status Cell */}
      <View style={[
        styles.tableCell,
        isResolved ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={[styles.statusText, isResolved ? styles.statusTextSuccess : styles.statusTextError]}>
          {isResolved ? 'Resuelto' : 'No resuelto'}
        </Text>
      </View>

      {/* On Time Status Cell */}
      <View style={[
        styles.tableCell,
        isOnTime ? styles.cellSuccess : styles.cellError
      ]}>
        <Text style={[styles.statusText, isOnTime ? styles.statusTextSuccess : styles.statusTextError]}>
          {isOnTime ? 'A tiempo' : 'Fuera de tiempo'}
        </Text>
      </View>

      {/* View Code Button Cell */}
      <View style={styles.tableCell}>
        <TouchableOpacity
          style={styles.codeButton}
          onPress={() => onViewCode(submission.appUserId)}
        >
          <Ionicons name="code-slash" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  tableCell: {
    flex: 1,
    backgroundColor: colors.card,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  nameColumn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  studentName: {
    color: colors.text,
    fontSize: 12,
    flex: 1,
  },
  gradeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  gradeInput: {
    backgroundColor: colors.primary,
    color: colors.text,
    width: 35,
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: '600',
  },
  gradeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  cellSuccess: {
    backgroundColor: 'rgba(50, 232, 117, 0.15)',
  },
  cellError: {
    backgroundColor: 'rgba(249, 126, 114, 0.15)',
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
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 100,
    width: '100%',
  },
});

SubmissionRow.propTypes = {
  submission: PropTypes.shape({
    appUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.number,
    submittedAt: PropTypes.string,
    grade: PropTypes.number,
    appUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onGradeChange: PropTypes.func.isRequired,
  onViewCode: PropTypes.func.isRequired,
};

export default SubmissionRow;
