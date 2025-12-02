import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SubmissionStats = ({ currentSubmission }) => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color="#F97E72" />
        <Text style={styles.statLabel}>Resuelto:</Text>
        {currentSubmission?.status == 0 ? (
          <Ionicons name="close" size={14} color="#F15152" />
        ) : (
          <Ionicons name="checkmark-circle" size={14} color="#32E875" />
        )}
      </View>

      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color="#F97E72" />
        <Text style={styles.statLabel}>Intentos:</Text>
        <Text style={styles.statValue}>0</Text>
      </View>

      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color="#F97E72" />
        <Text style={styles.statLabel}>Nota:</Text>
        <Text style={styles.statValue}>{currentSubmission?.grade || '0'}</Text>
        <Text style={styles.statLabel}>/100</Text>
      </View>

      <View style={styles.statItem}>
        <Ionicons name="ellipse-outline" size={12} color="#F97E72" />
        <Text style={styles.statLabel}>A tiempo:</Text>
        <Ionicons name="time-outline" size={14} color="#32E875" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FBFBFB',
  },
  statValue: {
    fontSize: 12,
    color: '#FBFBFB',
    fontWeight: '600',
  },
});

export default SubmissionStats;
