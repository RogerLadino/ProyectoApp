import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ClassroomContext } from '../../context/ClassroomProvider';
import { colors, spacing, borderRadius } from '../../constant/theme';

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = useNavigation();
  const { classrooms, selectClassroom, fetchClassrooms } = useContext(ClassroomContext);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (isOpen) {
      fetchClassrooms();
    }
  }, [isOpen]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const truncate = (text, length = 12) =>
    text.length > length ? text.slice(0, length) + '...' : text;

  const handleNavigate = (route, params = {}) => {
    navigation.navigate(route, params);
    onClose();
  };

  const handleClassroomPress = (aula) => {
    selectClassroom(aula);
    navigation.navigate('ListExercise', { classroomId: aula.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.divisor} />

        <ScrollView style={styles.nav} showsVerticalScrollIndicator={false}>
          {/* Home */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigate('ClassroomList')}
          >
            <Ionicons name="home" size={22} color={colors.text} />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>

          <View style={styles.divisor} />

          {/* Classrooms */}
          {classrooms && classrooms.map((aula) => (
            <TouchableOpacity
              key={aula.id}
              style={styles.navItem}
              onPress={() => handleClassroomPress(aula)}
            >
              <View style={styles.classIcon}>
                <View style={styles.emptySquare} />
              </View>
              <Text style={styles.navText}>{truncate(aula.name)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.navItem, styles.logoutItem]}
          onPress={() => handleNavigate('Login')}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.text} />
          <Text style={styles.navText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: colors.primary,
    zIndex: 999,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  nav: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: spacing.sm,
  },
  navText: {
    color: colors.text,
    fontSize: 16,
  },
  classIcon: {
    width: 22,
    height: 22,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  emptySquare: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.xs,
  },
  divisor: {
    width: '100%',
    height: 2,
    backgroundColor: colors.card,
    marginVertical: spacing.sm,
  },
  logoutItem: {
    marginTop: 'auto',
    marginBottom: spacing.md,
  },
});

export default Sidebar;
