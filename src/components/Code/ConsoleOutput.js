import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../constant/theme';

const ConsoleOutput = ({ output, isResolved, isOnTime }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.consoleOutput}>
        <Text style={styles.consoleText}>{output}</Text>
      </ScrollView>
      <View style={styles.consoleFooter}>
        <Text style={styles.consoleFooterText}>Resuelto: </Text>
        {isResolved ? (
          <Ionicons name="checkmark-circle" size={14} color={colors.success} />
        ) : (
          <Ionicons name="close" size={14} color={colors.warning} />
        )}
        <Text style={styles.consoleFooterText}>A tiempo: </Text>
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
  container: {
    flex: 1,
  },
  consoleOutput: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: 12,
    minHeight: 150,
    marginBottom: 12,
  },
  consoleText: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Courier New',
    lineHeight: 20,
  },
  consoleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
  },
  consoleFooterText: {
    fontSize: 12,
    color: colors.text,
  },
});

export default ConsoleOutput;
