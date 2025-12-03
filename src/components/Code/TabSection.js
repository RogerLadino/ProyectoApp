import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabSection = ({ activeTab, onTabChange, exerciseDescription, isProfessor }) => {
  return (
    <View style={styles.tabsSection}>
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ejercicio' && styles.activeTab]}
          onPress={() => onTabChange('ejercicio')}
        >
          <Ionicons name="ellipse-outline" size={14} color="#F97E72" />
          <Text style={styles.tabText}>Ejercicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'consola' && styles.activeTab]}
          onPress={() => onTabChange('consola')}
        >
          <Ionicons name="ellipse-outline" size={14} color="#F97E72" />
          <Text style={styles.tabText}>Consola</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>
        {activeTab === 'ejercicio' && (
          <ScrollView style={styles.tabItem}>
            <Text style={styles.exerciseDescription}>
              {exerciseDescription}
            </Text>
          </ScrollView>
        )}

        {activeTab === 'consola' && (
          <View style={styles.tabItem}>
            <ScrollView style={styles.consoleOutput}>
              <Text style={styles.consoleText}>
                Salida del programa:{'\n'}
                {isProfessor ? '15' : 'Hello Roger, how are you?'}
                {'\n\n'}
                Prueba #1 . . . . . .{' '}
                <Ionicons name="checkmark-circle" size={14} color="#32E875" />{' '}
                CORRECTA
              </Text>
            </ScrollView>
            <View style={styles.consoleFooter}>
              <Text style={styles.consoleFooterText}>Resuelto: </Text>
              {isProfessor ? (
                <Ionicons name="checkmark-circle" size={14} color="#32E875" />
              ) : (
                <Ionicons name="close" size={14} color="#F15152" />
              )}
              <Text style={styles.consoleFooterText}>A tiempo: </Text>
              <Ionicons name="time-outline" size={14} color="#32E875" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsSection: {
    padding: 16,
  },
  tabsHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F97E72',
  },
  tabText: {
    fontSize: 14,
    color: '#FBFBFB',
    fontWeight: '600',
  },
  tabContent: {
    minHeight: 200,
  },
  tabItem: {
    flex: 1,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#FBFBFB',
    lineHeight: 22,
    textAlign: 'justify',
  },
  consoleOutput: {
    backgroundColor: '#363031',
    borderRadius: 8,
    padding: 12,
    minHeight: 150,
    marginBottom: 12,
  },
  consoleText: {
    fontSize: 13,
    color: '#FBFBFB',
    fontFamily: 'Courier New',
    lineHeight: 20,
  },
  consoleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#363031',
    borderRadius: 8,
  },
  consoleFooterText: {
    fontSize: 12,
    color: '#FBFBFB',
  },
});

export default TabSection;
