import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, spacing, borderRadius } from '../../constant/theme';

const SubmissionStatusBadge = ({ isSubmitted }) => {
  return (
    <View style={[styles.badge, isSubmitted ? styles.submitted : styles.notSubmitted]}>
      <Text style={styles.badgeText}>
        {isSubmitted ? 'Entregado' : 'No entregado'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  submitted: {
    backgroundColor: colors.success,
  },
  notSubmitted: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
  },
});

SubmissionStatusBadge.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
};

export default SubmissionStatusBadge;
