import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { TestCaseHeader } from './TestCaseHeader';
import { TestCaseParameter } from './TestCaseParameter';
import { colors, spacing, borderRadius } from '../../constant/theme';

const tipos = ['int', 'string', 'float', 'boolean'];
const data = tipos.map(t => ({ label: t, value: t }));


export const TestCaseItem = ({
  testCase,
  index,
  onUpdate,
  onDelete,
  onAddParameter,
  onDeleteParameter,
  onUpdateParameter,
  onUpdateOutput,
}) => {
  const [returnValue, setReturnValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TestCaseHeader
        testNumber={index + 1}
        functionName={testCase.nombreFuncion}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onDelete={() => onDelete(index)}
      />

      {isOpen && (
        <View style={styles.content}>
          {/* Función */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Función</Text>
            <TextInput
              style={styles.input}
              value={testCase.nombreFuncion}
              onChangeText={(value) => onUpdate(index, { nombreFuncion: value })}
              placeholder="Nombre de la función"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Parámetros */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Parámetros</Text>
              <TouchableOpacity onPress={() => onAddParameter(index)}>
                <Ionicons name="add-circle" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {testCase.entrada.map((param, paramIndex) => (
              <TestCaseParameter
                key={paramIndex}
                parameter={param}
                onTypeChange={(value) =>
                  onUpdateParameter(index, paramIndex, 'tipo', value)
                }
                onValueChange={(value) =>
                  onUpdateParameter(index, paramIndex, 'valor', value)
                }
                onDelete={() => onDeleteParameter(index, paramIndex)}
              />
            ))}
          </View>

          {/* Debe retornar */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Debe retornar</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              inputSearchStyle={styles.dropdownText}
              itemTextStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainer}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="string"
              value={returnValue}
              onChange={item => {
                setReturnValue(item.value);
                onUpdateOutput(index, 'tipo', item.value);
              }}
            />
            <TextInput
              style={[styles.input, {
                marginTop: spacing.sm
              }]}
              value={testCase.salida.valor}
              onChangeText={(value) => onUpdateOutput(index, 'valor', value)}
              placeholder="Valor esperado"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  content: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.primary,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'column',
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
});
