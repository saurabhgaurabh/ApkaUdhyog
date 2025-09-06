// React Native Custom Header like Vyapaar app
// Left side: Logo + Username, Right side: Settings + Notification

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import ImagePath from '../constants/ImagePath';

export default function CustomHeader({
  username = "User",
  logo = ImagePath.Home,
  onSettingsPress,
  onNotificationPress,
  backgroundColor = "#ffffff",
  textColor = "#4CAF50",
}) {
  const topInset = Platform.select({
    ios: 44,
    android: 30,
    default: 0,
  });

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: topInset }]}>
      <StatusBar
        barStyle={textColor === "#ffffff" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
        translucent
      />

      {/* Left side: Logo + Username */}
      <View style={styles.leftSide}>
        {logo && <Image source={logo} style={styles.logo} resizeMode="contain" />}
        <Text style={[styles.username, { color: "#4CAF50" }]}>{username}</Text>
      </View>

      {/* Right side: Notification + Settings */}
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconBtn}>
          <Text style={[styles.iconText, { color: textColor }]}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettingsPress} style={styles.iconBtn}>
          <Text style={[styles.iconText, { color: textColor }]}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    minHeight: 56,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    imageContentFit: 'contain',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    textColor: '#4CAF50'
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
});