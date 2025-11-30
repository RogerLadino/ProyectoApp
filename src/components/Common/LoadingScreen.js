import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F97E72" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231F20',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
