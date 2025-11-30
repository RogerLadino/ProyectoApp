import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from './StatCard.js'
import { colors, spacing, borderRadius } from '../../constant/theme';

export const StudentStatsCard = ({ grade, isResolved, isOnTime }) => {
  return (
    <View style={styles.statsContainer}>
      {/* Grade */}
      <StatCard 
        label="Nota" 
        value={grade || 0}
      />

      {/* Solved */}
      <StatCard 
        label="Resuelto" 
        value={
          <View style={styles.iconCircle}>
            {isResolved ? (
              <Ionicons name="checkmark" size={16} color={colors.success} />
            ) : (
              <Ionicons name="close" size={16} color={colors.warning} />
            )}
          </View>
        }
      />

      {/* On Time */}
      <StatCard 
        label="A tiempo" 
        value={
          <View style={styles.iconCircle}>
            {isOnTime ? (
              <Ionicons name="checkmark" size={16} color={colors.success} />
            ) : (
              <Ionicons name="time-outline" size={16} color={colors.accent} />
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
