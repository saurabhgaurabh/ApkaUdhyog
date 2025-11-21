import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/color';
import ImagePath from '../../constants/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const SettingScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    { name: "Profile", icon: ImagePath.user, route: "ProfileScreen" },
    { name: "Change Password", icon: ImagePath.password, route: "ChangePassword" },
    { name: "Privacy & Security", icon: ImagePath.security, route: "Security" },
    { name: "Notifications", icon: ImagePath.notification, route: "Notifications" },
    { name: "App Theme", icon: ImagePath.theme, route: "ThemeScreen" },
    { name: "Help & Support", icon: ImagePath.support, route: "Support" },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('otp_secret'); 

      console.log("User logged out successfully.");

      // Navigate to Login Page
      navigation.replace("Login");

    } catch (error) {
      console.log("Error while logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>Settings</Text>

        {/* Menu List */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.route)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Card */}
        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
          <Image source={ImagePath.logout} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary || "#4CAF50",
    marginTop: 15,
    marginBottom: 20,
  },

  menuCard: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
    tintColor: Colors.primary || "#4CAF50",
  },

  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },

  arrow: {
    fontSize: 28,
    color: "#999",
    marginLeft: 10,
  },

  logoutCard: {
    backgroundColor: "#FFECEC",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  logoutIcon: {
    width: 30,
    height: 30,
    tintColor: "red",
    marginRight: 12,
  },

  logoutText: {
    fontSize: 18,
    fontWeight: "700",
    color: "red",
  },
});
