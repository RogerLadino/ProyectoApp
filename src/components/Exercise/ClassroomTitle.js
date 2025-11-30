import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../constant/theme";

export const ClassroomTitle = ({ name }) => {
  return (
    <View style={styles.header}>
      <Text style={[styles.classroomName]}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    height: 100,
  },
  classroomName: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 'bold',
    flex: 1
  },
});
