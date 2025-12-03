import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBack = false, rightButtons = [] }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#F97E72" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Ionicons name="ellipse-outline" size={20} color="#F97E72" />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
      {rightButtons.length > 0 && (
        <View style={styles.rightSection}>{rightButtons}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#231F20',
    borderBottomWidth: 1,
    borderBottomColor: '#363031',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#FBFBFB',
    fontWeight: '600',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Header;
