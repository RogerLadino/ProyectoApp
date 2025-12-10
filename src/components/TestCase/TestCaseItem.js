import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import TestCaseHeader from './TestCaseHeader';
import TestCaseParameter from './TestCaseParameter';
import { colors, spacing, borderRadius } from '../../constant/theme';

const tipos = ['int', 'string', 'float', 'boolean'];
const data = tipos.map(t => ({ label: t, value: t }));


const TestCaseItem = ({
  testCase,
  index,
  onUpdate,
  onDelete,
  onAddParameter,
  onDeleteParameter,
  onUpdateParameter,
  onUpdateOutput,
}) => {
  const [returnValue, setReturnValue] = useState(testCase.salida?.tipo || 'string');
  const [isOpen, setIsOpen] = useState(false);

  // Sincronizar returnValue cuando testCase.salida.tipo cambia
  React.useEffect(() => {
    if (testCase.salida?.tipo) {
      setReturnValue(testCase.salida.tipo);
    }
  }, [testCase.salida?.tipo]);

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
            <View style={styles.returnValueContainer}>
              <Dropdown
                style={styles.returnDropdown}
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
                style={styles.returnInput}
                value={testCase.salida.valor}
                onChangeText={(value) => onUpdateOutput(index, 'valor', value)}
                placeholder="Valor esperado"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
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
    paddingHorizontal: spacing.md,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    gap: spacing.md,
  },
  section: {
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.primary,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
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
    borderRadius: 6,
    overflow: 'hidden',
    height: 40,
  },
  dropdown: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    flex: 1,
    height: 40,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  returnValueContainer: {
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  },
  returnDropdown: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    height: 40,
  },
  returnInput: {
    width: '100%',
    backgroundColor: colors.primary,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    fontSize: 14,
  },
});

TestCaseItem.propTypes = {
  testCase: PropTypes.shape({
    nombreFuncion: PropTypes.string.isRequired,
    entrada: PropTypes.arrayOf(PropTypes.shape({
      tipo: PropTypes.string,
      valor: PropTypes.string,
    })).isRequired,
    salida: PropTypes.shape({
      tipo: PropTypes.string,
      valor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddParameter: PropTypes.func.isRequired,
  onDeleteParameter: PropTypes.func.isRequired,
  onUpdateParameter: PropTypes.func.isRequired,
  onUpdateOutput: PropTypes.func.isRequired,
};

export default TestCaseItem;
