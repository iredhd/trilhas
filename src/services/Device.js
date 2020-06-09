import * as ExpoDevice from 'expo-device';
import { AsyncStorage } from 'react-native';
import uuid from 'uuid-random';

class Device {
  static getDeviceInformations() {
    return {
      brand: ExpoDevice.brand,
      deviceName: ExpoDevice.deviceName,
      os: ExpoDevice.osName,
      osVersion: ExpoDevice.osVersion,
      deviceYear: ExpoDevice.deviceYearClass,
    };
  }

  static async checkInstallationId() {
    let installationId = await AsyncStorage.getItem('installationId');

    if (installationId) {
      return;
    }

    installationId = uuid();

    AsyncStorage.setItem('installationId', installationId);
  }
}

export default Device;
