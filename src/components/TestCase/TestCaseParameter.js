import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { colors, spacing, borderRadius } from '../../constant/theme';

const tipos = ['int', 'string', 'float', 'boolean'];
const data = tipos.map(t => ({ label: t, value: t }));

export const TestCaseParameter = ({
  parameter,
  onTypeChange,
  onValueChange,
  onDelete
}) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.dropdownText}
        selectedTextStyle={styles.dropdownText}
        inputSearchStyle={styles.dropdownText}
        itemTextStyle={styles.dropdownText}
        containerStyle={styles.dropdownContainer}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecciona un tipo"
        value={parameter.tipo}
        onChange={item => onTypeChange(item.value)}
      />

      <View style={styles.valueContainer}>
        <TextInput
          style={styles.input}
          value={parameter.valor}
          onChangeText={onValueChange}
          placeholder="Valor"
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Ionicons name="close-circle" size={20} color={colors.accent} />
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    height: 30,
  },
  dropdown: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    borderRadius: 2,
    flex: 1,
    height: 28
  },
  dropdownText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
  },
  valueContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.primary,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    fontSize: 14,
  },
  deleteButton: {
    padding: spacing.xs,
  },
});
