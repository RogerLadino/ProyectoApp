import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../constant/theme';

export const ClassroomCodeCard = ({ code }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Código</Text>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  code: {
    fontSize: 24,
    color: colors.accent,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
