import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, spacing, borderRadius } from '../../constant/theme';

const ClassroomInfoCard = ({ className = "Nombre de la clase", teacherName = "Nombre del profesor" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.className}>{className}</Text>
      <Text style={styles.teacherName}>{teacherName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  className: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  teacherName: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});

ClassroomInfoCard.propTypes = {
  className: PropTypes.string,
  teacherName: PropTypes.string,
};

export default ClassroomInfoCard;
