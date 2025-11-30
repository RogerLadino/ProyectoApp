import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../constant/theme';

export const ExerciseCard = ({ 
  exercise, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Ionicons name="ellipse" size={16} color={colors.accent} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {exercise.name}
          </Text>
          <Text style={styles.date}>{exercise.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
