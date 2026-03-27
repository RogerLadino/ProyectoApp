import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import { colors, spacing, borderRadius } from '../../constant/theme';

const CodeEditorPanel = ({ 
  code, 
  onCodeChange, 
  language, 
  onLanguageChange, 
  onRun 
}) => {
  const languageOptions = [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'HTML', value: 'html' },
  ];

  return (
    <View style={styles.editorSection}>
      <View style={styles.editorHeader}>
        <View style={styles.editorTitleLeft}>
          <Ionicons name="ellipse-outline" size={16} color={colors.accent} />
          <Text style={styles.editorTitle}>Código</Text>
        </View>
        <View style={styles.editorTitleRight}>
          <Dropdown
            style={styles.languagePicker}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            inputSearchStyle={styles.dropdownText}
            itemTextStyle={styles.dropdownText}
            containerStyle={styles.dropdownContainer}
            data={languageOptions}
            labelField="label"
            valueField="value"
            placeholder="Selecciona"
            value={language}
            onChange={item => onLanguageChange(item.value)}
          />
          <TouchableOpacity onPress={onRun}>
            <Ionicons name="play-circle" size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.codeEditorContainer}>
        <TextInput
          style={styles.codeEditor}
          multiline
          value={code}
          onChangeText={onCodeChange}
          placeholder="Escribe tu código aquí..."
          placeholderTextColor="#666"
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editorSection: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editorTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  editorTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  editorTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languagePicker: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    borderRadius: 2,
    width: 120,
    height: 28,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownContainer: {
    backgroundColor: colors.primary,
  },
  codeEditorContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    minHeight: 200,
  },
  codeEditor: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Courier New',
    padding: 12,
    minHeight: 200,
  },
});

CodeEditorPanel.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
};

export default CodeEditorPanel;
