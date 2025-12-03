import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constant/theme';

const SubmissionTableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <View style={[styles.headerCell, styles.nameColumn]}>
        <Text style={styles.headerText}>Nombre</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Nota</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Resuelto</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>A tiempo</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Código</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  headerCell: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameColumn: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SubmissionTableHeader;
