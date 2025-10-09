import { PermissionsAndroid, Platform, Linking } from 'react-native';

/**
 * Request storage permission safely
 * Returns true if granted, false otherwise
 */
export const requestStoragePermission = async () => {
  try {
    if (Platform.OS !== 'android') return true;

    let permission;

    if (Platform.Version >= 33) {
      // Android 13+ uses separate media permissions
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES; // Adjust if needed
    } else {
      permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    }

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) return true;

    const granted = await PermissionsAndroid.request(permission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return 'never_ask_again';
    } else {
      return false;
    }
  } catch (err) {
    console.error("Permission error:", err);
    return false;
  }
};

/**
 * Open app settings (for permanently denied permissions)
 */
export const openAppSettings = () => {
  Linking.openSettings();
};
