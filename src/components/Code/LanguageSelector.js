import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const LanguageSelector = ({ language, onLanguageChange, onRunCode }) => {
  const languageOptions = [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'HTML', value: 'html' },
  ];

  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={onRunCode}>
        <Ionicons name="play-circle" size={24} color="#F97E72" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languagePicker: {
    backgroundColor: '#363031',
    paddingHorizontal: 8,
    borderRadius: 2,
    width: 120,
    height: 28,
  },
  dropdownText: {
    fontSize: 14,
    color: '#FBFBFB',
  },
  dropdownContainer: {
    backgroundColor: '#363031',
  },
});

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onRunCode: PropTypes.func.isRequired,
};

export default LanguageSelector;
