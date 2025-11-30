import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackHeader } from '../components';
import { colors } from '../constant/theme';

export default function HomeView() {
  return (
    <View style={styles.container}>
      <BackHeader title="Inicio" />
      <View style={styles.content}>
        <Text style={styles.text}>Home View</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
  },
});
