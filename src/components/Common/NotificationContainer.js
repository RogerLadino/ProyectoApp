import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNotification } from '../../context/NotificationContext';
import NotificationBar from './NotificationBar';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <View style={styles.container} pointerEvents="box-none">
      {notifications.map((notification, index) => (
        <View
          key={notification.id}
          style={[styles.notificationWrapper, { top: index * 70 }]}
          pointerEvents="box-none"
        >
          <NotificationBar
            notification={notification}
            onDismiss={() => removeNotification(notification.id)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  notificationWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default NotificationContainer;
