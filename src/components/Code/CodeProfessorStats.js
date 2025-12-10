import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const CodeProfessorStats = ({ 
  isResolved, 
  attempts, 
  grade, 
  isOnTime,
  onGradeChange 
}) => {
  return (
    <View style={styles.statsRow}>
      {/* Resolved */}
      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color={colors.accent} />
        <Text style={styles.statLabel}>Resuelto:</Text>
        {isResolved ? (
          <Ionicons name="checkmark-circle" size={14} color={colors.success} />
        ) : (
          <Ionicons name="close" size={14} color={colors.warning} />
        )}
      </View>

      {/* Attempts */}
      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color={colors.accent} />
        <Text style={styles.statLabel}>Intentos:</Text>
        <Text style={styles.statValue}>{attempts || 0}</Text>
      </View>

      {/* Grade */}
      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color={colors.accent} />
        <Text style={styles.statLabel}>Nota:</Text>
        <TextInput
          style={styles.gradeInput}
          placeholder={grade?.toString() || '0'}
          placeholderTextColor={colors.text}
          keyboardType="numeric"
          onChangeText={onGradeChange}
        />
        <Text style={styles.statLabel}>/100</Text>
      </View>

      {/* On Time */}
      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color={colors.accent} />
        <Text style={styles.statLabel}>A tiempo:</Text>
        <Ionicons 
          name="time-outline" 
          size={14} 
          color={isOnTime ? colors.success : colors.accent} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
  },
  statValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  gradeInput: {
    backgroundColor: colors.card,
    color: colors.text,
    width: 35,
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 12,
  },
});

CodeProfessorStats.propTypes = {
  isResolved: PropTypes.bool.isRequired,
  attempts: PropTypes.number,
  grade: PropTypes.number,
  isOnTime: PropTypes.bool.isRequired,
  onGradeChange: PropTypes.func.isRequired,
};

export default CodeProfessorStats;
