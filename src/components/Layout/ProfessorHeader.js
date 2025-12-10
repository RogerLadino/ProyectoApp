import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const ProfessorHeader = ({ title, onEdit, onSave }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Ionicons name="ellipse-outline" size={24} color={colors.accent} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.cardButton} onPress={onEdit}>
          <Ionicons name="pencil" size={16} color={colors.text} />
          <Text style={styles.cardButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '600',
  },
  headerButtons: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  cardButtonText: {
    color: colors.text,
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});

ProfessorHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfessorHeader;
