import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constant/theme';

const SubmissionRow = ({
  submission,
  onGradeChange,
  onViewCode
}) => {
  return (
    <View style={styles.tableRow}>
      {/* Student Name */}
      <View style={[styles.tableCell, { flex: 2 }]}>
        <Ionicons name="ellipse" size={12} color={colors.warning} />
        <Text style={styles.studentName}>
          {submission.appUser.firstName} {submission.appUser.lastName}
        </Text>
      </View>

      {/* Grade Input */}
      <View style={[styles.tableCell, { flex: 1, flexDirection: 'column' }]}>
        <TextInput
          style={styles.gradeInput}
          keyboardType="numeric"
          value={submission.grade?.toString() || ''}
          onChangeText={(value) => onGradeChange(submission.appUserId, value)}
          maxLength={3}
        />
        <View
          style={{
            width: '50%',
            height: 1,
            backgroundColor: colors.text,
            opacity: 0.5
          }}
        />
        <Text style={styles.gradeText}>100</Text>
      </View>

      {/* Solved Status */}
      <View style={[styles.tableCell, { flex: 0.8, justifyContent: 'center' }]}>
        <View style={styles.iconCircle}>
          {submission.status === 1 ? (
            <Ionicons name="checkmark" size={14} color={colors.success} />
          ) : (
            <Ionicons name="close" size={14} color={colors.warning} />
          )}
        </View>
      </View>

      {/* On Time Status */}
      <View style={[styles.tableCell, { flex: 0.8, justifyContent: 'center' }]}>
        <View style={styles.iconCircle}>
          <Ionicons name="time-outline" size={14} color={colors.success} />
        </View>
      </View>

      {/* View Code Button */}
      <View style={[styles.tableCell, { flex: 1 }]}>
        <TouchableOpacity
          style={styles.codeButton}
          onPress={() => onViewCode(submission.appUserId)}
        >
          <Ionicons name="code-slash" size={14} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 4,
  },
  studentName: {
    color: colors.text,
    fontSize: 12,
    flex: 1,
  },
  gradeInput: {
    backgroundColor: colors.primary,
    color: colors.text,
    width: 40,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  gradeText: {
    color: colors.text,
    fontSize: 12,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    gap: 4,
    width: '100%',
    height: '80%'
  },
  codeButtonText: {
    color: colors.text,
    fontSize: 10,
  },
});

export default SubmissionRow;
