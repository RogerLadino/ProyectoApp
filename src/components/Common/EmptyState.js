import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const EmptyState = ({ icon = 'document-text-outline', message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.textSecondary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});

EmptyState.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default EmptyState;
