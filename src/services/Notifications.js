
import { Notifications as ExpoNotifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';

import User from './User';

class Notifications {
  static async setPushNotificationId() {
    if (!Constants.isDevice) {
      return;
    }

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      const token = await ExpoNotifications.getExpoPushTokenAsync();
      User.addUserNotificationToken(token);
    } catch (e) {
      console.log('error');
    }
  }

  static async sendNotification({
    deviceIds, message, title, data = {},
  }) {
    const payload = {
      channelId: 'default',
      to: deviceIds,
      sound: 'default',
      priority: 'default',
      title,
      body: message,
      data,
      _displayInForeground: true,
    };

    axios.post('https://exp.host/--/api/v2/push/send', payload, {
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });
  }

  static NotificationTypes = {
    NOTIFICATION_CHAT_TYPE: 'CHAT',
  }
}

export default Notifications;
