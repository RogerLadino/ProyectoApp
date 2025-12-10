import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors, spacing } from '../../constant/theme';

const TopBar = ({ onMenuPress, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.userCircle}>
          <Ionicons name="person" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: colors.card,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.card,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TopBar.propTypes = {
  onMenuPress: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default TopBar;
