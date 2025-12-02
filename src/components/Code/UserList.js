import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserList = ({ submissions, currentUserId, onSelectUser }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.userListScroll}
    >
      {submissions.map((submission) => (
        <TouchableOpacity
          key={submission.appUserId}
          style={[
            styles.userChip,
            currentUserId === submission.appUserId && styles.userChipActive
          ]}
          onPress={() => onSelectUser(submission.appUserId)}
        >
          <Ionicons 
            name="ellipse" 
            size={12} 
            color={currentUserId === submission.appUserId ? "#F15152" : "#F97E72"} 
          />
          <Text style={[
            styles.userChipText,
            currentUserId === submission.appUserId && styles.userChipTextActive
          ]}>
            {`${submission.appUser?.firstName} ${submission.appUser?.lastName}`}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userListScroll: {
    maxHeight: 50,
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#363031',
    borderRadius: 16,
    marginRight: 8,
  },
  userChipActive: {
    backgroundColor: '#F97E72',
  },
  userChipText: {
    fontSize: 14,
    color: '#FBFBFB',
  },
  userChipTextActive: {
    fontWeight: '600',
  },
});

export default UserList;
