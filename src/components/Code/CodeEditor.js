import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageSelector } from './LanguageSelector';

export const CodeEditor = ({ code, language, onCodeChange, onLanguageChange, onRunCode }) => {
  return (
    <View style={styles.editorSection}>
      <View style={styles.editorHeader}>
        <View style={styles.editorTitleLeft}>
          <Ionicons name="ellipse-outline" size={16} color="#F97E72" />
          <Text style={styles.editorTitle}>Código</Text>
        </View>
        <LanguageSelector 
          language={language}
          onLanguageChange={onLanguageChange}
          onRunCode={onRunCode}
        />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#363031',
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
    gap: 8,
  },
  editorTitle: {
    fontSize: 16,
    color: '#FBFBFB',
    fontWeight: '600',
  },
  codeEditorContainer: {
    backgroundColor: '#363031',
    borderRadius: 8,
    minHeight: 200,
  },
  codeEditor: {
    color: '#FBFBFB',
    fontSize: 14,
    fontFamily: 'Courier New',
    padding: 12,
    minHeight: 200,
  },
});
