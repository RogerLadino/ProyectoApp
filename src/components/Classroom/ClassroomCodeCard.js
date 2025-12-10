import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, spacing, borderRadius } from '../../constant/theme';

const ClassroomCodeCard = ({ code }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Código:</Text>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  code: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

ClassroomCodeCard.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ClassroomCodeCard;
