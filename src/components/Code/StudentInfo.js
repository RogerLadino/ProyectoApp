import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StudentInfo = ({ currentSubmission }) => {
  return (
    <View style={styles.studentInfoRow}>
      <Ionicons name="ellipse" size={14} color="#F15152" />
      <Text style={styles.studentName}>
        {currentSubmission?.appUser
          ? `${currentSubmission.appUser.firstName} ${currentSubmission.appUser.lastName}`
          : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  studentName: {
    fontSize: 16,
    color: '#FBFBFB',
    fontWeight: '600',
  },
});
