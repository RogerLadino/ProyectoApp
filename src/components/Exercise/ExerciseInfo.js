import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const ExerciseInfo = ({ dueDate, description }) => {
  return (
    <View style={styles.container}>
      {dueDate && <Text style={styles.dateInfo}>{dueDate}</Text>}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  dateInfo: {
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 14,
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'justify',
    lineHeight: 24,
  },
});

ExerciseInfo.propTypes = {
  dueDate: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default ExerciseInfo;
