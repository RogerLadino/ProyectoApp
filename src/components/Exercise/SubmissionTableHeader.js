import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constant/theme';

const SubmissionTableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderText, { flex: 2 }]}>Nombre</Text>
      <Text style={[styles.tableHeaderText, { flex: 1 }]}>Nota</Text>
      <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>Resuelto</Text>
      <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>A tiempo</Text>
      <Text style={[styles.tableHeaderText, { flex: 1 }]}>Código</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  tableHeaderText: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SubmissionTableHeader;
