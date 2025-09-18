import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImagePath from "../constants/ImagePath";
import Colors from "../constants/color";


const SubHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button with Icon + Text */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
        <Image
          source={ImagePath.arrowsBack}
          style={styles.backIcon}
          resizeMode="contain"
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Placeholder for right side (keep title centered) */}
      <View style={{ width: 50 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    top: 20
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 25,
    marginRight: 5,
  },
  backText: {
    fontSize: 16,
   color: Colors.primary
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary
  },
});

export default SubHeader;
