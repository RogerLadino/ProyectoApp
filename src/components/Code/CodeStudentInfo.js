import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constant/theme';

const CodeStudentInfo = ({ student }) => {
  return (
    <View style={styles.studentInfo}>
      <View style={styles.studentInfoRow}>
        <Ionicons name="ellipse" size={14} color={colors.warning} />
        <Text style={styles.studentName}>
          {student?.firstName} {student?.lastName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studentInfo: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 12,
  },
  studentName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
});

export default CodeStudentInfo;
