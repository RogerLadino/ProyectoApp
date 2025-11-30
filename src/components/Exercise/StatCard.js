import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StatCard = ({ label, value, icon, iconColor = '#F97E72' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Ionicons name="ellipse-outline" size={16} color={iconColor} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text style={styles.value}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#231F20',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#FBFBFB',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    color: '#FBFBFB',
    fontWeight: '600',
  },
});
