import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing, borderRadius } from '../../constant/theme';

const DateTimeInput = ({ label, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const parseDateTime = (dateTimeString) => {
    if (!dateTimeString) return new Date();
    try {
      const date = new Date(dateTimeString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDisplayDateTime = (dateTimeString) => {
    if (!dateTimeString) return placeholder || 'Seleccionar fecha y hora';
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) return placeholder || 'Seleccionar fecha y hora';
      
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleDateString('es-ES', options);
    } catch {
      return placeholder || 'Seleccionar fecha y hora';
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || parseDateTime(value);
    
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (event.type === 'set') {
      if (mode === 'date') {
        setMode('time');
        setShow(true);
      } else {
        setShow(false);
        setMode('date');
        onChange(formatDateTime(currentDate));
      }
    } else {
      setShow(false);
      setMode('date');
    }
  };

  const handlePress = () => {
    setMode('date');
    setShow(true);
  };

  // Para Web, usar input HTML5
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {label && (
          <View style={styles.labelContainer}>
            <Ionicons name="ellipse-outline" size={14} color={colors.accent} />
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={20} color={colors.text} />
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: colors.text,
              fontSize: 14,
              fontFamily: 'inherit',
              marginLeft: 8,
            }}
          />
        </View>
      </View>
    );
  }

  // Para Mobile (iOS y Android)
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Ionicons name="ellipse-outline" size={14} color={colors.accent} />
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.inputContainer} onPress={handlePress}>
        <Ionicons name="calendar-outline" size={20} color={colors.text} />
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {formatDisplayDateTime(value)}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={parseDateTime(value)}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 6,
    gap: spacing.sm,
    minHeight: 50,
  },
  inputText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  placeholder: {
    color: colors.textSecondary,
  },
});

DateTimeInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default DateTimeInput;
