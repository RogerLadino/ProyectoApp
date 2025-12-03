import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../constant/theme';

const ResolvedStatusBadge = ({ isResolved }) => {
  return (
    <View style={[styles.badge, isResolved ? styles.resolved : styles.notResolved]}>
      <Text style={styles.badgeText}>
        {isResolved ? 'Resuelto' : 'No resuelto'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  resolved: {
    backgroundColor: colors.success,
  },
  notResolved: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default ResolvedStatusBadge;
