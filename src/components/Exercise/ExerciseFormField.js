import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const ExerciseFormField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false,
  inputStyle = {}
}) => {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Ionicons name="ellipse-outline" size={16} color={colors.accent} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={[
          multiline ? styles.textArea : styles.input,
          inputStyle
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    fontSize: 14,
  },
  textArea: {
    backgroundColor: colors.card,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    fontSize: 14,
    minHeight: 100,
  },
});

ExerciseFormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ExerciseFormField;
