import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constant/theme';

export const EmptyState = ({ icon = 'document-text-outline', message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.textSecondary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
