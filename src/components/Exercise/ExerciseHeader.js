import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors } from '../../constant/theme';

const ExerciseHeader = ({ title, icon = 'ellipse-outline' }) => {
  return (
    <View style={styles.header}>
      <Ionicons name={icon} size={24} color={colors.accent} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '600',
  },
});

ExerciseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default ExerciseHeader;
